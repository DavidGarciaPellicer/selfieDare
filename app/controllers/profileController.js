(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService) {
        
        if(!sessionStorage.getItem('usuarioPhotoChallenge')) $location.path('login');
        
      $scope.usuario = UserService.getUsuarioSesion();
    UserService.getUserAvatar($scope.usuario.imagen.objectId).then(function(avatar){
         $scope.avatar = avatar.imagen._url;   
    }); 
        
    UserService.getUserImages().then(function(){
        $scope.imagenes = UserService.getImgUsuario();      
        console.log($scope.imagenes);
      });
        
    UserService.getMonitores().then(function(monitores){
            $scope.monitores = monitores;
    });
        
    ActividadesService.getWeekActividades().then(function(actividades){
        actividadesPorDia = [];
        console.log(actividadesPorDia.length);
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
              actividadesPorDia[contador].push(act);   
        });
        
        
        
        $scope.actividadesPorDia = actividadesPorDia;
            console.log(actividadesPorDia);
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
        
        var usuario = JSON.parse(sessionStorage.getItem('usuarioPhotoChallenge'));
        ReservasService.getUserReservas(usuario.objectId).then(function(reserva){
        console.log("reservas"+reserva);    
        });
                                              
                                            
        
    };
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());