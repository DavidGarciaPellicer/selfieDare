var app = angular.module('RetameApp', [
  'ngRoute',
  'parse-angular',
  'parse-angular.enhance',
   'ngFileUpload'
]);

  //'parse-angular',
  //'parse-angular.enhance'

    app.config( ['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/photoGallery.html',
                controller: 'GalleryController'
            })
            .when('/registro', {
                templateUrl: 'app/views/register.html',
                controller: 'CreateUserController'
            })
             .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginController'
            })

           .when('/perfil', {
                templateUrl: 'app/views/perfil.html',
                controller: 'ProfileController'
            })
            .when('/upload', {
                templateUrl: 'app/views/imageUpload.html',
                controller: 'ImageUploadController'
            })
            .otherwise({
                redirectTo: '/'
            });
        
         Parse.initialize("80UaJ4k9Pz13b3T7Dlst5wKMyUiIVBUcMZBTojnb", "y1bDIOOUYDKOMkjSNxmb34wEr9qTWIIjVNIzIUiv");
    }]);

       

    app.directive('myImgDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var img = JSON.parse(attrs.src);
            console.log(img.title);
            scope.photoGalleryStyle = {'background': 'url("'+img.picture._url+'")',
                                      'background-size': 'cover'}; 
        }
    };
});