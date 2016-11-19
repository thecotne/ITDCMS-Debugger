/* global chrome */

const rootPath = document.querySelector('meta[name="itdcms:root_path"]')
const removePath = (rootPath && rootPath.content)
const files = document.querySelectorAll('open_file')

for (const file of files) {
  file.addEventListener('click', e => {
    e.preventDefault()

    if (this.dataset.openfile) {
      let filePath = this.dataset.openfile.trim()

      if (removePath) {
        filePath = filePath.replace(removePath, '')
      }

      chrome.runtime.sendMessage({
        command: 'open',
        filePath
      })
    }
  })
}

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
  if (request.method === 'markExists') {
    sendResponse({
      data: rootPath,
      method: 'markExists'
    })
  }
})
