chrome.devtools.panels.create(
	'ITDCMS dubugger',
	'contentSettings.png',
	'Panel/panel.html',
	null // no callback needed
);


function getElement(){
	if ($0.nodeType == document.COMMENT_NODE) {
		$0.textContent
		var parts = $0.textContent.split(' ');
		for( key in parts ){
			if (/\/.+\.php$/i.test(parts[key])) {
				var meta_remove_path = document.querySelector('meta[name="itdcms:root_path"]');
				if (meta_remove_path && meta_remove_path.content) {
					return parts[key].replace(meta_remove_path.content,'');
				}else{
					return parts[key];
				}
			};
		}
	};
}


chrome.devtools.panels.elements.onSelectionChanged.addListener(function(){
	chrome.devtools.inspectedWindow.eval(
		"(" + getElement.toString() + ")()",
		function(result, isException) {
			if (result) {
				chrome.runtime.sendMessage({
					command: "open",
					filePath: result
				}/* [response] */);
			};
		}
	);
});