(function() {
    
    var ClasesController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService, $state, $uibModal, $stateParams) {
    
   
        ActividadesService.getWeekActividades().then(function(actividades){
            
            //Solo se van a listar las actividades en las que el usuario no ha reservado
            //Para las que
            ReservasService.getUserReservas().then(function (){
                
            });
            
            
            
            
            
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
        
       $scope.setTab = function (tabId) {
            $scope.tabSelected = tabId;
                $scope.x = tabId;
        };
        
        $scope.isSet = function (tabId) {
            return this.tab === tabId;
        };
        
        $scope.tabInitial = $stateParams.tabId || 0;
            
       //mostrar reservas usuario
        
        ActividadesService.getActividades().then(function(actividades){
            $scope.actividades = actividades;
        });
        
        //a la hora de realizar la reserva :
        /* 1 - se miran si hay plazas disponibles
           2 - si hay libres se permite reservar
        */
        
        function realizarReserva(idActividad, horario){
            ActividadesService.consultarPlazas(idActividad).then(function (actividad){
                if(actividad.reservaHecha){      
                    
                    ReservasService.createReserva(idActividad, horario, UserService.getUsuarioSesion().objectId).then(function(reserva){
                        //se le muestra al usuario un modal para confirmar la reserva
                                var modalInstance = $uibModal.open({
                                  animation: true,
                                  templateUrl: '/app/views/perfil/modal/reservaRealizada.html',
                                  controller: 'ReservaRealizadaController',
                                  resolve: {
                                       param: function () {
                                           return {'msg':'Reserva realizada' };
                                       }
                                   }    
                                });

                                modalInstance.result.then(function () {
                                }, function () {
                                  $log.info('Modal dismissed at: ' + new Date());
                                }); 
                        //Una vez se confirma la reserva, recargamos nuestra vista(state)
                        //y pasamos como parámetro la pestaña actual para que el recargar la página
                        //sigamos en ella
                       $state.go('perfil.actividades', {tabId: $scope.tabSelected}, {notify: true, reload: true, inherit: false});
                    });
                }else{
                     //Si no existen plazas disponibles se muestra un modal avisando al usuario
                    var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: '/app/views/perfil/modal/reservaRealizada.html',
                            controller: 'ReservaRealizadaController',
                            resolve: {
                            param: function () {
                                   return {'msg':'No quedan plazas disponibles'};
                               }
                            }    
                    });
                }
            });

        };
        
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
    
    ClasesController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService','$state','$uibModal','$stateParams'];

    angular.module('RetameApp')
      .controller('ClasesController', ClasesController);
    
}());