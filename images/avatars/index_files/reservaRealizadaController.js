(function() {
    
    var ReservaRealizadaController = function ($scope, $uibModalInstance, param) {

    $scope.msg = param.msg;

      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    };
    
    ReservaRealizadaController.$inject = ['$scope', '$uibModalInstance', 'param'];

    angular.module('RetameApp')
      .controller('ReservaRealizadaController', ReservaRealizadaController);
    
}());