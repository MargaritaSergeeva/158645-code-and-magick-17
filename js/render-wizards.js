'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var similarListElement = window.variables.userDialog.querySelector('.setup-similar-list');


  var renderWizard = function (wizard) {
    if (Object.keys(wizard).length > 0) {
      var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardElement;
    }

    return {};
  };

  var removeWizardElements = function () {
    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }
  };

  window.render = {
    addWizardElements: function (wizardsArr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < WIZARDS_COUNT; i++) {
        fragment.appendChild(renderWizard(wizardsArr[i]));
      }

      removeWizardElements();
      similarListElement.appendChild(fragment);
      window.utils.showElement(window.variables.userDialog.querySelector('.setup-similar'));
    }
  };
})();
