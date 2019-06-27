'use strict';

(function () {
  var wizardsCoat = window.variables.userDialog.querySelector('.wizard-coat');
  var wizardsEyes = window.variables.userDialog.querySelector('.wizard-eyes');
  var wizardsFireball = window.variables.userDialog.querySelector('.setup-fireball-wrap');


  var changeCoatColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.COAT_COLORS);

    element.querySelector('.wizard-coat').style.fill = color;
    element.querySelector('input[name="coat-color"]').value = color;
  };

  var changeEyesColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.EYES_COLORS);

    element.querySelector('.wizard-eyes').style.fill = color;
    element.querySelector('input[name="eyes-color"]').value = color;
  };

  var changeFireballColor = function (element) {
    var color = window.utils.getRandomValue(window.constants.FIREBALL_COLORS);

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
