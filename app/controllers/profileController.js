(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService) {
        
      $scope.usuario = UserService.getUsuarioSesion();
        
        
        
        
        
    };
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());