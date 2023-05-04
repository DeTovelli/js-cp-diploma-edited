"use strict"

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.open(options.method || "POST", options.url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(options.params);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          for (let key in response) {
            if (response[key].err) {
              alert(`Ошибка обращения к базе данных ${response[key].err}: ${response[key].errMessage}`);
              return;
            }
          }
          options.callback(response);
        } catch (err) {
          alert(`Ошибка разбора ответа сервера: ${err.message}`);
        }
      } else {
        alert(`Ошибка запроса к серверу: ${xhr.status} ${xhr.statusText}`);
      }
    }
  };
};