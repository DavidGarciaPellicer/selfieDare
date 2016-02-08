(function() {
    
    var ReservaRealizadaController = function ($scope, $uibModalInstance) {

    $scope.msg = 'Reserva realizada';

      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    };
    
    ReservaRealizadaController.$inject = ['$scope', '$uibModalInstance'];

    angular.module('RetameApp')
      .controller('ReservaRealizadaController', ReservaRealizadaController);
    
}());