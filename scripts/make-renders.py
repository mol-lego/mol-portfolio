#!/usr/bin/env python3
"""
作品のレンダリング（Blender Cycles、背景透過の PNG）から、トップで使う透過 WebP と
寸法のデータ（src/app/renders.js）を作る。ビルドでは動かさない。レンダリングを
作り直したときに手で回す。

    python3 scripts/make-renders.py [レンダリングのフォルダ]

既定のフォルダは ~/Documents/mol-redesign/elevations/cycles。
読むもの: <key>-cycles.png、<key>-cycles.json（外接寸法・カメラ・px/cm）、
          cycles-sizes-cm.json（画像1枚が表す実寸、余白込み）。
書くもの: public/renders/<key>-<幅>.webp と src/app/renders.js。元の PNG は変えない。
必要なもの: Python 3 と Pillow（WebP の書き出しに対応したもの）。

画像の扱い
- 幅は切らない。画像の幅がそのまま cycles-sizes-cm.json の w_cm にあたるので、
  ページでは「表示幅 / w_cm」で 1cm あたりの px が決まる。
- 上下は、影も含めて何も写っていない行（アルファ 4 未満）を切り落とす。
  ブロック（brick）は影がごく薄い（アルファ最大 20）ので切らず、縮小もしない。

床の合わせ方（elevations/README.md「2×4 ブロック（縮尺の目安）」）
- どの画像も同じ平行投影のカメラ（右へ 20°、上から 18°）・同じ床で描いている。
- 床の基準点は外接直方体の底面の中心。画像の横の中央、縦は中央から
  「外接寸法の高さ / 2 × cos 18° × px/cm」下に写る。
- 2枚を同じ縮尺にして、床の上で置きたい点どうしを重ねれば、同じ床の上に並ぶ。
  画像の下端どうしを揃えると、画像ごとに下端から床までの距離が違うので狂う。
"""

import json
import math
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else Path.home() / "Documents/mol-redesign/elevations/cycles"
OUT_DIR = ROOT / "public" / "renders"
JS_OUT = ROOT / "src" / "app" / "renders.js"

# 書き出す幅（px）。表示幅の1倍と2倍を目安にし、元画像の幅を超えない。
# 表示幅: qe は本文幅（最大 1304px）、ほかの大型作品は qe と同じ縮尺、
# 小さな作品は CSS の cm（1cm = 37.8px）での実物大。
WIDTHS = {
    "qe": [1280, 2560],
    "yasaka": [1200, 2400],
    "venice": [600, 1200],
    "hawaii": [600, 1200],
    "bed": [460, 920],
    "overpass": [450, 900],
    "castle": [430, 860],
    "house": [2100, 3200],
    # 冒頭の演出で画面幅の 36% まで大きく見せるので、元の 1600px のまま（縮小しない）
    "brick": [1600],
}
NO_CROP = {"brick"}

CROP_ALPHA = 4  # これ未満の行は何も写っていないとみなす
OBJECT_ALPHA = 128  # 作品の画素（床の影はこれ未満）

# 冒頭で 2×4 ブロックを置く床の点。客船の船首の先端の真下・船の中心線上。
# qe-cycles.png（4000px 幅）の上での、ブロックの底面の中心の座標（px）。
# レンダリングの担当が 3D データから求めた値（確認用の合成は cycles/_check/brick-next-to-qe.png）。
HERO_BRICK_ON_QE_PX = (249.4, 1804.2)


def mask(alpha, threshold):
    return alpha.point(lambda v: 255 if v >= threshold else 0)


def project_floor(dx, dy, az_deg, el_deg):
    """床の上のずれ（cm、x は右、y は奥）を、画面の上のずれ（cm、x は右、y は下）にする"""
    az, el = math.radians(az_deg), math.radians(el_deg)
    sx = dx * math.cos(az) + dy * math.sin(az)
    sy = -math.sin(el) * (-dx * math.sin(az) + dy * math.cos(az))
    return sx, sy


def analyze(key, w_cm):
    img = Image.open(SRC_DIR / f"{key}-cycles.png").convert("RGBA")
    meta = json.loads((SRC_DIR / f"{key}-cycles.json").read_text())
    width, height = img.size
    ppcm = width / w_cm
    az, el = meta["camera"]["az"], meta["camera"]["el"]
    bbox = meta["bbox_cm"]

    if key in NO_CROP:
        top, bottom = 0, height
    else:
        _, top, _, bottom = mask(img.getchannel("A"), CROP_ALPHA).getbbox()
    cropped = img.crop((0, top, width, bottom))
    obj_left, obj_top, obj_right, obj_bottom = mask(cropped.getchannel("A"), OBJECT_ALPHA).getbbox()

    # 床の基準点（外接直方体の底面の中心）。切り抜いたあとの画像の左上から
    ref_x = width / 2
    ref_y = height / 2 + bbox["h"] / 2 * math.cos(math.radians(el)) * ppcm - top

    # 外接直方体の底面の四隅のうち、画面でいちばん左に写る隅（作品の左端の床）
    corners = [project_floor(sx * bbox["w"] / 2, sy * bbox["d"] / 2, az, el) for sx in (-1, 1) for sy in (-1, 1)]
    left_corner = min(corners, key=lambda c: c[0])

    margin_cm = (w_cm - meta["camera"]["proj_w_cm"]) / 2
    info = {
        "w_cm": w_cm,
        "h_cm": cropped.height / ppcm,
        # 外接直方体を写した矩形（余白を除く）の幅と、左右の余白
        "proj_w_cm": meta["camera"]["proj_w_cm"],
        "margin_cm": margin_cm,
        # 床の基準点（外接直方体の底面の中心）
        "ref_cm": {"x": ref_x / ppcm, "y": ref_y / ppcm},
        # 底面の左端の隅（床の上）
        "floor_left_cm": {"x": ref_x / ppcm + left_corner[0], "y": ref_y / ppcm + left_corner[1]},
        # 作品の画素（アルファ 128 以上）の外接矩形
        "object_cm": {
            "left": obj_left / ppcm,
            "top": obj_top / ppcm,
            "right": obj_right / ppcm,
            "bottom": obj_bottom / ppcm,
        },
    }
    return cropped, ppcm, top, info


def write_webp(key, cropped):
    files = []
    for w in WIDTHS[key]:
        w = min(w, cropped.width)
        h = round(cropped.height * w / cropped.width)
        out = cropped if w == cropped.width else cropped.resize((w, h), Image.LANCZOS)
        name = f"{key}-{w}.webp"
        out.save(OUT_DIR / name, "WEBP", quality=88, alpha_quality=100, method=6)
        files.append({"src": f"renders/{name}", "w": w, "h": h, "bytes": (OUT_DIR / name).stat().st_size})
    return files


def main():
    sizes = json.loads((SRC_DIR / "cycles-sizes-cm.json").read_text())
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    renders = {}
    for key in WIDTHS:
        if key not in sizes or not (SRC_DIR / f"{key}-cycles.png").exists():
            print(f"skip {key}（素材なし）")
            continue
        cropped, ppcm, top, info = analyze(key, sizes[key]["w_cm"])
        if key == "qe":
            x, y = HERO_BRICK_ON_QE_PX
            info["hero_brick_cm"] = {"x": x / ppcm, "y": (y - top) / ppcm}
        info["files"] = write_webp(key, cropped)
        renders[key] = info
        print(key, json.dumps({k: v for k, v in info.items() if k != "files"}, ensure_ascii=False),
              [f'{f["src"]} {f["bytes"] // 1024}KB' for f in info["files"]])

    def clean(obj):
        if isinstance(obj, dict):
            return {k: clean(v) for k, v in obj.items() if k != "bytes"}
        if isinstance(obj, list):
            return [clean(v) for v in obj]
        return round(obj, 3) if isinstance(obj, float) else obj

    body = json.dumps(clean(renders), ensure_ascii=False, indent=2)
    JS_OUT.write_text(
        "// @ts-check\n"
        "// 生成物。scripts/make-renders.py が書き出す。手で直さない。\n"
        "//\n"
        "// 作品のレンダリング（同じカメラ・同じ床・同じ照明）の寸法。単位は cm、位置は画像の左上から。\n"
        "// w_cm・h_cm   画像1枚が表す実寸（幅は余白込み、上下は何も写っていない行を切ったあと）\n"
        "// proj_w_cm    外接直方体を写した矩形の幅（左右の余白 margin_cm を除く）\n"
        "// ref_cm       床の基準点（外接直方体の底面の中心）。2枚を並べるときはこの点で床を合わせる\n"
        "// floor_left_cm 外接直方体の底面の、画面でいちばん左に写る隅（作品の左端の床）\n"
        "// object_cm    作品の画素（床の影を除く）の外接矩形\n"
        "// hero_brick_cm（qe だけ）冒頭でブロックの底面の中心を置く床の点（船首の先端の真下・中心線上）\n"
        "// files        public/ からのパスと px\n"
        "\n"
        f"export const RENDERS = {body};\n"
    )
    print("wrote", JS_OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
