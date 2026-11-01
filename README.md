# 居民都市 MToon · 100 人地塊版

直接開啟 People_City_MToon.html，依賴已內嵌，可離線使用。
需要支援 WebGL 的 Chrome / Edge。此執行環境無法建立 WebGL，尚未完成實際畫面驗證。

## 地塊與刷新
- 10×10 固定地塊，100 位虛構人口，一人一塊。
- 人物以 id 識別，plot.x / plot.z 固定對應地塊（整數 0～9），排序改變不影響地址。
- 同一時間最多載入附近 5×5 共 25 塊。跨過地塊邊界時保留重疊區域，回收離開的地塊並配置新人物。
- 只有載入區域建立頭像材質；卸載時釋放招牌圖片與幾何資源。地面和道路常駐。
- 五種模板共用幾何與材質：house 尖頂住宅、shop 商店、tower 公寓、studio 工作室、villa 別墅。
- 未載入區域不顯示建築，此版沒有全城低精度遠景。

## 操作
拖曳旋轉、右鍵拖曳或觸控雙指平移、滾輪／雙指縮放。
北／南／東／西按鈕可巡城。搜尋與名單涵蓋全部人口，點名單可跳轉到人物地址。
點建築查看介紹，回到中心可重設巡覽位置。

## JSON
HTTP/HTTPS 開啟會自動讀同資料夾 residents.json，直接開本機檔使用內建資料。
也可手動匯入、匯出。允許 1～100 人；ID 與地塊不能重複。
必要欄位：id、name、group（創作／技術／交流）、plot、template；tags 為字串陣列。
例如：
```json
{"id":"p001","name":"小晴","group":"創作","emoji":"🐱","avatar":"","tags":["繪圖"],"bio":"人物介紹","plot":{"x":0,"z":0},"template":"house"}
```
avatar 可填允許跨來源 CORS 的圖片網址或 data URL，未填使用動物占位。

## 發佈靜態檔
把 People_City_MToon.html 改名 index.html，和 residents.json 放在同一資料夾。
不需要 PHP 或 SQL。

建築、地面、植栽使用 @pixiv/three-vrm 3.3.0 MToonMaterial。
招牌採 MeshBasicMaterial 保持清晰；Three.js 0.170.0，OrbitControls。
依賴授權在 vendor/LICENSE-*。
Copyright © 2026-2030 anshaer.com. All rights reserved.
