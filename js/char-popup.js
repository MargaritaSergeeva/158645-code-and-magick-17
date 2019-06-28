'use strict';

(function () {
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = window.variables.userDialog.querySelector('.setup-close');
  var dialogHandler = window.variables.userDialog.querySelector('.upload');


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.utils.closeElement(window.variables.userDialog);
      window.utils.resetBlockPosition(window.variables.userDialog);
    }
  };

  userDialogOpen.addEventListener('click', function () {
    window.utils.showElement(window.variables.userDialog);
    document.addEventListener('keydown', onPopupEscPress);
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.utils.showElement(window.variables.userDialog);
      document.addEventListener('keydown', onPopupEscPress);
    }
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.variables.userDialog.style.top = (window.variables.userDialog.offsetTop - shift.y) + 'px';
      window.variables.userDialog.style.left = (window.variables.userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.variables.userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  window.variables.userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  userDialogClose.addEventListener('click', function () {
    window.utils.closeElement(window.variables.userDialog);
    window.utils.resetBlockPosition(window.variables.userDialog);
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      window.utils.closeElement(window.variables.userDialog);
      window.utils.resetBlockPosition(window.variables.userDialog);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  });
})();
