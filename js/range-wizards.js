'use strict';

(function () {
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.variables.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.variables.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.range = {
    updateWizards: function (wizardsArr) {
      var newWisardsArray = wizardsArr.slice().sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);

        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }

        return rankDiff;
      });

      window.render.addWizardElements(newWisardsArray);
    }
  };
})();
