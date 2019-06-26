'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var wizardsCoat = userDialog.querySelector('.wizard-coat');
var wizardsEyes = userDialog.querySelector('.wizard-eyes');
var wizardsFireball = userDialog.querySelector('.setup-fireball-wrap');
var dialogHandler = userDialog.querySelector('.upload');


var showElement = function (element) {
  if (element) {
    element.classList.remove('hidden');
  }
};

var closeElement = function (element) {
  if (element) {
    element.classList.add('hidden');
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeElement(userDialog);
    resetBlockPosition(userDialog);
  }
};

var getRandomValue = function (arr) {
  if (arr.length > 0) {
    return arr[Math.round(-0.5 + Math.random() * arr.length)];
  }

  return 0;
};

var resetBlockPosition = function (element) {
  element.style.top = '';
  element.style.left = '';
};

var changeCoatColor = function (element) {
  var color = getRandomValue(COAT_COLORS);

  element.querySelector('.wizard-coat').style.fill = color;
  element.querySelector('input[name="coat-color"]').value = color;
};

var changeEyesColor = function (element) {
  var color = getRandomValue(EYES_COLORS);

  element.querySelector('.wizard-eyes').style.fill = color;
  element.querySelector('input[name="eyes-color"]').value = color;
};

var changeFireballColor = function (element) {
  var color = getRandomValue(FIREBALL_COLORS);

  element.querySelector('.setup-fireball-wrap').style.backgroundColor = color;
  element.querySelector('input[name="fireball-color"]').value = color;
};

userDialogOpen.addEventListener('click', function () {
  showElement(userDialog);
  document.addEventListener('keydown', onPopupEscPress);
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showElement(userDialog);
    document.addEventListener('keydown', onPopupEscPress);
  }
});

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var isDragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    isDragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (isDragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizardsCoat.addEventListener('click', function () {
  changeCoatColor(userDialog);
});

wizardsEyes.addEventListener('click', function () {
  changeEyesColor(userDialog);
});

wizardsFireball.addEventListener('click', function () {
  changeFireballColor(userDialog);
});

userDialogClose.addEventListener('click', function () {
  closeElement(userDialog);
  resetBlockPosition(userDialog);
  document.removeEventListener('keydown', onPopupEscPress);
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeElement(userDialog);
    resetBlockPosition(userDialog);
    document.removeEventListener('keydown', onPopupEscPress);
  }
});
