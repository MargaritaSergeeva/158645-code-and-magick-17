'use strict';

(function () {
  var wizards = [];


  var onSuccessLoading = function (data) {
    wizards = data;
    window.range.updateWizards(wizards);
  };

  window.wizard = {
    onEyesChange: window.debounce(function (color) {
      window.variables.eyesColor = color;
      window.range.updateWizards(wizards);
    }),

    onCoatChange: window.debounce(function (color) {
      window.variables.coatColor = color;
      window.range.updateWizards(wizards);
    })
  };


  window.backend.load(window.constants.Url.GET, onSuccessLoading, window.utils.onError);
})();
