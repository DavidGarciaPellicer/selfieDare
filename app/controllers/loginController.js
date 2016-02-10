(function() {
    
    var LoginController = function ($scope, 
                                     $log, 
                                     $window, 
                                     UserService,
                                    $location,
                                    $state) {
        
       $scope.login = function(form){
               UserService.login($scope.form.username, $scope.form.password).then(function(user){
                    UserService.guardarUsuarioSesion(user);
                   //redirección a página principal
                   $state.go('perfil.actividades');
               });
       }
    };
    
    LoginController.$inject = ['$scope', '$log', '$window','UserService','$location', '$state'];

    angular.module('RetameApp')
      .controller('LoginController', LoginController);
    
}());