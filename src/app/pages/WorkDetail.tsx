import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import Slider from "react-slick";
import {
  ArrowUp,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDocumentTitle } from "../useDocumentTitle";
import { getARStaticUrl, getAppPath } from "../arPaths";
import { useImagePreload } from "../useImagePreload";

import imgQE1 from "../../assets/optimized/workdetail/msqe1.jpg";
import imgQE2 from "../../assets/optimized/workdetail/msqe2.jpg";
import imgQE3 from "../../assets/optimized/workdetail/msqe3.jpg";
import imgQE4 from "../../assets/optimized/workdetail/msqe4.jpg";
import imgQE5 from "../../assets/optimized/workdetail/msqe5.jpg";
import imgQE6 from "../../assets/optimized/workdetail/msqe6.jpg";
import imgQE7 from "../../assets/optimized/workdetail/msqe7.jpg";
import imgQE8 from "../../assets/optimized/workdetail/msqe8.jpg";
import imgQE9 from "../../assets/optimized/workdetail/msqe9.jpg";
import imgQE10 from "../../assets/optimized/workdetail/msqe10.jpg";
import imgQE11 from "../../assets/optimized/workdetail/msqe11.jpg";
import imgQE12 from "../../assets/optimized/workdetail/msqe12.jpg";
import imgQE13 from "../../assets/optimized/workdetail/msqe13.jpg";
import imgQE14 from "../../assets/optimized/workdetail/msqe14.jpg";
import imgVenice1 from "../../assets/optimized/workdetail/venice1.jpg";
import imgVenice2 from "../../assets/optimized/workdetail/venice2.jpg";
import imgVenice3 from "../../assets/optimized/workdetail/venice3.jpg";
import imgVenice4 from "../../assets/optimized/workdetail/venice4.jpg";
import imgVenice5 from "../../assets/optimized/workdetail/venice5.jpg";
import imgVenice6 from "../../assets/optimized/workdetail/venice6.jpg";
import imgVenice7 from "../../assets/optimized/workdetail/venice7.jpg";
import imgVenice8 from "../../assets/optimized/workdetail/venice8.jpg";
import imgVenice9 from "../../assets/optimized/workdetail/venice9.jpg";
import imgVenice10 from "../../assets/optimized/workdetail/venice10.jpg";
import imgVenice11 from "../../assets/optimized/workdetail/venice11.jpg";
import imgVeniceOriginal1 from "../../assets/optimized/workdetail/venice_original1.jpg";
import imgVeniceOriginal2 from "../../assets/optimized/workdetail/venice_original2.jpg";
import imgHawaii1 from "../../assets/optimized/workdetail/hawaii1.jpg";
import imgHawaii2 from "../../assets/optimized/workdetail/hawaii2.jpg";
import imgHawaii3 from "../../assets/optimized/workdetail/hawaii3.jpg";
import imgHawaii4 from "../../assets/optimized/workdetail/hawaii4.jpg";
import imgHawaii5 from "../../assets/optimized/workdetail/hawaii5.jpg";
import imgHawaii6 from "../../assets/optimized/workdetail/hawaii6.jpg";
import imgHawaii7 from "../../assets/optimized/workdetail/hawaii7.jpg";
import imgHawaii8 from "../../assets/optimized/workdetail/hawaii8.jpg";
import imgHawaii9 from "../../assets/optimized/workdetail/hawaii9.jpg";
import imgHawaii10 from "../../assets/optimized/workdetail/hawaii10.jpg";
import imgHawaii11 from "../../assets/optimized/workdetail/hawaii11.jpg";
import imgHawaii12 from "../../assets/optimized/workdetail/hawaii12.jpg";
import imgYasaka1 from "../../assets/optimized/workdetail/yasaka1.jpg";
import imgYasaka2 from "../../assets/optimized/workdetail/yasaka2.jpg";
import imgYasaka3 from "../../assets/optimized/workdetail/yasaka3.jpg";
import imgYasaka4 from "../../assets/optimized/workdetail/yasaka4.jpg";
import imgYasaka5 from "../../assets/optimized/workdetail/yasaka5.jpg";
import imgYasaka6 from "../../assets/optimized/workdetail/yasaka6.jpg";
import imgYasaka7 from "../../assets/optimized/workdetail/yasaka7.jpg";
import imgYasaka8 from "../../assets/optimized/workdetail/yasaka8.jpg";
import imgYasaka9 from "../../assets/optimized/workdetail/yasaka9.jpg";
import imgYasaka10 from "../../assets/optimized/workdetail/yasaka10.jpg";
import imgYasaka11 from "../../assets/optimized/workdetail/yasaka11.jpg";
import imgYasaka12 from "../../assets/optimized/workdetail/yasaka12.jpg";
import imgYasakaOriginal1 from "../../assets/optimized/workdetail/yasaka_original1.jpg";

const WORKS_SEQUENCE = [
  { id: "01", title: "クイーンエリザベス号" },
  { id: "02", title: "ヴェネツィア" },
  { id: "03", title: "八坂神社西楼門" },
  { id: "04", title: "ハワイ火山国立公園" },
];

const WORKS_DATA = {
  "01": {
    id: "01",
    category: "大型作品",
    categoryEn: "LARGE SCALE",
    prefix: "豪華客船",
    title: "クイーンエリザベス号",
    titleEn: "MS Queen Elizabeth",
    year: "2019",
    mainVisual: imgQE1,
    stats: [
      { label: "全長", value: "3m" },
      { label: "ピース数", value: "35,000個" },
      { label: "完成年", value: "2019年" },
      { label: "制作期間", value: "1年" },
      { label: "所要時間", value: "300時間" },
    ],
    overview: [
      "世界有数の豪華客船「クイーンエリザベス号」を1/100スケールで再現した作品で、全長は3メートルに及びます。灘校レゴ同好会時代に手がけた最初の本格的な巨大作品であり、2019年灘校文化祭 SAIL AWAY でお披露目しました。",
      "優美な船首のカーブ、層をなすデッキ、そしてたくさんの客室の窓やバルコニー、鮮やかな煙突など、特徴をとらえながら再現しています。",
    ],
    gallery: [
      {
        url: imgQE3,
        caption: "正面から",
        span: "md:col-span-2",
      },
      {
        url: imgQE4,
        caption: "展示の様子。",
        span: "md:col-span-1",
      },
    ],
    sliderGallery: [
      { url: imgQE5, 
        caption: "船尾から" 
      },
      {
        url: imgQE6,
        caption: "にぎやかなデッキの様子",
      },
      {
        url: imgQE7,
        caption: "灘校レゴ同好会の集合写真",
      },
      {
        url: imgQE9,
        caption: "兵庫津ミュージアムでの展示",
      },
      {
        url: imgQE8,
        caption: "ホテル ナビオス横浜のロビーにて",
      },
    ],
    behindTheScenesGallery: [
      {
        url: imgQE10,
        caption:
          "設計に使った方眼紙とトレーシングペーパー",
      },
      {
        url: imgQE12,
        caption: "重量を支えつつ剪断変形に耐えるための隔壁",
      },
      { 
        url: imgQE13, 
        caption: "組み立ての様子" 
      },
      {
        url: imgQE11,
        caption: "隔壁を入れる以前、イベント出展後に崩壊した船体",
      },
      {
        url: imgQE14,
        caption: "運搬のために船体は3分割できるように設計",
      },
    ],
    behindTheScenes: [
      {
        title: "船首のカーブを描き出す",
        content:
          "船特有の滑らかで立体的な曲線を、四角いブロックのみでいかに表現するか。初めての大型作品の制作で一番苦戦したところでした。綺麗な曲面に見えるよう、一段ごとに分けて方眼紙に曲線を引きながら形を決めていきました。",
      },
      {
        title: "目をひくテーマ",
        content:
          "クイーンエリザベスという船のことは知らなくても、老若男女関係なく「おっきな船だ！」と一目見て分かる、ということは題材としてとても大切です。",
      },
      {
        title: "重量を支える内部構造",
        content:
          "重さ数十キロにもなる作品を安全に運搬し、かつ自重で崩れないよう、内部には隔壁のような補強構造を入れています。完成当初は入れておらず、初めての外部展示の帰りの車の中で一度崩壊したのでした。大型作品に「強度」は必須です。",
      },
      {
        title: "運搬のための分割",
        content:
          "全長3メートルをそのまま運搬するのは至難の業ですから、作品は船首・中央・船尾の３つに分割できるように設計しています。各部のサイズに専用の板を作製することで運搬を容易にしており、灘校体育祭名物の部対抗リレーでは部員が船首を抱えて走ったほどです。",
      },
    ],
    media: {
      youtubeId: "H8JTmG40KX0",
      noteUrl: "https://note.com/nadalegoclub/n/nf8392ffc367e",
    },
    hasAR: true,
    exhibitions: [
      {
        date: "2019年5月",
        name: "第73回 灘校文化祭 SAIL AWAY",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2019年6月",
        name: "Japan Brickfest 2019",
        venue: "カナディアン・アカデミー（神戸）",
      },
      {
        date: "2019年6月",
        name: "サンテレビニュース",
        venue: "サンテレビ",
      },
      {
        date: "2019年6月",
        name: "Live Love ひょうご",
        venue: "NHK",
      },
      {
        date: "2019年10月",
        name: "産経新聞",
        venue: "産経新聞",
      },
      {
        date: "2019年10月",
        name: "船場まつり",
        venue: "船場センタービル（大阪）",
      },
      {
        date: "2019年11月",
        name: "神戸レゴオフ（mol主催）",
        venue: "東灘区民センター（神戸）",
      },
      {
        date: "2020年7月",
        name: "第74回 灘校文化祭 vivid",
        venue: "オンライン開催（新型コロナウイルス流行）",
      },
      {
        date: "2020年8月",
        name: "近鉄百貨店 個展",
        venue: "近鉄百貨店 奈良店",
      },
      {
        date: "2021年1月~2月",
        name: "ホテル ナビオス横浜 長期展示",
        venue: "ナビオス横浜",
        remarks: "ロビーにて2ヶ月間展示",
      },
      {
        date: "2021年6月",
        name: "第75回 灘校文化祭 Knock&Dive",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2022年5月",
        name: "第76回 灘校文化祭 Turn it Over",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2023年5月",
        name: "第77回 灘校文化祭 Splash!",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2023年7月~10月",
        name: "ひょうごレゴ®︎展",
        venue: "兵庫県立兵庫県立兵庫津ミュージアム",
      },
      {
        date: "2024年5月",
        name: "第78回 灘校文化祭 ODYSSEY",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2025年5月",
        name: "第79回 灘校文化祭 weave",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2026年5月",
        name: "第80回 灘校文化祭 Polaris",
        venue: "灘中学校・高等学校",
      },
    ],
  },
  "02": {
    id: "02",
    category: "共同制作",
    categoryEn: "COLLABORATION",
    prefix: "水の都",
    title: "ヴェネツィア",
    titleEn: "Venice",
    year: "2025",
    mainVisual: imgVenice1,
    stats: [
      { label: "サイズ", value: "1m四方" },
      { label: "ピース数", value: "50,000個" },
      { label: "完成年", value: "2025年" },
      { label: "制作期間", value: "半年" },
      { label: "所要時間", value: "のべ1000時間" },
      { label: "制作体制", value: "4名での合作" },
    ],
    overview: [
      "イタリア北部に浮かぶヴェネツィアをミニフィグスケールで再現しました。ゴンドラでの移動のために運河が張り巡らされた街並みは、息を呑むような美しさです。",
      "複雑で入り組んだ街並みを再現すべく、ヴェネツィアらしい情景を凝縮したオリジナルの地図を作成しました。単純な構造にならないよう多様なデザインを考え出し、窓・扉だけで100種類を超えます。",
      "灘校レゴ同好会にかつて所属していたmol, autumn, tsuki, maruがみんな東大レゴ部に揃ったことをきっかけに始まった合作企画で、4人で分担して設計・制作をしました。初めての共同制作による作品です。",
    ],
    gallery: [
      {
        url: imgVenice2,
        caption: "大運河でゴンドラに乗り込む",
        span: "md:col-span-2",
      },
      {
        url: imgVenice3,
        caption: "広場の市場でお買い物",
        span: "md:col-span-2",
      },
    ],
    sliderGallery: [
      { url: imgVeniceOriginal1, 
        caption: "リアルト橋から望むヴェネツィアの大運河" 
      },
      {
        url: imgVenice4,
        caption: "小運河をゴンドラでゆく",
      },
      { url: imgVeniceOriginal2, 
        caption: "実際の小運河" 
      },
      {
        url: imgVenice5,
        caption: "レストランでは海の幸たっぷりのイタリアンを",
      },
      {
        url: imgVenice6,
        caption: "どのレストランも美味しそう",
      },
    ],
    behindTheScenes: [
      {
        title: "複雑で色とりどりな街並み",
        content:
          "長い歴史を持つヴェネツィアの街並みは、繰り返し構造も少ないある種のカオスです。そんな風景を作品に落とし込むため、とにかく多様なパーツを使い、同じ構造は原則3回以上繰り返さないようにするなどさまざまな工夫を凝らして設計しています。",
      },{
        title: "視線を作品に閉じ込める",
        content:
          "運河を覗き込んでも奥が見通せず、世界観の中に見る人の視線を閉じ込められるように設計しています。設計を始める前に3DソフトBlenderで立体のラフ案を作成し、運河や建物の配置と形状を決めていきました。",
      },{
        title: "初めての本格的な共同制作",
        content:
          "4人で建物をそれぞれ3つずつ担当しました。しっかりと分割をしながらも、作品を見ただけでは設計者の違いは分からないはずです。全体のテーマや方針のすり合わせ、綿密かつ忌憚のないコミュニケーションがあって初めて成立する高度な連携が、ハイクオリティな合作を実現しています。",
      },
    ],
    behindTheScenesGallery: [
      { 
        url: imgVenice10, 
        caption: "100種類を超える窓・扉のデザイン" 
      },
      { 
        url: imgVenice7, 
        caption: "Blenderで作成した3Dラフ" 
      },
      { 
        url: imgVenice9, 
        caption: "実際に使用した地図" 
      },
      { 
        url: imgVenice11, 
        caption: "完成した作品の俯瞰図。当初作成した地図とほぼ一致する。" 
      },
    ],
    media: {
      noteUrl: "https://note.com/mol_05/m/m51996852b35f",
    },
    hasAR: true,
    exhibitions: [
      {
        date: "2025年11月",
        name: "第76回駒場祭 灯ととき",
        venue: "東京大学 駒場キャンパス（東京）",
      },
      {
        date: "2026年1月",
        name: "艦船レゴオフ9",
        venue: "川崎市国際交流センター（神奈川）",
      },
      {
        date: "2026年3月",
        name: "Japan Brrick Expo",
        venue: "国立オリンピック記念青少年総合センター（東京）",
      },
    ],
  },
  "03": {
    id: "03",
    category: "大型作品",
    categoryEn: "LARGE SCALE",
    title: "八坂神社 西楼門",
    titleEn: "Yasaka Shrine West Gate",
    year: "2020",
    mainVisual: imgYasaka1,
    stats: [
      { label: "サイズ", value: "全幅2.3m" },
      { label: "ピース数", value: "52,000個" },
      { label: "完成年", value: "2020年" },
      { label: "制作期間", value: "1年" },
      { label: "所要時間", value: "200時間" },
    ],
    overview: [
      "京都・祇園の八坂神社。鮮やかな朱色に塗られたその美しい姿で、四条通の正面に凛々しくずっしりと構えています。",
      "52,000ピースという大型でありながら、細かいディテールを再現するためにこだわりを詰め込みました。中高6年間の活動の集大成としての作品です。",
      "あいにく新型コロナウイルスの流行による突然の臨時休校となり、最後の文化祭はオンライン開催となって現物展示の機会は立ち消えとなりました。なんとか新作を見てもらいたい…… という思いで、ホームページの作成とARでの展示を確立しました。"
    ],
    gallery: [
      {
        url: imgYasaka2,
        caption: "正面から",
        span: "md:col-span-2",
      },
      {
        url: imgYasaka4,
        caption: "屋根と斗組を見上げる",
        span: "md:col-span-2",
      },
    ],
    sliderGallery: [
      { url: imgYasakaOriginal1, 
        caption: "四条通から見る八坂神社" 
      },
      {
        url: imgYasaka5,
        caption: "斗組",
      },
      {
        url: imgYasaka3,
        caption: "近鉄百貨店での個展",
      },
      {
        url: imgYasaka6,
        caption: "めざましテレビ",
      },
      {
        url: imgYasaka12,
        caption: "2021年、卒業後初めて叶った文化祭での展示",
      },
    ],
    behindTheScenes: [
      {
        title: "複雑な斗組（ますぐみ）",
        content:
          "和風建築には欠かせない、屋根などの上部を支えるための構造です。平方根をブロックの許容できる誤差の範疇にとどめる組み方をいろいろ試しました。良い構造を思いついた瞬間は今も鮮明に覚えています。",
      },
      {
        title: "横組みの多用",
        content:
          "滑らかな円柱の柱を作ったり、窓の模様を作ったりなど、ディテールを詰めるためにブロックを積む方向を何度も変えながら設計しました。結果的に強度の向上にもつながっています。",
      },
    ],
    behindTheScenesGallery: [
      {
        url: imgYasaka7,
        caption: "斗組の設計図"
      },
      {
        url: imgYasaka8,
        caption: "柱は全て横向きにプレートを積層して円柱に"
      },
      {
        url: imgYasaka9,
        caption: "設計途中の様子"
      },
      {
        url: imgYasaka10,
        caption: "組み立てに使ったパーツ（の一部）"
      },
      {
        url: imgYasaka11,
        caption: "運搬中に大破したことも(笑)"
      }

    ],
    hasAR: true,
    media: {
      youtubeId: "EfCpyw82vzI",
      noteUrl: "https://note.com/nadalegoclub/n/nb364df0a1304?magazine_key=m5d976d857aab",
    },
    exhibitions: [
      {
        date: "2020年7月",
        name: "第74回 灘校文化祭 vivid",
        venue: "オンライン開催（新型コロナウイルス流行）",
      },
      {
        date: "2020年8月",
        name: "近鉄百貨店 個展",
        venue: "近鉄百貨店 奈良店",
      },
      {
        date: "2021年6月",
        name: "第75回 灘校文化祭 Knock&Dive",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2022年5月",
        name: "第76回 灘校文化祭 Turn it Over",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2022年6月",
        name: "Japan Brickfest 2022",
        venue: "カナディアン・アカデミー（神戸）",
      },
      {
        date: "2023年5月",
        name: "第77回 灘校文化祭 Splash!",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2024年5月",
        name: "第78回 灘校文化祭 ODYSSEY",
        venue: "灘中学校・高等学校",
      },
      {
        date: "2025年5月",
        name: "第79回 灘校文化祭 weave",
        venue: "灘中学校・高等学校",
      },
    ],
  },
  "04": {
    id: "04",
    category: "ジオラマ",
    categoryEn: "DIORAMA",
    title: "ハワイ火山国立公園",
    titleEn: "Hawaii Volcanoes National Park",
    year: "2020",
    mainVisual: imgHawaii2,
    stats: [
      { label: "サイズ", value: "直径1m" },
      { label: "ピース数", value: "10,000個" },
      { label: "完成年", value: "2020年" },
      { label: "所要時間", value: "140時間" },
    ],
    overview: [
      "世界遺産・ハワイ火山国立公園をレゴブロックで再現しました。ハワイは太平洋プレート上のホットスポットによって形成された火山諸島であり、なだらかに広がる雄大な地形と、絶えず新しい大地を生み出す火山活動の力強さを体感できる場所です。",
      "ブロックとプレートを積層したシンプルな組み立てで、レゴらしさを残しつつ火山地形の自然な起伏と噴火の迫力を引き出すようデザインしています。内部にはLEDライトを組み込み、ゆるやかに明滅する演出を加えています。",
    ],
    gallery: [
      {
        url: imgHawaii3,
        caption: "電飾を入れると本物の溶岩のようです。",
        span: "md:col-span-2",
      },
      {
        url: imgHawaii4,
        caption: "世界遺産展での展示の様子",
        span: "md:col-span-2",
      },
    ],
    sliderGallery: [
      {
        url: imgHawaii5, 
        caption: "モデルにした火口。今も活動を続けています。" 
      },
      {
        url: imgHawaii8,
        caption: "正面から"
      },
      {
        url: imgHawaii6,
        caption: "火口付近の煮えたぎる溶岩",
      },
      {
        url: imgHawaii7,
        caption: "火口部分の設計図",
      },
    ],
    behindTheScenes: [
      {
        title: "なだらかな地形の再現",
        content:
          "ハワイの火山の雄大さと迫力を、限られた大きさの中に詰め込むために何度も試行錯誤しました。可能な限り実物に忠実な再現を心がけています。",
      },
    ],
    behindTheScenesGallery: [
      {
        url: imgHawaii9,
        caption: "組み立てのために層ごとに色分けした設計図",
      },
      {
        url: imgHawaii10,
        caption: "設計図",
      },
      {
        url: imgHawaii12,
        caption: "作品のために作った専用の等高線図",
      },
    ],
    hasAR: true,
    exhibitions: [
      {
        date: "2020年2月~3月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4",
        venue: "渋谷PARCO（東京）",
      },
      {
        date: "2020年6月~8月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4",
        venue: "広島PARCO（広島）",
      },
      {
        date: "2020年8月~9月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4",
        venue: "名古屋PARCO（愛知）",
      },
      {
        date: "2020年10月~12月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4",
        venue: "富岡製糸場（群馬）",
      },
      {
        date: "2021年6月~7月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4",
        venue: "仙台PARCO（宮城）",
      },
      {
        date: "2021年6月~7月",
        name: "『レゴ®ブロック』で作った世界遺産展 PART-4 FINAL",
        venue: "心斎橋PARCO（大阪）",
      },
    ],
  },
};

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  viewportMargin = "0px",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  viewportMargin?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: viewportMargin }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-full overflow-hidden block"
  >
    {children}
  </motion.div>
);

export const WorkDetail = () => {
  const { id } = useParams();
  const work = id
    ? WORKS_DATA[id as keyof typeof WORKS_DATA]
    : null;
  useDocumentTitle(work ? `mol - ${work.title}` : "mol - 作品");
  const isMainVisualReady = useImagePreload(work?.mainVisual ?? "");
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!expandedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImage]);

  if (!work) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <p className="font-['Noto_Serif_JP',_serif] text-stone-500 tracking-widest">
          作品が見つかりません
        </p>
        <Link
          to="/"
          className="mt-8 text-xs font-['Inter',_sans-serif] text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!isMainVisualReady) {
    return <main className="w-full min-h-screen bg-white" />;
  }

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2400,
    speed: 1200,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    pauseOnHover: false,
    pauseOnFocus: false,
    swipeToSlide: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollSlider = (direction: "prev" | "next") => {
    if (direction === "next") {
      sliderRef.current?.slickNext();
      return;
    }

    sliderRef.current?.slickPrev();
  };

  const openExpandedImage = (src: string, alt: string, caption?: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setExpandedImage({ src, alt, caption });
  };

  const currentIndex = WORKS_SEQUENCE.findIndex(
    (w) => w.id === work.id,
  );
  const prevWork =
    currentIndex > 0 ? WORKS_SEQUENCE[currentIndex - 1] : null;
  const nextWork =
    currentIndex < WORKS_SEQUENCE.length - 1
      ? WORKS_SEQUENCE[currentIndex + 1]
      : null;
  const arExperiencePath =
    getARStaticUrl(work.id, getAppPath(`/work/${work.id}`)) ??
    `/ar-experience/${work.id}?back=${encodeURIComponent(getAppPath(`/work/${work.id}`))}`;

  return (
    <main className="w-full bg-white pb-32">
      {/* 1. 戻る導線 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group"
        >
          <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 group-hover:text-stone-900 tracking-widest uppercase transition-colors">
            ← Back to Home
          </span>
        </Link>
      </div>

      <article className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
        {/* ヘッダー・タイトル群 */}
        <header className="flex flex-col mb-12 md:mb-16 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* 2 & 3. 作品番号・カテゴリ */}
            <div className="flex flex-wrap items-baseline gap-4 mb-6 md:mb-8">
              <span className="font-['Inter',_sans-serif] text-xs md:text-sm text-stone-400 tracking-[0.2em] whitespace-nowrap">
                No.{work.id}
              </span>
              <span className="w-8 h-[1px] bg-stone-300" />
              <span className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-500 tracking-widest">
                {work.category}
                <span className="ml-3 font-['Inter',_sans-serif] text-[10px] md:text-xs tracking-[0.2em] opacity-60">
                  {work.categoryEn}
                </span>
              </span>
            </div>

            {/* 4. 作品タイトル & 5. 制作年 */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 w-full">
              <div className="flex-1 w-full">
                {(work as any).prefix && (
                  <span className="font-['Noto_Serif_JP',_serif] text-base md:text-lg text-stone-700 tracking-widest block mb-1">
                    {(work as any).prefix}
                  </span>
                )}
                <h1 className="font-['Noto_Serif_JP',_serif] text-3xl md:text-5xl lg:text-6xl text-stone-900 tracking-[0.05em] leading-tight mb-2 md:mb-4 break-words hyphens-auto w-full">
                  {work.title}
                </h1>
                <p className="font-['Inter',_sans-serif] text-sm md:text-base text-stone-400 tracking-[0.2em] font-light w-full break-words">
                  {work.titleEn}
                </p>
              </div>
              <div className="font-['Inter',_sans-serif] text-2xl md:text-4xl text-stone-300 tracking-wider font-light md:pb-2 shrink-0">
                {work.year}
              </div>
            </div>
          </motion.div>
        </header>

        {/* 6. メインビジュアル */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full aspect-[3/2] md:aspect-[16/9] bg-stone-100 mb-16 md:mb-24 overflow-hidden"
        >
          <img
            src={work.mainVisual}
            alt={work.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.figure>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 w-full">
  {/* 左側：データ列 */}
  <div className="w-full lg:w-1/3 flex flex-col gap-12 shrink-0">
    <FadeIn>
      <div className="flex flex-col w-full">
        <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-8 border-b border-stone-200 pb-4">
          Data
        </h2>

        <dl className="w-full">
          {work.stats?.map((stat, i) => (
            <div
              key={i}
              className="flex items-start gap-4 md:gap-6 py-4 border-b border-stone-100 w-full"
            >
              <dt className="shrink-0 w-20 md:w-24 font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-500 tracking-wider">
                {stat.label}
              </dt>
              <dd className="min-w-0 flex-1 font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-900 tracking-wider text-right break-words">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </FadeIn>

    {/* 12. AR / 3D Viewer 導線 (PC表示時に左カラムに配置、モバイルでは後述) */}
      {work.hasAR && (
        <div className="hidden lg:block w-full">
          <FadeIn delay={0.2}>
            <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-8 border-b border-stone-200 pb-4">
              Experience
            </h2>
            <a
              href={arExperiencePath}
              className="group block bg-stone-50 hover:bg-stone-100 border border-stone-200 p-8 transition-colors text-center"
            >
              <div className="w-12 h-12 mx-auto border border-stone-300 rounded-full flex items-center justify-center mb-4 group-hover:border-stone-500 transition-colors">
                <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-800 transition-colors" />
              </div>
              <span className="block font-['Inter',_sans-serif] text-xs tracking-[0.2em] text-stone-500 mb-2">
                3D / AR VIEWER
              </span>
              <span className="block font-['Noto_Serif_JP',_serif] text-sm text-stone-900 tracking-widest group-hover:text-stone-600 transition-colors break-words">
                3Dモデルを空間に配置する
              </span>
            </a>
          </FadeIn>
        </div>
      )}
    </div>

           
           

          {/* 右側：メインコンテンツ群 */}
          <div className="w-full lg:w-2/3 flex flex-col gap-24 md:gap-32 min-w-0">
            {/* 8. 作品概要 */}
            <FadeIn>
              <section className="flex flex-col gap-6 md:gap-8 w-full">
                {work.overview?.map((text, i) => (
                  <p
                    key={i}
                    className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-700 leading-loose tracking-[0.08em] text-justify break-words hyphens-auto w-full"
                  >
                    {text}
                  </p>
                ))}
              </section>
            </FadeIn>

            {/* 12. AR / 3D Viewer (モバイル表示時は概要の直後に) */}
            {work.hasAR && (
              <div className="block lg:hidden w-full">
                <FadeIn>
                  <a
                    href={arExperiencePath}
                    className="group block bg-stone-50 hover:bg-stone-100 border border-stone-200 p-8 transition-colors text-center"
                  >
                    <div className="w-12 h-12 mx-auto border border-stone-300 rounded-full flex items-center justify-center mb-4 group-hover:border-stone-500 transition-colors">
                      <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-800 transition-colors" />
                    </div>
                    <span className="block font-['Inter',_sans-serif] text-xs tracking-[0.2em] text-stone-500 mb-2">
                      3D / AR VIEWER
                    </span>
                    <span className="block font-['Noto_Serif_JP',_serif] text-sm text-stone-900 tracking-widest break-words">
                      3Dモデルを空間に配置する
                    </span>
                  </a>
                </FadeIn>
              </div>
            )}

            {/* 9. 写真ギャラリー */}
            {work.gallery && work.gallery.length > 0 && (
              <section className="w-full">
                <FadeIn>
                  <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-6 border-b border-stone-200 pb-4">
                    Gallery
                  </h2>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8 w-full">
                  {work.gallery.map((img, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                      <figure
                        className={`flex flex-col gap-3 ${img.span || ""}`}
                      >
                        <button
                          type="button"
                          onClick={() => openExpandedImage(img.url, img.caption, img.caption)}
                          className="w-full bg-stone-100 aspect-[4/3] md:aspect-[3/2] overflow-hidden cursor-default md:cursor-zoom-in"
                          aria-label={`${img.caption} を拡大表示`}
                        >
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </button>
                        {img.caption && (
                          <figcaption className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-wider px-1">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    </FadeIn>
                  ))}
                </div>

                {/* スライダー形式の追加ギャラリー */}
                {work.sliderGallery &&
                  work.sliderGallery.length > 0 && (
                    <FadeIn delay={0.2}>
                      <div className="relative mt-4 md:mt-8 w-full min-w-0">
                        <div className="hidden md:block">
                          <button
                            type="button"
                            onClick={() => scrollSlider("prev")}
                            className="absolute left-4 top-[calc(50%-2rem)] z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-stone-800 shadow-sm border border-stone-200 transition-colors rounded-full backdrop-blur-sm"
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                          </button>
                    
                          <button
                            type="button"
                            onClick={() => scrollSlider("next")}
                            className="absolute right-4 top-[calc(50%-2rem)] z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-stone-800 shadow-sm border border-stone-200 transition-colors rounded-full backdrop-blur-sm"
                            aria-label="Next slide"
                          >
                            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                          </button>
                        </div>
                    
                        <Slider
                          ref={sliderRef}
                          {...sliderSettings}
                          className="-mx-2 md:-mx-4 [&_.slick-list]:overflow-hidden [&_.slick-track]:flex"
                        >
                          {work.sliderGallery.map((img, i) => (
                            <div key={`${img.url}-${i}`} className="px-2 md:px-4">
                              <figure className="flex flex-col gap-3">
                                <button
                                  type="button"
                                  onClick={() => openExpandedImage(img.url, img.caption, img.caption)}
                                  className="w-full bg-stone-100 aspect-[4/3] md:aspect-[3/2] overflow-hidden cursor-default md:cursor-zoom-in"
                                  aria-label={`${img.caption} を拡大表示`}
                                >
                                  <img
                                    src={img.url}
                                    alt={img.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-[1.02]"
                                    loading="lazy"
                                  />
                                </button>
                                {img.caption && (
                                  <figcaption className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-wider px-1">
                                    {img.caption}
                                  </figcaption>
                                )}
                              </figure>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </FadeIn>
                  )}
              </section>
            )}

            {/* 10. 制作背景・裏話 */}
            {work.behindTheScenes &&
              work.behindTheScenes.length > 0 && (
                <section className="w-full">
                  <FadeIn>
                    <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-8 border-b border-stone-200 pb-4">
                      Behind the Scenes
                    </h2>
                  </FadeIn>
                  <div className="flex flex-col gap-12 md:gap-16 w-full">
                    {work.behindTheScenes.map((item, i) => (
                      <FadeIn key={i} delay={0.1}>
                        <div className="flex flex-col w-full">
                          <h3 className="font-['Noto_Serif_JP',_serif] text-base md:text-lg text-stone-900 tracking-widest mb-4 break-words hyphens-auto w-full">
                            {item.title}
                          </h3>
                          <p className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-600 leading-loose tracking-[0.08em] text-justify break-words hyphens-auto w-full">
                            {item.content}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  {/* Behind the Scenes 画像 */}
                  {work.behindTheScenesGallery &&
                    work.behindTheScenesGallery.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-16 w-full">
                        {work.behindTheScenesGallery.map(
                          (img, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                              <figure
                                className={`flex flex-col gap-3 ${img.span || ""}`}
                              >
                                <button
                                  type="button"
                                  onClick={() => openExpandedImage(img.url, img.caption, img.caption)}
                                  className="w-full bg-stone-100 aspect-[4/3] md:aspect-[3/2] overflow-hidden cursor-default md:cursor-zoom-in"
                                  aria-label={`${img.caption} を拡大表示`}
                                >
                                  <img
                                    src={img.url}
                                    alt={img.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 md:hover:scale-[1.02]"
                                    loading="lazy"
                                  />
                                </button>
                                {img.caption && (
                                  <figcaption className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-wider px-1">
                                    {img.caption}
                                  </figcaption>
                                )}
                              </figure>
                            </FadeIn>
                          ),
                        )}
                      </div>
                    )}
                </section>
              )}

            {/* 11 & 13. メイキング映像 / note導線 */}
            {work.media && (
              <section className="w-full min-w-0 max-w-full overflow-hidden block">
                <FadeIn>
                  <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-8 border-b border-stone-200 pb-4">
                    Process & Records
                  </h2>
                </FadeIn>
                <div className="flex flex-col gap-8 w-full min-w-0 max-w-full overflow-hidden">
                  {/* YouTube Embed */}
                  {work.media.youtubeId && (
                    <FadeIn delay={0.1}>
                      <div className="w-full aspect-video bg-stone-100 relative">
                        {/* 実際の環境では iframe を使用 */}
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${work.media.youtubeId}?rel=0`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>
                      <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-wider mt-3 px-1">
                        制作過程の記録映像
                      </p>
                    </FadeIn>
                  )}

                  {/* note Link */}
                  {work.media.noteUrl && (
                    <FadeIn delay={0.2}>
                      <a
                        href={work.media.noteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border border-stone-200 p-6 md:p-8 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex flex-col gap-2 min-w-0">
                          <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase">
                            Article
                          </span>
                          <span className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-800 tracking-widest break-words">
                            制作記を読む（note）
                          </span>
                        </div>
                        <ExternalLink
                          className="w-4 h-4 text-stone-300 group-hover:text-stone-800 transition-colors"
                          strokeWidth={1.5}
                        />
                      </a>
                    </FadeIn>
                  )}
                </div>
              </section>
            )}

            {/* 14. 展示・メディア掲載歴 */}
            {work.exhibitions &&
              work.exhibitions.length > 0 && (
                <section className="w-full max-w-full overflow-hidden block">
                  <FadeIn>
                    <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-6 md:mb-8 border-b border-stone-200 pb-4">
                      Exhibitions & Media
                    </h2>
                  </FadeIn>
                  <div className="flex flex-col w-full max-w-full overflow-hidden">
                    {work.exhibitions.map((ex, i) => (
                      <FadeIn
                        key={i}
                        delay={i * 0.04}
                        duration={0.45}
                        viewportMargin="0px 0px 15% 0px"
                      >
                        <div className="flex flex-col md:flex-row py-4 md:py-6 border-b border-stone-100 gap-2 md:gap-8 w-full overflow-hidden">
                          <span className="font-['Inter',_sans-serif] text-xs text-stone-400 tracking-widest w-32 shrink-0">
                            {ex.date}
                          </span>
                          <div className="flex flex-col gap-1 w-full overflow-hidden">
                            <span className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-800 tracking-wider break-words hyphens-auto w-full">
                              {ex.name}
                            </span>
                            <span className="font-['Noto_Serif_JP',_serif] text-xs text-stone-500 tracking-wider break-words hyphens-auto w-full">
                              {ex.venue}
                              {ex.remarks && (
                                <span className="ml-2 before:content-['|'] before:mr-2 before:text-stone-300">
                                  {" "}
                                  {ex.remarks}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </section>
              )}
          </div>
        </div>
      </article>

      {/* 15. 他作品への回遊導線 */}
      <nav className="w-full max-w-[100vw] border-t border-stone-200 mt-32 md:mt-48 overflow-hidden block">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 overflow-hidden block">
          {/* 前の作品へ */}
          {prevWork ? (
            <Link
              to={`/work/${prevWork.id}`}
              className="col-span-1 border-r border-stone-200 p-6 md:p-12 hover:bg-stone-50 transition-colors group flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-4">
                <ArrowLeft
                  className="w-3 h-3 text-stone-400 group-hover:text-stone-800 transition-colors"
                  strokeWidth={1.5}
                />
                <span className="font-['Inter',_sans-serif] text-[10px] text-stone-400 uppercase tracking-widest group-hover:text-stone-800 transition-colors">
                  Prev
                </span>
              </div>
              <span className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-800 tracking-widest break-words line-clamp-2">
                {prevWork.title}
              </span>
            </Link>
          ) : (
            <div className="col-span-1 border-r border-stone-200 p-6 md:p-12 bg-stone-50/50" />
          )}

          {/* トップへ戻る (モバイルでは非表示か、またはデザインを変える) */}
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="hidden md:flex col-span-1 border-r border-stone-200 p-6 md:p-12 hover:bg-stone-50 transition-colors group flex-col items-center justify-center"
          >
            <ArrowUp
              className="w-4 h-4 text-stone-400 group-hover:-translate-y-1 group-hover:text-stone-800 transition-all duration-300 mb-3"
              strokeWidth={1.5}
            />
            <span className="font-['Inter',_sans-serif] text-[10px] text-stone-400 uppercase tracking-widest group-hover:text-stone-800 transition-colors">
              Back to Top
            </span>
          </button>

          {/* 次の作品へ */}
          {nextWork ? (
            <Link
              to={`/work/${nextWork.id}`}
              className="col-span-1 p-6 md:p-12 hover:bg-stone-50 transition-colors group flex flex-col items-end justify-center text-right"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="font-['Inter',_sans-serif] text-[10px] text-stone-400 uppercase tracking-widest group-hover:text-stone-800 transition-colors">
                  Next
                </span>
                <ArrowRight
                  className="w-3 h-3 text-stone-400 group-hover:text-stone-800 transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <span className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-800 tracking-widest break-words line-clamp-2">
                {nextWork.title}
              </span>
            </Link>
          ) : (
            <div className="col-span-1 p-6 md:p-12 bg-stone-50/50" />
          )}
        </div>

        {/* モバイル用トップへ戻る */}
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="w-full flex md:hidden border-t border-stone-200 p-6 hover:bg-stone-50 transition-colors items-center justify-center gap-2 group"
        >
          <ArrowUp
            className="w-3 h-3 text-stone-400"
            strokeWidth={1.5}
          />
          <span className="font-['Inter',_sans-serif] text-[10px] text-stone-400 uppercase tracking-widest">
            Back to Top
          </span>
        </button>
      </nav>

      {expandedImage && (
        <motion.div
          className="hidden md:flex fixed inset-0 z-[200] items-center justify-center bg-stone-950/88 px-10 py-10"
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="拡大画像ビュー"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => setExpandedImage(null)}
            className="absolute right-6 top-6 font-['Inter',_sans-serif] text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            aria-label="拡大表示を閉じる"
          >
            Close
          </button>
          <motion.div
            className="flex max-h-full max-w-[min(92vw,1400px)] flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.992, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.995, y: 4 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={expandedImage.src}
              alt={expandedImage.alt}
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            {expandedImage.caption && (
              <p className="font-['Noto_Serif_JP',_serif] text-xs tracking-wider text-white/75">
                {expandedImage.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};
