(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService, ActividadesService, $location) {
        
        if(!sessionStorage.getItem('usuarioPhotoChallenge')) $location.path('login');
        
      $scope.usuario = UserService.getUsuarioSesion();
    UserService.getUserAvatar($scope.usuario.imagen.objectId).then(function(avatar){
         $scope.avatar = avatar.imagen._url;   
    }); 
        
    UserService.getUserImages().then(function(){
        $scope.imagenes = UserService.getImgUsuario();      
        console.log($scope.imagenes);
      });
        
    ActividadesService.getActividades().then(function(actividades){
       $scope.actividades = actividades;
    });
        
      ActividadesService.getWeekActividades();  
        
    };
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());