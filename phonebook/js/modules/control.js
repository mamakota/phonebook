import serviceStorage from './serviceStorage.js';
const {
  removeStorage,
  addContactData,
} = serviceStorage;

import * as createElements from './createElements.js';

// const {
//   createRow,
// } = createElements;


const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const sortData = (data, field) => {
  data.sort((a, b) => a[field] > b[field] ? 1 : -1);
  return data;
};

const modalControl = (btnAdd, formOverlay) => {
  const openMidal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openMidal);

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      const deletedNumber = target.closest('.contact').children[3].children[0].textContent;

      removeStorage(deletedNumber);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createElements.createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

export default {
  hoverRow,
  sortData,
  modalControl,
  deleteControl,
  formControl,
};