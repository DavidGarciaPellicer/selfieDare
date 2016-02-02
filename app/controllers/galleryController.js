(function() {
    
    var GalleryController = function ($scope, $log, $window,$location, GalleryService) {
        
        $scope.destruirSesion = function (){
              if(sessionStorage.getItem("usuarioPhotoChallenge"))
                 sessionStorage.removeItem("usuarioPhotoChallenge");           
            console.log('destruir sesión');
            $location.path("/");
        } 
        
        if(GalleryService.getGallery().length<=0){

            GalleryService.getIndexImages().then(function(gallery){
                $scope.galeria = gallery;
                console.log($scope.galeria);  
            })
        }else{
             $scope.galeria = GalleryService.getGallery();
        }
    };
    
    GalleryController.$inject = ['$scope', '$log', '$window','$location','GalleryService'];

    angular.module('RetameApp')
      .controller('GalleryController', GalleryController);
    
}());