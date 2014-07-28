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
