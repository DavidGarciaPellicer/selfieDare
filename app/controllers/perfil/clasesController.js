(function() {
    
    var ClasesController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService,$state,$uibModal) {
    
   
        ActividadesService.getWeekActividades().then(function(actividades){
        var actividadesPorDia = [];
        var diaInicio = actividades[0].attributes.date.getDay(),
            contador = 0;
        
        angular.forEach(actividades,function(act){
           if(diaInicio !== act.attributes.date.getDay()){
               contador++;
               diaInicio = act.attributes.date.getDay();
           }
            if(actividadesPorDia.length<=contador){
                actividadesPorDia.push([]);
            }    
              actividadesPorDia[contador].push(act); 
        });
        
        $scope.actividadesPorDia = actividadesPorDia;
            console.log('actividadesPorDia: '+actividadesPorDia);
        });

        
          $scope.tabSelected = 0;
        
       $scope.setTab = function (tabId) {
            $scope.tabSelected = tabId;
        };

        $scope.isSet = function (tabId) {
            return this.tab === tabId;
        };
        
        $scope.isSet(0);
       //mostrar reservas usuario
        
        ActividadesService.getActividades().then(function(actividades){
            $scope.actividades = actividades;
        });
        
        function realizarReserva(idActividad, horario){
            ActividadesService.consultarPlazas(idActividad).then(function (actividad){
                if(actividad.reservaHecha){
                    ReservasService.createReserva(idActividad, horario, UserService.getUsuarioSesion().objectId).then(function(reserva){
                        
                                var modalInstance = $uibModal.open({
                                  animation: true,
                                  templateUrl: '/app/views/perfil/modal/reservaRealizada.html',
                                  controller: 'ReservaRealizadaController'
                                });

                                modalInstance.result.then(function () {
                                }, function () {
                                  $log.info('Modal dismissed at: ' + new Date());
                                });              
                        
                       $state.reload();
                    });
                }else{
                    alert("No quedan plazas disponibles");
                }
            });

        };
        
    $scope.actividad = {titulo:'asasas','horario':'10-02-2016'};
        
      $scope.open = function (idActividad, titulo, horario) {    
        $scope.actividad = {
            'idActividad': idActividad,
            'titulo': titulo,
            'horario': horario
        };
          
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/app/views/perfil/modal/reservaModal.html',
          controller: 'ReservaModalController',
          resolve: {
            actividad: function () {
              return $scope.actividad;
            }
          }
        });

        modalInstance.result.then(function (actividad) {
          realizarReserva(actividad.idActividad, actividad.horario);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
       
    };
    
    ClasesController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService','$state','$uibModal'];

    angular.module('RetameApp')
      .controller('ClasesController', ClasesController);
    
}());