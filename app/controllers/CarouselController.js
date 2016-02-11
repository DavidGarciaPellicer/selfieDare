(function() {
    
    var CarouselController = function ($scope, $timeout) {   
        
          $scope.slides = [
            {
              image: '/images/avatars/water.jpg',
              id:1,
              text: 'El agua mejora la circulación sanguínea. Si te tomas un vasito antes de bañarte y antes de dormir, evitarás el dolor de los calambres en las pantorrillas o muslos'
            },
            {
              image: '/images/avatars/agua2.jpg',
              id:2,
              text: '¿Te entra el sueño después de la comida? Toma un vaso de agua 1/2 hora antes de comer y verás como te ayuda a mantenerte despierto'
            },
            {
              image: '/images/avatars/chicaBebiendo.jpg',
              id:3,
              text: 'Necesitas entre 100 y 200 ml de agua simple por cada 20 minutos de ejercicio para mantenerte hidratada'
            },
            {
              image: '/images/avatars/alimentacion.jpg',
              id:4,
              text: 'kjkjkjkjkjkj'
            },
                          {
              image: '/images/avatars/ensaladaFruta.jpg',
              id:5,
              text: 'kjkjkjkjkjkj'
            },
                          {
              image: '/images/avatars/ejercicioComida.jpg',
              id:6,
              text: 'kjkjkjkjkjkj'
            },
                          {
              image: '/images/avatars/ejercicio.jpg',
              id:7,
              text: 'kjkjkjkjkjkj'
            },
                          {
              image: '/images/avatars/cicling.jpg',
              id:8,
              text: 'kjkjkjkjkjkj'
            },
                          {
              image: '/images/avatars/ejercicio2.jpg',
              id:9,
              text: 'kjkjkjkjkjkj'
            }
          ];
  
    };
    
    CarouselController.$inject = ['$scope','$timeout'];

    angular.module('RetameApp')
      .controller('CarouselController', CarouselController);
    
}());

/*
AGUA/HIDRATACION

¿Te entra el sueño después de la comida?
Toma un vaso de agua 1/2 hora antes de comer y verás como te ayuda a mantenerte despierto.


El agua mejora la circulación sanguínea. Si te tomas un vasito antes de bañarte y antes de dormir, evitarás el dolor de los calambres en las pantorrillas o muslos.

EJERCICIO

La actividad por la mañana también favorece que puedas establecer una rutina.
A primera hora no tienes tiempo para inventarte ninguna excusa ...

Los ejercicios que requieren movilidad, como correr o montar bicicleta, incrementan algunas hormonas o algunos neurotransmisores como las endorfinas que hacen que uno se sienta mejor, que esté con más vitalidad y más animado*/


