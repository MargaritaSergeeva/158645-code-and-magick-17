'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var FULL_NAMES = [NAMES, SURNAMES];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var fragment = document.createDocumentFragment();

var wizards = [];

var getRandomValue = function (arr) {
  return arr[Math.round(-0.5 + Math.random() * arr.length)];
};

var getRandomName = function (fullNames) {
  var firstArr = getRandomValue(fullNames);
  var secondArr = firstArr === fullNames[0] ? fullNames[1] : fullNames[0];
  var firstName = getRandomValue(firstArr);
  var secondName = getRandomValue(secondArr);

  return firstName + ' ' + secondName;
};

var generateWizardsArray = function (namesArr, coatColorsArr, eyesColorsArr) {
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: getRandomName(namesArr),
      coatColor: getRandomValue(coatColorsArr),
      eyesColor: getRandomValue(eyesColorsArr)
    };
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addWizardElements = function (wizardsArr) {
  for (var i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }

  return fragment;
};

wizards = generateWizardsArray(FULL_NAMES, COAT_COLORS, EYES_COLORS);
similarListElement.appendChild(addWizardElements(wizards));

userDialog.querySelector('.setup-similar').classList.remove('hidden');
