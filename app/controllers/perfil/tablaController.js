(function() {
    
    var TablaController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService, $state, $uibModal, $stateParams) {   

        var userId = UserService.getUsuarioSesion().objectId; 
        
        ReservasService.getAllUserReservas(userId).then(function (res){
            $scope.reservas = res;
        });
        
        $scope.sortType = 'title';
        
        $scope.buscar = function(searchReserva){
            ReservasService.getFilteredReservas(searchReserva, userId).then(function (res){
                $scope.reservas = res;
            });
        }
};

    
    TablaController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService','$state'];

    angular.module('RetameApp')
      .controller('TablaController', TablaController);
    
}());