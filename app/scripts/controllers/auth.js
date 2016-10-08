(function() {
  'use strict';

  angular.module('botConfApp')
         .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['$scope', 'NgMap'];

  /**
   * @ngdoc function
   * @name botConfApp.controller:AuthCtrl
   * @description
   * # AuthCtrl
   * Controller of the botConfApp
   */
  function AuthCtrl($scope, NgMap) {
    var vm = this;

    vm.updateActiveLocationCoords = updateActiveLocationCoords;
    vm.updateActiveLocationName = updateActiveLocationName;
    vm.setActiveLocation = setActiveLocation;
    vm.addLocation = addLocation;
    vm.removeLocation = removeLocation;

    init();

    function init() {
      NgMap.getMap().then(function(map) {
        vm.map = map;
      });
      vm.setActiveLocation(0);
    }

    function updateMap(coords) {
      vm.mapLocation = coords;
    };

    function updateLocation(location) {
      $scope.config.location = location;
    };

    function updateActiveLocationCoords(e) {
      var coords;

      if (typeof e === 'number') {
        if (e === vm.activeLocation) {
          coords = $scope.config.favorite_locations[e].coords;
        }
      } else {
        coords = e.latLng.lat() + ',' + e.latLng.lng();
      }
      $scope.config.favorite_locations[vm.activeLocation].coords = coords;
      updateMap(coords);
    };

    function updateActiveLocationName(i) {
      if (i === vm.activeLocation) {
        updateLocation($scope.config.favorite_locations[i].name);
      }
    };

    function setActiveLocation(i) {
      var location = $scope.config.favorite_locations[i];

      vm.activeLocation = i;
      updateMap(location.coords);
      updateLocation(location.name);
    }

    function addLocation() {
      $scope.config.favorite_locations.push({
        "name": "New location",
        "coords": "52.39037297896968,4.828920364379883"
      });
      vm.setActiveLocation($scope.config.favorite_locations.length - 1);
    }

    function removeLocation(i) {
      if ($scope.config.favorite_locations.length > 1) {
        $scope.config.favorite_locations.splice(i, 1);
        vm.setActiveLocation($scope.config.favorite_locations.length - 1);
      }
    }
  }
})();
