'use strict';

(function () {
  window.utils = {
    showElement: function (element) {
      if (element) {
        element.classList.remove('hidden');
      }
    },

    closeElement: function (element) {
      if (element) {
        element.classList.add('hidden');
      }
    },

    getRandomValue: function (arr) {
      if (arr.length > 0) {
        return arr[Math.round(-0.5 + Math.random() * arr.length)];
      }

      return 0;
    },

    resetBlockPosition: function (element) {
      element.style.top = '';
      element.style.left = '';
    },

    getMaxElement: function (arr) {
      var maxElement = arr[0];

      arr.forEach(function (it) {
        if (it > maxElement) {
          maxElement = it;
        }
      });

      return maxElement;
    },

    onError: function (errorMessage) {
      var node = document.createElement('div');

      node.classList.add('error-massage');
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
