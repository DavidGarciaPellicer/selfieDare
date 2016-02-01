(function() {
    
    var GalleryController = function ($scope, $log, $window, GalleryService) {
        
        if(GalleryService.getGallery().length<=0){

            GalleryService.getIndexImages().then(function(gallery){
                $scope.galeria = gallery;
                console.log($scope.galeria);  
            })
        }else{
             $scope.galeria = GalleryService.getGallery();
        }
    };
    
    GalleryController.$inject = ['$scope', '$log', '$window','GalleryService'];

    angular.module('RetameApp')
      .controller('GalleryController', GalleryController);
    
}());