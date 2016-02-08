(function() {
    
    var ReservasController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService) {

        ReservasService.getUserReservas(UserService.getUsuarioSesion().objectId).then(function(reservas){
                $scope.reservas = reservas;   
        });

    };
    
    ReservasController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService'];

    angular.module('RetameApp')
      .controller('ReservasController', ReservasController);
    
}());