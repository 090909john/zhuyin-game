# 注音小遊戲：第五課〈翹翹板〉

給國小一年級練習注音的網頁小遊戲（純靜態，免安裝、免伺服器）。

## 遊戲模式
1. 🔊 聽音找注音：按喇叭聽聲音，選出正確符號（ㄋ ㄍ ㄞ ㄥ ㄧㄚ ㄧㄡ ㄧㄤ）
2. 🔗 詞語配對：看詞語，選出正確注音
3. 🧩 拼拼看：用 ㄧ＋ㄚ／ㄡ／ㄤ 拼出結合韻
4. ✏️ 描寫練習：用手指在畫布上描寫注音

答對得星星（存在瀏覽器裡）。發音使用瀏覽器內建語音（zh-TW），建議用 Chrome／Safari。

## 部署到 GitHub Pages
1. 在 GitHub 建立新的 repository（例如 `zhuyin-game`）。
2. 上傳本資料夾所有檔案（`index.html`、`style.css`、`game.js`、`README.md`）到 repository 根目錄。
   - 或用指令：`git init && git add . && git commit -m "init" && git branch -M main && git remote add origin https://github.com/你的帳號/zhuyin-game.git && git push -u origin main`
3. 到 repository 的 **Settings → Pages**。
4. Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾 `/ (root)`，按 Save。
5. 等一兩分鐘，網址會是 `https://你的帳號.github.io/zhuyin-game/`。

本機試玩：直接用瀏覽器開啟 `index.html` 即可。
