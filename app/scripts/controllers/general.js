(function() {
'use strict';

/**
 * @ngdoc function
 * @name botConfApp.controller:GeneralCtrl
 * @description
 * # GeneralCtrl
 * Controller of the botConfApp
 */
angular.module('botConfApp')
  .controller('GeneralCtrl', GeneralCtrl);

  GeneralCtrl.$inject = ['$scope'];

  function GeneralCtrl($scope) {
    var vm = this;
  };
})();
