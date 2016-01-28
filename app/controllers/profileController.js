(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService) {
        
      $scope.usuario = UserService.getUsuarioSesion();
        
    UserService.getUserImages().then(function(){
        $scope.imagenes = UserService.getImgUsuario();
        
        console.log($scope.imagenes);
      });
        
    };
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());