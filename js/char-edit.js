'use strict';

(function () {
  var wizardsCoat = window.variables.userDialog.querySelector('.wizard-coat');
  var wizardsEyes = window.variables.userDialog.querySelector('.wizard-eyes');
  var wizardsFireball = window.variables.userDialog.querySelector('.setup-fireball-wrap');

  var changeCoatColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.Color.COAT);

    element.querySelector('.wizard-coat').style.fill = color;
    element.querySelector('input[name="coat-color"]').value = color;
    window.wizard.onCoatChange(color);
  };

  var changeEyesColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.Color.EYES);

    element.querySelector('.wizard-eyes').style.fill = color;
    element.querySelector('input[name="eyes-color"]').value = color;
    window.wizard.onEyesChange(color);
  };

  var changeFireballColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.Color.FIREBALL);

    element.querySelector('.setup-fireball-wrap').style.backgroundColor = color;
    element.querySelector('input[name="fireball-color"]').value = color;
  };


  wizardsCoat.addEventListener('click', function () {
    changeCoatColor(window.variables.userDialog);
  });

  wizardsEyes.addEventListener('click', function () {
    changeEyesColor(window.variables.userDialog);
  });

  wizardsFireball.addEventListener('click', function () {
    changeFireballColor(window.variables.userDialog);
  });
})();
