(function() {
    
    var CreateUserController = function ($scope, $log, $window, UserService,$location) {
        
    if(UserService.getAvatars().length<=0){    
        UserService.getParseAvatars().then(function(avatares){
            $scope.items = avatares;
            console.log(avatares);
        });
    }else{
        $scope.items = UserService.getAvatars();
    }
        
       $scope.selectedItem = null;

       $scope.selectItem = function(item){
        $scope.selectedItem = item;
           console.log(item);
       };

       $scope.isSelected = function(item){
        if($scope.selectedItem===null){
            return false;
        }
        return item.attributes.imagen._url === $scope.selectedItem.attributes.imagen._url;
       };
        
       $scope.createUser = function(form){                                               
           console.log($scope.selectedItem);
               UserService.signup($scope.form, $scope.selectedItem).then(function(user){
                   //redirección a página principal
                   UserService.guardarUsuarioSesion(user);
                   $location.path('/perfil');
               });
       }
       
    };
    
    CreateUserController.$inject = ['$scope', '$log', '$window','UserService','$location'];

    angular.module('RetameApp')
      .controller('CreateUserController', CreateUserController);
    
}());