(function() {
    
    var CaloriasController = function ($scope, UserService, ActividadesService, ReservasService, $state) {
        
        var userId = UserService.getUsuarioSesion().id;
        var reservas = ReservasService.reservas;
    
    function caloriasTotales(reservas){
        var calorias = 0;
        for(var i=0; i<reservas.length; i++){
            calorias += parseInt(reservas[i].attributes.actividad.attributes.calorias);
        }
        return calorias;
    }    
        
    };
    
    CaloriasController.$inject = ['$scope', '$log','UserService','ActividadesService','$location','ReservasService','$state'];

    angular.module('RetameApp')
      .controller('ReservasController', CaloriasController);
    
}());