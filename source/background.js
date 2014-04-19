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
chrome.contextMenus.create({
	title:'theme',
	id:'ITDCMS_theme'
});
settings.get(function(_settings) {
	for (var i = 0; i < settings._default.themes.length; i++) {
		chrome.contextMenus.create({
			title: settings._default.themes[i],
			type: 'radio',
			id:'ITDCMS_theme_'+settings._default.themes[i],
			parentId: 'ITDCMS_theme',
			checked: Boolean( i == _settings.theme ),
			onclick: (function(_theme) {
				return function() {
					settings.get(function(_settings) {
						if (_settings.theme != _theme) {
							_settings.theme = _theme;
							settings.set(_settings);
						};
					});
				}
			})(i)
		});
	};
});
/* დაკომენტარებულია დომეინის მიხედვით Enable/Disable ფუნქცია
	chrome.contextMenus.create({
		type: 'separator',
		contexts: ['page']
	});

	chrome.contextMenus.create({
		title: 'enable on this domain',
		contexts: ['page'],
		onclick: function() {
			chrome.tabs.query({
				currentWindow: true,
				active: true
			}, function(tabs) {
				var tab = tabs[0];
				settings.get(function(_settings) {
					var _rootDomain = rootDomain(urlDomain(tab.url));
					if (_settings.domains.indexOf(_rootDomain) === -1) {
						_settings.domains.push(_rootDomain);
						chrome.contextMenus.create({
							title: 'Disable on ' + _rootDomain,
							contexts: ['page'],
							id: 'domain_' + _rootDomain,
							onclick: function() {
								chrome.contextMenus.remove('domain_' + _rootDomain);
								settings.get(function(_settings) {
									_settings.domains.unset(_rootDomain);
									settings.set(_settings);
								});
							}
						});
						settings.set(_settings);
					};
				});
			});
		}
	});
	chrome.contextMenus.create({
		type: 'separator',
		contexts: ['page']
	});
	settings.get(function(_settings) {
		for (var key = 0; key < _settings.domains.length; key++) {
			chrome.contextMenus.create({
				title: 'Disable on ' + _settings.domains[key],
				contexts: ['page'],
				id: 'domain_' + _settings.domains[key],
				onclick: (function(domain) {
					return function() {
						chrome.contextMenus.remove('domain_' + domain);
						settings.get(function(_settings) {
							_settings.domains.unset(domain);
							settings.set(_settings);
						});
					}
				})(_settings.domains[key])
			});
		};
	});
*/
var simpleGetLibrary = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.command == 'open') {
		if (!simpleGetLibrary) {
			var plugin = document.getElementById('simpleGetPluginId');
			simpleGetLibrary = plugin.SimpleGetPlugin();
		}

		var filePath = request.filePath.replace(/\//g, '\\');

		settings.get(function(_settings) {
			if ( endsWith(_settings.editor,'sublime_text.exe') ) {
				simpleGetLibrary.callApplication(_settings.editor, '--command open_file ' + _settings.dirpath + filePath);
			}else{
				simpleGetLibrary.callApplication(_settings.editor, _settings.dirpath + filePath.substring(0, filePath.indexOf(':')));
			}
		});
	}
	
	
});
