/* global chrome, storage */

const subl = document.getElementById('subl')

chrome.runtime.onMessage.addListener(request => {
  if (request.command === 'open') {
    const filePath = request.filePath

    storage.localPath.then(localPath => {
      subl.src = `subl://${localPath}${filePath}`.replace(/\\/g, '/')
    })
  }
})

chrome.tabs.onUpdated.addListener(showButton)

chrome.pageAction.onClicked.addListener(tab => {
  const domain = tab.url.match(/^[\w-]+:\/*\[?([\w.:-]+)]?(?::\d+)?/)[0]
  if (domain) {
    chrome.tabs.create({ url: `${domain}/itdc/debug` })
  }
})

function showButton (tabID, info, tab) {
  chrome.tabs.sendRequest(tab.id, { method: 'markExists' }, response => {
    if (response && response.method === 'markExists') {
      if (response.data) {
        chrome.pageAction.show(tabID)
      } else {
        chrome.pageAction.hide(tabID)
      }
    }
  })
}
