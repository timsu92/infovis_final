1. 用 npm 安裝依賴套件
2. 編輯 `src/index.ts`。我們邏輯的部分都寫那
3. 執行 `npm run dev` 預覽目前的樣子
4. 執行 `npm run build` 將整個專案打包。結果會在 `dist` 資料夾中
5. 透過 `npx http-server dist -p 8080 --cors '*'` 開啟伺服器檢視打包的成果，可以在 `http://localhost:8080` 中檢視
