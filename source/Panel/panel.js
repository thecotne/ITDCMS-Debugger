var iframe,
	root;

chrome.devtools.inspectedWindow.eval("location", function(location){
	root = location.protocol + '//' + location.host;
	makeIframe(root+'/itdc/system/debugInfo/0')
	i = 0;
});

chrome.devtools.network.onRequestFinished.addListener(function(request) {
	for(k in request.request.headers) {
		if(request.request.headers[k]['name'] == 'X-Requested-With' && request.request.headers[k]['value'] == 'XMLHttpRequest') {
			makeIframe(root+'/itdc/system/debugInfo/0');
		}
	}
});

chrome.devtools.network.onNavigated.addListener(function(url) {
	makeIframe(root+'/itdc/system/debugInfo/0');
});

function makeIframe(url){
	if (!iframe) {
		iframe = document.createElement('iframe');
		iframe.setAttribute('width','100%');
		iframe.setAttribute('height','100%');
		document.body.appendChild(iframe);
	}
	iframe.setAttribute('src',url);
}
