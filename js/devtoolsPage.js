/* global chrome */

chrome.devtools.panels.create(
  'ITDCMS dubugger',
  './icons/icon19.png',
  './html/devtoolsPanel.html',
  null // no callback needed
);

chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  chrome.devtools.inspectedWindow.eval(`(${getElement.toString()})()`, (filePath) => {
    if (filePath) {
      chrome.runtime.sendMessage({
        command: 'open',
        filePath,
      });
    }
  });
});


function getElement() {
  /* global $0 */

  if ($0.nodeType === document.COMMENT_NODE) {
    const parts = $0.textContent.split(' ');
    for (const key in parts) {
      if (/\/.+\.php$/i.test(parts[key])) {
        const metaRemovePath = document.querySelector('meta[name="itdcms:root_path"]');
        if (metaRemovePath && metaRemovePath.content) {
          return parts[key].replace(metaRemovePath.content, '');
        } else {
          return parts[key];
        }
      }
    }
  }

  return false;
}
