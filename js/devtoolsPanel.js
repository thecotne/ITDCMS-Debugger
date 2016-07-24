/* global chrome */

let iframe;
let root;

chrome.devtools.inspectedWindow.eval('`${location.protocol}//${location.host}`', url => {
  root = url;
  makeIframe();
  chrome.devtools.network.onRequestFinished.addListener(request => {
    for (const key in request.request.headers) {
      if (request.request.headers[key].name === 'X-Requested-With' &&
        request.request.headers[key].value === 'XMLHttpRequest'
      ) {
        makeIframe();
      }
    }
  });

  chrome.devtools.network.onNavigated.addListener(makeIframe);
});

function makeIframe() {
  if (! iframe) {
    iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');

    document.body.appendChild(iframe);
  }

  iframe.setAttribute('src', `${root}/itdc/debug/`);
}
