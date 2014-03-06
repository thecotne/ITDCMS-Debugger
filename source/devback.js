// დაკომენტარებულია დომეინის მიხედვით Enable/Disable ფუნქცია
// chrome.devtools.inspectedWindow.eval('location.host', function(domain) {
// 	settings.get(function(_settings) {
// 		if (_settings.domains.indexOf(rootDomain(domain)) !== -1) {
			chrome.devtools.panels.create(
				'ITDCMS dubugger',
				'contentSettings.png',
				'Panel/panel.html',
				null // no callback needed
			);
// 		};
// 	});
// });