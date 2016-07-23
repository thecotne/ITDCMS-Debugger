chrome.devtools.panels.create(
  'ITDCMS dubugger',
  './icons/icon19.png',
  './html/devtoolsPanel.html',
  null // no callback needed
);

chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  chrome.devtools.inspectedWindow.eval(`(${getElement.toString()})()`, (filePath, isException) => {
      if (filePath) {
        chrome.runtime.sendMessage({
          command: 'open',
          filePath,
        });
      };
    }
  );
});


function getElement() {
  if ($0.nodeType == document.COMMENT_NODE) {
    $0.textContent;
    const parts = $0.textContent.split(' ');
    for(const key in parts) {
      if (/\/.+\.php$/i.test(parts[key])) {
        const meta_remove_path = document.querySelector('meta[name="itdcms:root_path"]');
        if  (meta_remove_path && meta_remove_path.content) {
          return parts[key].replace(meta_remove_path.content, '');
        } else {
          return parts[key];
        }
      }
    }
  }
}
