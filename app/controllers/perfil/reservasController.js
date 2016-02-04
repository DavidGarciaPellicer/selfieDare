(function() {
    
    var ReservasController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService) {
        
        
        function getMonitorForActividad(id){
            var mon;
            angular.forEach($scope.monitores, function(monitor){
               if(monitor.id === id) mon = monitor; 
            });
            return mon.attributes;
        }
        
        //Recogemos todas las reservas y las actividades (esta última para sacar algunos datos de esta clase
        ActividadesService.getActividades().then(function(actividades){
            $scope.actividades = actividades;

                ReservasService.getUserReservas(UserService.getUsuarioSesion().objectId).then(function(reservas){
                 console.log('Reservas: '+reservas);
               for(var n=0; n<reservas.length;n++){
                   console.log('Reserva: '+reservas[n].attributes);
                   for(var i=0; i<$scope.actividades.length; i++){
                      if($scope.actividades[i].id === reservas[n].attributes.actividadId){
                          //se crea una propiedad ad hoc para la reserva con todos los datos de la actividad
                          reservas[n].actividad = $scope.actividades[i].attributes;
                      }
                   }
              }
                $scope.Reservas = reservas;    
            });

        });
        

            
    };
    
    ReservasController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService'];

    angular.module('RetameApp')
      .controller('ReservasController', ReservasController);
    
}());