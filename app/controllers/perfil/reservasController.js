(function() {
    
    var ReservasController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService, $uibModal, $state) {

        ReservasService.getUserReservas(UserService.getUsuarioSesion().objectId).then(function(reservas){
                $scope.reservas = reservas;   
        });
        
        $scope.cancelar = function (idReserva){
          ReservasService.deleteReserva(idReserva).then(function(idActividad){
             ActividadesService.addPlaza(idActividad).then(function (){
                
                   var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: '/app/views/perfil/modal/reservaRealizada.html',
                            controller: 'ReservaRealizadaController',
                            resolve: {
                            param: function () {
                                   return {'msg':'Se ha cancelado la reserva'};
                               }
                            }    
                    });
                        //Se recarga la página
                       $state.reload(); 
             });
          });  
        };

    };
    
    ReservasController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService', '$uibModal','$state'];

    angular.module('RetameApp')
      .controller('ReservasController', ReservasController);
    
}());