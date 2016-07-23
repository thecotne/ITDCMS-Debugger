for (const key in settings.contextMenus) {
  chrome.contextMenus.create({
    title: `Change ${settings.contextMenus[key].label}`,
    contexts: ['page'],
    onclick() {
      settings.get(all => {
        const def = all[settings.contextMenus[key].key];
        const val = prompt(`Change ${settings.contextMenus[key].label}`, def) || def;

        if (val != def) {
          all[settings.contextMenus[key].key] = val;
          settings.set(all);
        }
      });
    },
  });
}

chrome.contextMenus.create({
  title: 'reset settings',
  contexts: ['page'],
  onclick() {
    if (confirm('Are you sure you want to reset settings?')) {
      settings.set(settings._default);
    }
  },
});

const subl = document.getElementById('subl');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command == 'open') {
    const filePath = request.filePath;
    settings.get(all => {
      subl.src = `subl://${all.dirpath + filePath}`.replace(/\\/g,'/');
    });
  }
});

chrome.tabs.onUpdated.addListener(showButton);

chrome.pageAction.onClicked.addListener(tab => {
  var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
  if (domain) {
    chrome.tabs.create({'url': `${domain}/itdc/debug`});
  }
});

function showButton(tabID, info, tab) {
  chrome.tabs.sendRequest(tab.id, {method: 'markExists'}, response => {
    if (response && response.method === 'markExists') {
      if (response.data) {
        chrome.pageAction.show(tabID);
      } else {
        chrome.pageAction.hide(tabID);
      }
    }
  });
}
