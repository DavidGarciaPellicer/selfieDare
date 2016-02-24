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
              text: 'Necesitas entre 100 y 200 ml de agua por cada 20 minutos de ejercicio para mantenerte hidratado'
            },
            {
              image: '/images/avatars/alimentacion.jpg',
              id:4,
              text: 'El desayuno es la comida más importante del día. Es importante que ingieras muchas vitaminas y la mejor manera de hacerlo es a través de frutas y verduras'
            },
                          {
              image: '/images/avatars/ensaladaFruta.jpg',
              id:5,
              text: 'Junto a las uvas los cítricos son otra importante fuente de antioxidantes necesarios para el deportista, ya que contienen altas dosis de vitamina C.'
            },
                          {
              image: '/images/avatars/ejercicioComida.jpg',
              id:6,
              text: 'Se recomienda consumir las grasas de origen vegetal, como, aceite de oliva, maíz, girasol o nueces'
            },
                          {
              image: '/images/avatars/ejercicio.jpg',
              id:7,
              text: 'Se aconseja realizar deporte a primera o a última hora del día. Así conseguirás aprovechar mucho mejor tu horario diario.'
            },
                          {
              image: '/images/avatars/cicling.jpg',
              id:8,
              text: 'Si no realizas deporte habitualmente, evita hacer actividades físicas en condiciones de elevado calor, sobre todo si la humedad es alta, o hay frío intenso.'
            },
                          {
              image: '/images/avatars/ejercicio2.jpg',
              id:9,
              text: 'Cuando realices estiramientos,asegúrate que mantienes la postura entre 10 y 30 segundos.'
            }
          ];
  
    };
    
    CarouselController.$inject = ['$scope','$timeout'];

    angular.module('RetameApp')
      .controller('CarouselController', CarouselController);
    
}());




