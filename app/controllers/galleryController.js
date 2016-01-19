(function() {
    
    var GalleryController = function ($scope, $log, $window, GalleryService) {
       $scope.galeria = GalleryService.getGallery();
        console.log($scope.galeria);
    };
    
    GalleryController.$inject = ['$scope', '$log', '$window','GalleryService'];

    angular.module('RetameApp')
      .controller('GalleryController', GalleryController);
    
}());