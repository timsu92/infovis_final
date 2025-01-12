1. 用 npm 安裝依賴套件
2. 編輯 `src/index.ts`。我們邏輯的部分都寫那
3. 執行 `npm run build` 將 TypeScript 編譯成 JavaScript
4. 將 `dist/src/index.js` 中除了最前面 import 的內容都複製到 `src/index.html` 的 `<script type="module">` 標籤內
5. 用瀏覽器開啟 `src/index.html`