(function() {
    
    var ProfileController = function ($scope, $log, $window, UserService, ActividadesService, $location, ReservasService, $state, $uibModal) {
        
    if(!sessionStorage.getItem('usuarioPhotoChallenge')){
        
                   var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: '/app/views/perfil/modal/reservaRealizada.html',
                            controller: 'ReservaRealizadaController',
                            resolve: {
                            param: function () {
                                   return {'msg':'Por favor, inicie sesión en el login para acceder a su perfil'};
                               }
                            }    
                    });
        
        
        $state.go('login');
    }else{    
        $scope.usuario = UserService.getUsuarioSesion();
        UserService.getUserAvatar($scope.usuario.imagen.objectId).then(function(avatar){
             $scope.avatar = avatar.imagen._url;   
        }); 

        UserService.getUserImages().then(function(){
            $scope.imagenes = UserService.getImgUsuario();      
          });         

        };
    }
    
    ProfileController.$inject = ['$scope', '$log', '$window','UserService','ActividadesService','$location','ReservasService', '$state', '$uibModal'];

    angular.module('RetameApp')
      .controller('ProfileController', ProfileController);
    
}());