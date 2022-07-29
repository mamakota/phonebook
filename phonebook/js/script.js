'use strict';

const data = [
  // {
  //   name: 'Иван',
  //   surname: 'Петров',
  //   phone: '+79514545454',
  // },
  // {
  //   name: 'Игорь',
  //   surname: 'Семёнов',
  //   phone: '+79999999999',
  // },
  // {
  //   name: 'Семён',
  //   surname: 'Иванов',
  //   phone: '+79800252525',
  // },
  // {
  //   name: 'Мария',
  //   surname: 'Попова',
  //   phone: '+79876543210',
  // },
];


{
  const addContactData = (contact) => {
    data.push(contact);
    console.log(data);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({
      className,
      type,
      text,
    }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th data-sort="name">Имя</th>
      <th data-sort="surname">Фамилия</th>
      <th>Телефон</th>
      <th></th>
    </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name" type="text" 
      id="name" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname" type="text" 
      id="surname" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" type="number" 
      id="phone" required>
    </div>
    `);

    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    }, {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    }]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    const text = document.createElement('p');

    text.innerHTML = `Все права защищены &copy;${title}`;
    footerContainer.append(text);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    }, {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    }]);

    const table = createTable();
    const {
      form,
      overlay
    } = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
      table,
    };
  };

  const createRow = ({
    name: firstName,
    surname,
    phone,
  }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');

    const btnEdit = createButtonsGroup([{
      className: 'btn btn-dark btn-sm',
      type: 'button',
      text: 'Редактировать',
    }]);

    tdEdit.append(...btnEdit.btns);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    // data = [];
    const dataFromStorage = getStorage('data');
    dataFromStorage.forEach((item) => {
      data.push(item)
    });

    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

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

  // const sortData = (datasort) => {
  //   const table = document.querySelector('.table');
  //   let sortedRows = Array.from(table.rows).slice(1).sort((rowA, rowB) => rowA.cells[datasort].innerHTML > rowB.cells[datasort].innerHTML ? 1 : -1);
  //   table.tBodies[0].append(...sortedRows);
  // };

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
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);

      setStorage('data', newContact);
      console.log(newContact);

      addContactPage(newContact, list);
      addContactData(newContact);
      form.reset();
      closeModal();
    });
  };

  const getStorage = (key) => {
    const storageData = localStorage.getItem(key);

    if (storageData === null) {
      return [];
    } else {
      return JSON.parse(storageData);
    }
  };

  const setStorage = (key, arr) => {
    const storageData = getStorage(key);

    if (JSON.stringify(storageData).includes(arr.phone)) {
      return
    } else {
      storageData.push(arr);
      localStorage.setItem(key, JSON.stringify(storageData));
    }
  };

  const removeStorage = (string) => {
    const dataFromStorage = getStorage('data');

    dataFromStorage.forEach((item, index) => {
      if (item.phone === string) {
        dataFromStorage.splice(index, 1);
      }
      localStorage.setItem('data', JSON.stringify(dataFromStorage));
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

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
      closeModal
    } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    // table.addEventListener('click', e => {
    //   const target = e.target;
    //   if (!(target.dataset.sort === undefined)) {
    //     const sortedData = sortData(data, target.dataset.sort);
    //     table.tbody.innerHTML = '';
    //     renderContacts(table.tbody, sortedData);
    //     localStorage.setItem('sortField', target.dataset.sort)
    //   }
    // });

  };

  window.phoneBookInit = init;
}