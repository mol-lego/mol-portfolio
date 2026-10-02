"""代表作の「生きた写真」用の素材を作る。

- ヴェネツィアの写真から、運河の水面だけを白くしたマスクを作る
- クイーンエリザベス号の背景透過レンダーを、模型の輪郭ぎりぎりまで切り詰める

出力先は src/assets/optimized/living/ 。元画像から何度でも作り直せる。
実行: python3 scripts/make-living-assets.py （Pillow と numpy が必要）
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "optimized"
OUT = SRC / "living"


def make_water_mask(name: str, top_ratio: float) -> None:
    image = Image.open(SRC / f"{name}.jpg").convert("RGB")
    width, height = image.size
    hsv = np.asarray(image.convert("HSV")).astype(np.float32)
    hue = hsv[..., 0] * 360 / 255
    sat = hsv[..., 1] / 255
    val = hsv[..., 2] / 255

    # クリアブルーのパーツはシアン寄り。窓の日よけ（深い青）は位置で除く
    water = (hue > 165) & (hue < 205) & (sat > 0.3) & (val > 0.4)
    water[: int(height * top_ratio)] = False

    mask = Image.fromarray((water * 255).astype(np.uint8), "L")
    # 小さな点を消してから、パーツの隙間の影を埋める
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    mask = mask.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9))
    mask = mask.filter(ImageFilter.GaussianBlur(2))

    left, top, right, bottom = mask.point(lambda v: 255 if v > 8 else 0).getbbox()
    mask.save(OUT / f"{name}-water-mask.png", optimize=True)
    (OUT / f"{name}-water-mask.json").write_text(
        json.dumps(
            {
                "width": width,
                "height": height,
                "bbox": {"x": left, "y": top, "width": right - left, "height": bottom - top},
            },
            indent=2,
        )
        + "\n"
    )
    print(f"{name}: water bbox {left},{top} - {right},{bottom} / {width}x{height}")


def make_cutout(name: str, padding: int, shadow_alpha: int) -> None:
    for suffix, scale in (("", 1), ("@2x", 2)):
        image = Image.open(SRC / f"{name}{suffix}.png").convert("RGBA")
        # レンダーに焼き込まれた床の薄い影を消す。影はページ側（CSS）で紙に落とす
        alpha = np.asarray(image.getchannel("A")).astype(np.float32)
        alpha = np.clip((alpha - shadow_alpha) / (255 - shadow_alpha), 0, 1) * 255
        image.putalpha(Image.fromarray(alpha.astype(np.uint8), "L"))
        left, top, right, bottom = image.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
        pad = padding * scale
        box = (
            max(0, left - pad),
            max(0, top - pad),
            min(image.width, right + pad),
            min(image.height, bottom + pad),
        )
        cropped = image.crop(box)
        cropped.save(OUT / f"{name.replace('-ar-card', '')}-cutout{suffix}.png", optimize=True)
        print(f"{name}{suffix}: cropped to {cropped.size}")


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    make_water_mask("venice1-card", top_ratio=0.62)
    make_cutout("msqe-ar-card", padding=8, shadow_alpha=60)
