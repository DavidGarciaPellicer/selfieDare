(function() {
    
    var ClasesController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService) {

        
    UserService.getMonitores().then(function(monitores){
            $scope.monitores = monitores;
    });
    
    var tiposactividades = [];
    ActividadesService.getTipoActividades().then(function(tipos){
            tiposactividades = tipos;
    });
    
    ActividadesService.getWeekActividades().then(function(actividades){
        actividadesPorDia = [];
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
              //colocamos los datos del monitor en la actividad
              var monitor = getMonitorForActividad(act.attributes.monitor.id);
              act.monitor = monitor; 
            
            for(var n=0;n<tiposactividades.length;n++){
                if(tiposactividades[n].attributes.title === act.attributes.type){
                    act.tipoactividad = tiposactividades[n].attributes;
                    break;
                }
            }
            
              actividadesPorDia[contador].push(act);   
        });
        
        $scope.actividadesPorDia = actividadesPorDia;
            console.log('actividadesPorDia: '+actividadesPorDia);
    });
        
        function getMonitorForActividad(id){
            var mon;
            angular.forEach($scope.monitores, function(monitor){
               if(monitor.id === id) mon = monitor; 
            });
            return mon.attributes;
        }
        
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
        
        $scope.realizarReserva = function(idActividad, horario){
            ReservasService.createReserva(idActividad, horario, UserService.getUsuarioSesion().objectId).then(function(correcto){
                alert(correcto);
            });
        };
                                                                          
        
    };
    
    ClasesController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService'];

    angular.module('RetameApp')
      .controller('ClasesController', ClasesController);
    
}());