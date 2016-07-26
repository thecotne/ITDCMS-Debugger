/* global chrome, storage */
/* eslint no-unused-vars: 0 */

const storageType = 'local';

function getDefault(key) {
  switch (key) {
    case 'localPath': {
      return '\\\\192.168.1.33\\local\\';
    }
    default: {
      return undefined;
    }
  }
}

class storage {
  static get localPath() {
    return new Promise((resolve, reject) => {
      chrome.storage[storageType].get('localPath', ({ localPath }) => {
        resolve(localPath || getDefault('localPath'));
      });
    });
  }
  static set localPath(localPath) {
    chrome.storage[storageType].set({ localPath });
  }
}
