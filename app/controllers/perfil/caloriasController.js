(function() {
    
    var CaloriasController = function ($scope, $log, UserService, ActividadesService, ReservasService, $state) {
        var total = 0;
        var userId = UserService.getUsuarioSesion();
        var reservas = ReservasService.getUserReservas(userId.objectId).then(function (reservas){
           
             for(var i=0; i<reservas.length; i++){
                 total += parseInt(reservas[i].attributes.actividad.attributes.calorias);
             }
            
             $scope.chartObject = {};
            var quedan = parseInt(userId.objetivo) - total;
    
    $scope.chartObject.type = "PieChart";
    
    $scope.onions = [
        {v: "Consumidas"},
        {v: total},
    ];

    $scope.chartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: $scope.onions},
        {c: [
            {v: "Objetivo"},
            {v: quedan}
        ]}
    ]};

    $scope.chartObject.options = {
        'title': 'Esta semana llevas consumidas '+total+' kcal. Te quedan '+quedan+' kcal para tu objetivo. Ánimo!!!'
    };
        
        
            
});
        
        
        
        
        
        
    };
    
    CaloriasController.$inject = ['$scope', '$log', 'UserService','ActividadesService','ReservasService', '$state'];

    angular.module('RetameApp')
      .controller('CaloriasController', CaloriasController);
    
}());