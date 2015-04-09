var iframe,
	root;

function makeIframe(){
	if (!iframe) {
		iframe = document.createElement('iframe');
		iframe.setAttribute('width','100%');
		iframe.setAttribute('height','100%');
		document.body.appendChild(iframe);
	}
	iframe.setAttribute('src', root + '/itdc/debug/');
}

chrome.devtools.inspectedWindow.eval("location.protocol + '//' + location.host", function(_root){
	root = _root;
	makeIframe();
	chrome.devtools.network.onRequestFinished.addListener(function(request) {
		for(k in request.request.headers) {
			if(request.request.headers[k]['name'] == 'X-Requested-With' && request.request.headers[k]['value'] == 'XMLHttpRequest') {
				makeIframe();
			}
		}
	});
	chrome.devtools.network.onNavigated.addListener(function(url) {
		makeIframe();
	});
});

