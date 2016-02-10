
var app = angular.module('RetameApp', [
  'ngRoute',
  'parse-angular',
  'parse-angular.enhance',
   'ngFileUpload',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    '720kb.fx'
]);

  //'parse-angular',
  //'parse-angular.enhance'

    app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("inicio");
          //
          // Now set up the states
          $stateProvider
            .state('inicio', {
              url: "/inicio",
              templateUrl: "app/views/photoGallery.html",
               controller: 'GalleryController'
            })
            .state('registro', {
              url: "/registro",
              templateUrl: "app/views/register.html",
              controller: 'CreateUserController'
            })
            .state('login', {
              url: "/login",
              templateUrl: "app/views/login.html",
              controller: 'LoginController'
            })
            .state('perfil', {
              url: "/perfil",
              templateUrl: 'app/views/perfil.html',
              controller: 'ProfileController'
            })
            .state('perfil.actividades', {
              url: "/actividades?tabId",
              templateUrl: 'app/views/perfil/actividades.html',
              controller: 'ClasesController'
            })
            .state('perfil.reservas', {
              url: "/reservas",
              templateUrl: 'app/views/perfil/reservas.html',
              controller: 'ReservasController'
            })
            .state('upload', {
              url: "/upload",
              templateUrl: 'app/views/imageUpload.html',
              controller: 'ImageUploadController'
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

