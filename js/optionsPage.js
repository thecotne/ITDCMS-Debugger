/* global chrome */
/* eslint no-underscore-dangle: 0 */


const optionElems = document.querySelectorAll('[data-options]')

for (const elem of optionElems) {
  switch (elem.type) {
    case 'text':
      elem.addEventListener('change', e => {
        storage[e.target.name] = e.target.value;
      });

      storage[elem.name].then(value => elem.value = value);
      break;
    case 'checkbox':
      elem.addEventListener('change', e => {
        storage[e.target.name] = e.target.checked;
      });

      storage[elem.name].then(checked => elem.checked = checked);
      break;
  }
}
