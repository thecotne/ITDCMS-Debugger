// პარამეტრების მართვის სისტემა
var settings = {
	_default: {
		editor: 'C:\\Program Files\\Sublime Text 3\\sublime_text.exe',
		dirpath: '\\\\192.168.1.33\\local\\',
		domains: ['itdc.ge']
	},
	get: function(callback) {
		chrome.storage.local.get('all', function(result) {
			var _settings = Object.create(settings._default);
			if (result.all) {
				for (var key in _settings) {
					_settings[key] = result.all[key] || _settings[key];
				}
			};
			callback(_settings);
		});
	},
	set: function(_settings) {
		chrome.storage.local.set({
			'all': _settings
		});
	},
	contextMenus: [{
		key: 'editor',
		label: 'text editor'
	}, {
		key: 'dirpath',
		label: 'files directory'
	}]
};

// კომპაკტურათ ჩასახლებული დამხმარე ფუნქციები (Helpers)
function rootDomain(domain) {
	var temp = domain.split('.').reverse();
	return temp[1] + '.' + temp[0];
}

function urlDomain(url) {
	var url = url.trim();
	if (url.search(/^https?\:\/\//) != -1)
		url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
	else
		url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");
	return url[1];
}

Array.prototype.unset = function(value) {
	if (this.indexOf(value) != -1) {
		this.splice(this.indexOf(value), 1);
	}
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
