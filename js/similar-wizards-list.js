'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var FULL_NAMES = [NAMES, SURNAMES];

  var similarListElement = window.variables.userDialog.querySelector('.setup-similar-list');
  var wizards = [];

  var getRandomName = function (fullNames) {
    if (fullNames.length > 0) {
      var firstArr = window.utils.getRandomValue(fullNames);
      var secondArr = firstArr === fullNames[0] ? fullNames[1] : fullNames[0];
      var firstName = window.utils.getRandomValue(firstArr);
      var secondName = window.utils.getRandomValue(secondArr);

      return firstName + ' ' + secondName;
    }

    return '';
  };

  var generateWizardsArray = function (namesArr, coatColorsArr, eyesColorsArr, count) {
    if (namesArr.length > 0 && coatColorsArr.length > 0 && eyesColorsArr.length > 0 && count) {
      for (var i = 0; i < count; i++) {
        wizards[i] = {
          name: getRandomName(namesArr),
          coatColor: window.utils.getRandomValue(coatColorsArr),
          eyesColor: window.utils.getRandomValue(eyesColorsArr)
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

  wizards = generateWizardsArray(FULL_NAMES, window.constants.COAT_COLORS, window.constants.EYES_COLORS, WIZARDS_COUNT);
  similarListElement.appendChild(addWizardElements(wizards));

  window.utils.showElement(window.variables.userDialog.querySelector('.setup-similar'));
})();
