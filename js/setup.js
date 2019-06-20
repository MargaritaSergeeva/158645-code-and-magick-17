'use strict';

var WIZARDS_COUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var FULL_NAMES = [NAMES, SURNAMES];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var wizards = [];

var showElement = function (element) {
  if (element) {
    element.classList.remove('hidden');
  }
};

var getRandomValue = function (arr) {
  if (arr.length > 0) {
    return arr[Math.round(-0.5 + Math.random() * arr.length)];
  }

  return 0;
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

showElement(userDialog);

wizards = generateWizardsArray(FULL_NAMES, COAT_COLORS, EYES_COLORS, WIZARDS_COUNT);
similarListElement.appendChild(addWizardElements(wizards));

showElement(userDialog.querySelector('.setup-similar'));
