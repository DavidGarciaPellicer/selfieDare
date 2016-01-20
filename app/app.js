var app = angular.module('RetameApp', [
  'ngRoute'
]);

    app.config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/photoGallery.html',
                controller: 'GalleryController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    app.directive('myImgDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            console.log(elem);
            scope.photoGalleryStyle = {'background': 'url("'+attrs.src+'")',
                                      'background-size': 'cover'}; 
        }
    };
});