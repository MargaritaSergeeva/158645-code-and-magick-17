'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var FULL_NAMES = [NAMES, SURNAMES];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var userNameInput = userDialog.querySelector('.setup-user-name');
var wizardsCoat = userDialog.querySelector('.wizard-coat');
var wizardsEyes = userDialog.querySelector('.wizard-eyes');
var wizardsFireball = userDialog.querySelector('.setup-fireball-wrap');
var wizards = [];


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
  }
};

var getRandomValue = function (arr) {
  if (arr.length > 0) {
    return arr[Math.round(-0.5 + Math.random() * arr.length)];
  }

  return 0;
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

var getRandomName = function (fullNames) {
  if (fullNames.length > 0) {
    var firstArr = getRandomValue(fullNames);
    var secondArr = firstArr === fullNames[0] ? fullNames[1] : fullNames[0];
    var firstName = getRandomValue(firstArr);
    var secondName = getRandomValue(secondArr);

    return firstName + ' ' + secondName;
  }

  return '';
};

var generateWizardsArray = function (namesArr, coatColorsArr, eyesColorsArr, count) {
  if (namesArr.length > 0 && coatColorsArr.length > 0 && eyesColorsArr.length > 0 && count) {
    for (var i = 0; i < count; i++) {
      wizards[i] = {
        name: getRandomName(namesArr),
        coatColor: getRandomValue(coatColorsArr),
        eyesColor: getRandomValue(eyesColorsArr)
      };
    }
  }

  return wizards;
};

var renderWizard = function (wizard) {
  if (Object.keys(wizard).length > 0) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  return {};
};

var addWizardElements = function (wizardsArr) {
  if (wizardsArr.length > 0) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(renderWizard(wizardsArr[i]));
    }

    return fragment;
  }

  return {};
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

wizards = generateWizardsArray(FULL_NAMES, COAT_COLORS, EYES_COLORS, WIZARDS_COUNT);
similarListElement.appendChild(addWizardElements(wizards));

showElement(userDialog.querySelector('.setup-similar'));

userDialogClose.addEventListener('click', function () {
  closeElement(userDialog);
  document.removeEventListener('keydown', onPopupEscPress);
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeElement(userDialog);
    document.removeEventListener('keydown', onPopupEscPress);
  }
});
