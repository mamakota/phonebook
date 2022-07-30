const getStorage = (key) => {
  const storageData = localStorage.getItem(key);
  if (storageData === null) {
    return [];
  } else {
    return JSON.parse(storageData);
  }
};

const setStorage = (key, arr) => {
  if (JSON.stringify(key).includes(arr.phone)) {
    return;
  } else {
    localStorage.setItem(key, JSON.stringify(arr));
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

const addContactData = (contact) => {
  const data = getStorage('data');
  data.push(contact);
  setStorage('data', data);
};

export default {
  getStorage,
  removeStorage,
  addContactData,
};