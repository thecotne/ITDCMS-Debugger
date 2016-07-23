const settings = {
  _default: {
    dirpath: '\\\\192.168.1.33\\local\\',
  },
  get(callback) {
    chrome.storage.local.get('all', function(result) {
      const all = Object.create(settings._default);

      if (result.all) {
        for (const key in all) {
          all[key] = result.all[key] || all[key];
        }
      }

      callback(all);
    });
  },
  onchange(callback) {
    chrome.storage.onChanged.addListener(() => settings.get(callback));
  },
  set(all) {
    chrome.storage.local.set({all});
  },
  contextMenus: [{
    key: 'dirpath',
    label: 'files directory',
  }],
};

function rootDomain(domain) {
  const [right, left] = domain.split('.').reverse();
  return `${left}.${right}`;
}

function urlDomain(url) {
  var url = url.trim();

  if (url.search(/^https?\:\/\//) > -1) {
    url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, '');
  } else {
    url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, '');
  }

  return url[1];
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) > -1;
}
