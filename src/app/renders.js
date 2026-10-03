// @ts-check
// 生成物。scripts/make-renders.py が書き出す。手で直さない。
//
// 作品のレンダリング（同じカメラ・同じ床・同じ照明）の寸法。単位は cm、位置は画像の左上から。
// w_cm・h_cm   画像1枚が表す実寸（幅は余白込み、上下は何も写っていない行を切ったあと）
// proj_w_cm    外接直方体を写した矩形の幅（左右の余白 margin_cm を除く）
// ref_cm       床の基準点（外接直方体の底面の中心）。2枚を並べるときはこの点で床を合わせる
// floor_left_cm 外接直方体の底面の、画面でいちばん左に写る隅（作品の左端の床）
// object_cm    作品の画素（床の影を除く）の外接矩形
// hero_brick_cm（qe だけ）冒頭でブロックの底面の中心を置く床の点（船首の先端の真下・中心線上）
// files        public/ からのパスと px

export const RENDERS = {
  "qe": {
    "w_cm": 305.383,
    "h_cm": 100.242,
    "proj_w_cm": 272.663,
    "margin_cm": 16.36,
    "ref_cm": {
      "x": 152.691,
      "y": 69.195
    },
    "floor_left_cm": {
      "x": 16.36,
      "y": 92.87
    },
    "object_cm": {
      "left": 18.17,
      "top": 0.076,
      "right": 282.021,
      "bottom": 90.012
    },
    "hero_brick_cm": {
      "x": 19.041,
      "y": 92.699
    },
    "files": [
      {
        "src": "renders/qe-1280.webp",
        "w": 1280,
        "h": 420
      },
      {
        "src": "renders/qe-2560.webp",
        "w": 2560,
        "h": 840
      }
    ]
  },
  "yasaka": {
    "w_cm": 278.459,
    "h_cm": 98.783,
    "proj_w_cm": 248.624,
    "margin_cm": 14.917,
    "ref_cm": {
      "x": 139.23,
      "y": 69.474
    },
    "floor_left_cm": {
      "x": 14.917,
      "y": 69.488
    },
    "object_cm": {
      "left": 15.663,
      "top": 0.07,
      "right": 257.923,
      "bottom": 91.056
    },
    "files": [
      {
        "src": "renders/yasaka-1200.webp",
        "w": 1200,
        "h": 426
      },
      {
        "src": "renders/yasaka-2400.webp",
        "w": 2400,
        "h": 851
      }
    ]
  },
  "venice": {
    "w_cm": 133.863,
    "h_cm": 63.786,
    "proj_w_cm": 119.521,
    "margin_cm": 7.171,
    "ref_cm": {
      "x": 66.932,
      "y": 46.733
    },
    "floor_left_cm": {
      "x": 7.171,
      "y": 57.39
    },
    "object_cm": {
      "left": 22.589,
      "top": 0.033,
      "right": 118.469,
      "bottom": 63.552
    },
    "files": [
      {
        "src": "renders/venice-600.webp",
        "w": 600,
        "h": 286
      },
      {
        "src": "renders/venice-1200.webp",
        "w": 1200,
        "h": 572
      }
    ]
  },
  "hawaii": {
    "w_cm": 139.323,
    "h_cm": 48.972,
    "proj_w_cm": 124.396,
    "margin_cm": 7.464,
    "ref_cm": {
      "x": 69.661,
      "y": 32.794
    },
    "floor_left_cm": {
      "x": 7.464,
      "y": 41.757
    },
    "object_cm": {
      "left": 21.247,
      "top": 0.035,
      "right": 118.181,
      "bottom": 47.718
    },
    "files": [
      {
        "src": "renders/hawaii-600.webp",
        "w": 600,
        "h": 211
      },
      {
        "src": "renders/hawaii-1200.webp",
        "w": 1200,
        "h": 422
      }
    ]
  },
  "bed": {
    "w_cm": 12.058,
    "h_cm": 10.379,
    "proj_w_cm": 10.766,
    "margin_cm": 0.646,
    "ref_cm": {
      "x": 6.029,
      "y": 8.633
    },
    "floor_left_cm": {
      "x": 0.646,
      "y": 9.373
    },
    "object_cm": {
      "left": 0.714,
      "top": 0.003,
      "right": 10.958,
      "bottom": 10.162
    },
    "files": [
      {
        "src": "renders/bed-460.webp",
        "w": 460,
        "h": 396
      },
      {
        "src": "renders/bed-920.webp",
        "w": 920,
        "h": 792
      }
    ]
  },
  "overpass": {
    "w_cm": 11.817,
    "h_cm": 13.95,
    "proj_w_cm": 10.552,
    "margin_cm": 0.633,
    "ref_cm": {
      "x": 5.909,
      "y": 11.744
    },
    "floor_left_cm": {
      "x": 0.633,
      "y": 12.465
    },
    "object_cm": {
      "left": 0.632,
      "top": 0.004,
      "right": 10.879,
      "bottom": 13.31
    },
    "files": [
      {
        "src": "renders/overpass-450.webp",
        "w": 450,
        "h": 531
      },
      {
        "src": "renders/overpass-900.webp",
        "w": 900,
        "h": 1062
      }
    ]
  },
  "castle": {
    "w_cm": 11.262,
    "h_cm": 10.4,
    "proj_w_cm": 10.057,
    "margin_cm": 0.603,
    "ref_cm": {
      "x": 5.631,
      "y": 8.427
    },
    "floor_left_cm": {
      "x": 0.603,
      "y": 9.152
    },
    "object_cm": {
      "left": 1.124,
      "top": 0.003,
      "right": 10.138,
      "bottom": 9.732
    },
    "files": [
      {
        "src": "renders/castle-430.webp",
        "w": 430,
        "h": 397
      },
      {
        "src": "renders/castle-860.webp",
        "w": 860,
        "h": 794
      }
    ]
  },
  "house": {
    "w_cm": 55.487,
    "h_cm": 25.482,
    "proj_w_cm": 49.542,
    "margin_cm": 2.973,
    "ref_cm": {
      "x": 27.744,
      "y": 19.779
    },
    "floor_left_cm": {
      "x": 2.973,
      "y": 22.059
    },
    "object_cm": {
      "left": 6.756,
      "top": 0.014,
      "right": 47.747,
      "bottom": 25.344
    },
    "files": [
      {
        "src": "renders/house-2100.webp",
        "w": 2100,
        "h": 964
      },
      {
        "src": "renders/house-3200.webp",
        "w": 3200,
        "h": 1470
      }
    ]
  },
  "brick": {
    "w_cm": 3.952,
    "h_cm": 2.104,
    "proj_w_cm": 3.529,
    "margin_cm": 0.212,
    "ref_cm": {
      "x": 1.976,
      "y": 1.594
    },
    "floor_left_cm": {
      "x": 0.212,
      "y": 1.656
    },
    "object_cm": {
      "left": 0.217,
      "top": 0.2,
      "right": 3.735,
      "bottom": 1.983
    },
    "files": [
      {
        "src": "renders/brick-1600.webp",
        "w": 1600,
        "h": 852
      }
    ]
  }
};
