var iframe,
	root,
	debug_url,
	theme;
function makeIframe(){
	if (!iframe) {
		iframe = document.createElement('iframe');
		iframe.setAttribute('width','100%');
		iframe.setAttribute('height','100%');
		document.body.appendChild(iframe);
	}
	iframe.setAttribute('src',debug_url);
}
function _settings_update(_theme){
	if (theme != _theme) {
		theme = _theme;
		debug_url = root + '/itdc/debug/index/' + theme + '/';
		makeIframe();
	};
}
chrome.devtools.inspectedWindow.eval("location.protocol + '//' + location.host", function(_root){
	root = _root;
	_settings_update('light');
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
	settings.get(function(_settings){
		_settings_update(_settings.themes[_settings.theme]);
		settings.onchange(function(_settings){
			_settings_update(_settings.themes[_settings.theme]);
		});
	});
});

