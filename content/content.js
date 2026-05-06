// 占位 content script
// 主要的内容抓取逻辑在 background/service-worker.js 中通过 scripting.executeScript 注入
// 此文件保留以便未来扩展（如：在页面上显示一键收藏浮层）

(function () {
  // 防重复注入
  if (window.__zhicun_injected__) return;
  window.__zhicun_injected__ = true;
  // 留作未来：选中后显示快速保存按钮、悬浮提示等
})();
