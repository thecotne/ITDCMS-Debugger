var meta_remove_path = document.querySelector('meta[name="itdcms:root_path"]');
if (meta_remove_path && meta_remove_path.content) {
	var remove_path = meta_remove_path.content;
}else{
	var remove_path = false;
}
var open_file = document.getElementsByClassName('open_file');
if (open_file.length) {
	for (var key = 0; key < open_file.length; key++) {
		open_file[key].addEventListener('click', function(e) {
			e.preventDefault();
			if (this.dataset.openfile) {
				var filePath = this.dataset.openfile.trim();
				if (remove_path) {
					filePath = filePath.replace(remove_path,'');
				};
				chrome.runtime.sendMessage({
					command: 'open',
					filePath: filePath
				}/* [response] */);
			};
		});
	};
};

// check mark status on page
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.method == 'markExists') {
			sendResponse({data: meta_remove_path, method: 'markExists'});
		}
	}
);
