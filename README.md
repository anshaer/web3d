# 居民都市 MToon · 10 人示範版

直接用 Chrome / Edge 開啟 People_City_MToon.html。三個程式庫已內嵌，不需連網下載。
需要開啟瀏覽器硬體加速、支援 WebGL。尚未在可用的 WebGL 瀏覽器完成畫面驗證。

- 拖曳旋轉，滾輪或雙指縮放；禁止平移。
- 點建築或左側名單顯示介紹，鏡頭移到人物附近。
- 可搜尋名稱／標籤，依創作、技術、交流篩選。
- 內含 10 位虛構人物，以動物符號作為頭像占位。
- avatar 可填頭像網址；圖床須允許跨來源 CORS，否則仍顯示動物符號。
- 可以匯入／匯出 JSON。此版只供 10 筆概念測試，尚未實作千筆分區載入或大量繪製優化。

## 放到靜態網站

將 People_City_MToon.html 改名 index.html，與 residents.json 放在同個資料夾即可。
HTTP/HTTPS 模式會讀取同資料夾的 residents.json；本機直接開啟使用內建資料，也可手動匯入。
外部 JSON 此示範版要求恰好 10 筆。讀取失敗會退回內建資料並顯示原因。
不需要 PHP、SQL 或 Node 伺服器。

## JSON 欄位

id：唯一代號；name：名稱；group：創作／技術／交流；emoji：備用頭像；avatar：圖片網址或 data URL；tags：文字陣列；bio：介紹；joined：加入日期。

## 著色器與依賴

建築、地面、植栽採用 @pixiv/three-vrm 3.3.0 的 MToonMaterial，並非 MeshToonMaterial 替代。
頭像招牌用 MeshBasicMaterial 保持清楚可讀。使用 Three.js 0.170.0 和 OrbitControls。
來源：https://github.com/pixiv/three-vrm 、 https://github.com/mrdoob/three.js
依賴授權見 vendor/LICENSE-*。

Copyright © 2026-2030 anshaer.com. All rights reserved.
