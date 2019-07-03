'use strict';

(function () {
  var wizardsForm = window.variables.userDialog.querySelector('.setup-wizard-form');


  var closeUserDialog = function (success) {
    if (success) {
      window.utils.closeElement(window.variables.userDialog);
      window.wizards.removeWizardElements();
    }
  };

  wizardsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.constants.Url.POST, new FormData(wizardsForm), closeUserDialog, window.utils.onError);
  });
})();
