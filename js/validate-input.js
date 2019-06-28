'use strict';

(function () {
  window.variables.userNameInput.addEventListener('invalid', function () {
    if (window.variables.userNameInput.validity.tooShort) {
      window.variables.userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (window.variables.userNameInput.validity.tooLong) {
      window.variables.userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (window.variables.userNameInput.validity.valueMissing) {
      window.variables.userNameInput.setCustomValidity('Обязательное поле');
    } else {
      window.variables.userNameInput.setCustomValidity('');
    }
  });
})();
