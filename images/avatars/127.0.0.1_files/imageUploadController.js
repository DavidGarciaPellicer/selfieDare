(function() {
    
    var ImageUploadController = 
        function ($scope, $log, $window, Upload, $timeout, UserService, $location) {
         //el usuario antes a de loguearse para acceder a esta página
            if(!UserService.getUsuarioSesion())
                 $location.path('/login');
                       
            $scope.uploadPic = function(file) {
                
                UserService.saveImage(file, $scope.form).then(function(){
                    alert('Imagen guardada');
                });
                
            }
            
        };
    
    ImageUploadController.$inject = ['$scope', '$log', '$window','Upload','$timeout','UserService','$location'];

    angular.module('RetameApp')
      .controller('ImageUploadController', ImageUploadController);
    
}());