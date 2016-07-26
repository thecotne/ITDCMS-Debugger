/* global chrome, storage */

const optionElems = document.querySelectorAll('[data-options]');

for (const elem of optionElems) {
  switch (elem.type) {
    case 'checkbox': {
      elem.addEventListener('change', e => {
        storage[e.target.name] = e.target.checked;
      });

      storage[elem.name].then(checked => {
        elem.checked = checked;
      });
      break;
    }
    default: {
      elem.addEventListener('change', e => {
        storage[e.target.name] = e.target.value;
      });

      storage[elem.name].then(value => {
        elem.value = value;
      });
    }
  }
}
