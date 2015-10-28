for (var key = 0; key < settings.contextMenus.length; key++) {
	chrome.contextMenus.create({
		title: 'Change ' + settings.contextMenus[key].label,
		contexts: ['page'],
		onclick: (function(_set) {
			return function() {
				settings.get(function(_settings) {
					var _def = _settings[_set.key];
					var _val = prompt('Change ' + _set.label, _def) || _def;
					if (_val != _def) {
						_settings[_set.key] = _val;
						settings.set(_settings);
					};
				});
			}
		})(settings.contextMenus[key])
	});
}

chrome.contextMenus.create({
	title: 'reset settings',
	contexts: ['page'],
	onclick: function() {
		if (confirm('Are you sure you want to reset settings?')) {
			settings.set(settings._default);
		};
	}
});

var subl = document.getElementById('subl');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.command == 'open') {
		var filePath = request.filePath;
		settings.get(function(_settings) {
			subl.src = ('subl://' + _settings.dirpath + filePath).replace(/\\/g,'/');
		});
	}

});

// check mark status on page and show/hide button
function showButton(tabID, info, tab){
	// check mark status
	chrome.tabs.sendRequest(tab.id, {method: 'markExists'}, function(response) {
		if (response && response.method == 'markExists') {
			icoshow = response.data;
			if (icoshow) {
				chrome.pageAction.show(tabID);
			} else {
				chrome.pageAction.hide(tabID);
			}
		}
	});
}

// set listener
chrome.tabs.onUpdated.addListener(showButton);

// button click event
chrome.pageAction.onClicked.addListener(function(tab){
	var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
	if (domain) {
		chrome.tabs.create({'url': domain+'/itdc/debug'}, function(tab) {
			// Tab opened
		});
	}
});
