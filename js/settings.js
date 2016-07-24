/* global chrome */
/* eslint no-underscore-dangle: 0 */

const settings = {
  _default: {
    dirpath: '\\\\192.168.1.33\\local\\',
  },
  get(callback) {
    chrome.storage.local.get('all', data => {
      const all = Object.create(settings._default);

      if (data.all) {
        for (const key in all) {
          all[key] = data.all[key] || all[key];
        }
      }

      callback(all);
    });
  },
  onchange(callback) {
    chrome.storage.onChanged.addListener(() => settings.get(callback));
  },
  set(all) {
    chrome.storage.local.set({ all });
  },
  contextMenus: [{
    key: 'dirpath',
    label: 'files directory',
  }],
};
