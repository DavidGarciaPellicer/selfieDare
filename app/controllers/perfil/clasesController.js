(function() {
    
    var ClasesController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService, $state, $uibModal, $stateParams) {
    
   
        ActividadesService.getWeekActividades().then(function(actividades){
            
            //Se van a listar todas las actividades 
            //Pero en las que el usuario ya ha reservado crearemos una propiedad indicándolo
            //Esta propiedad nos servirá luego para mostrar una actividad con un estilo u otro según se haya reservado.Miramos primero las reservas del usuario
         
        var reservas;
        var userId = UserService.getUsuarioSesion().objectId; 
        ReservasService.getUserReservas(userId).then(function (res){
            reservas = res;
              
            //luego separamos las actividades por  dias
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
                
            //comprobamos si alguna actividad está reservada. Si es así la propiedad reservada se pone a true    
                var reservada = false;
                for(var i=0; i< reservas.length; i++){
                    if(act.id === reservas[i].attributes.actividad.id)
                        reservada = true;
                }
                
                act.reservada = reservada;

                //Añadimos la actividad al array semanal

                      actividadesPorDia[contador].push(act);         
            });
            

            $scope.actividadesPorDia = actividadesPorDia;
                console.log('actividadesPorDia: '+actividadesPorDia);
            });
            
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