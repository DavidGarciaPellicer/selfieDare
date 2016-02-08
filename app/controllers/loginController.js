(function() {
    
    var LoginController = function ($scope, 
                                     $log, 
                                     $window, 
                                     UserService,
                                    $location) {
        
        console.log($location);
       $scope.login = function(form){
               UserService.login($scope.form.username, $scope.form.password).then(function(user){
                    UserService.guardarUsuarioSesion(user);
                   //redirección a página principal
                   $location.path('/perfil');
               });
       }
    };
    
    LoginController.$inject = ['$scope', '$log', '$window','UserService','$location'];

    angular.module('RetameApp')
      .controller('LoginController', LoginController);
    
}());