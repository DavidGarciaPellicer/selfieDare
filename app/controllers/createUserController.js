(function() {
    
    var CreateUserController = function ($scope, $log, $window, UserService) {
        
       $scope.createUser = function(form){
               UserService.signup($scope.form).then(function(user){
                   //redirección a página principal
               });
       }
       
    };
    
    CreateUserController.$inject = ['$scope', '$log', '$window','UserService'];

    angular.module('RetameApp')
      .controller('CreateUserController', CreateUserController);
    
}());