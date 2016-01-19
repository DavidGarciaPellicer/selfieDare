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
