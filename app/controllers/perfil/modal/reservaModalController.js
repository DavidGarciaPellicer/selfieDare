(function() {
    
    var ReservaModalController = function ($scope, actividad, $uibModalInstance) {

    $scope.actividad = actividad;

      $scope.ok = function () {
        $uibModalInstance.close($scope.actividad);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    };
    
    ReservaModalController.$inject = ['$scope', 'actividad', '$uibModalInstance'];

    angular.module('RetameApp')
      .controller('ReservaModalController', ReservaModalController);
    
}());