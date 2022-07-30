import control from './modules/control.js';
const {
  hoverRow,
  sortData,
  modalControl,
  deleteControl,
  formControl,
} = control;

import {
  renderPhoneBook,
  renderContacts,
} from './modules/render.js';

import serviceStorage from './modules/serviceStorage.js';
const {
  getStorage,
} = serviceStorage;


{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage('data');
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      table,
    } = renderPhoneBook(app, title);

    // Функционал

    const allRow = renderContacts(list, data);
    const {
      closeModal,
    } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    table.addEventListener('click', e => {
      const target = e.target;
      if (!(target.dataset.sort === undefined)) {
        const sortedData = sortData((getStorage('data')), target.dataset.sort);
        console.log(sortedData);
        table.tbody.innerHTML = '';
        renderContacts(table.tbody, sortedData);
        localStorage.setItem('data', JSON.stringify(sortedData));
      }
    });
  };

  window.phoneBookInit = init;
}