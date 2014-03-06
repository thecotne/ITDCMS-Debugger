var open_file = document.getElementsByClassName('open_file');

for (var key = 0; key < open_file.length; key++) {
	open_file[key].addEventListener('click', function(e) {
		e.preventDefault()
		if (this.dataset.openfile) {
			var filePath = this.dataset.openfile.trim();
			chrome.runtime.sendMessage({
				command: "open",
				filePath: filePath
			}/* [response] */);
		};
	});
}