(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService, $location) {
        
        if(!sessionStorage.getItem('usuarioPhotoChallenge')) $location.path('login');
        
      $scope.usuario = UserService.getUsuarioSesion();
        
    UserService.getUserImages().then(function(){
        $scope.imagenes = UserService.getImgUsuario();
        
        console.log($scope.imagenes);
      });
        
        
        
    };
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService','$location'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());