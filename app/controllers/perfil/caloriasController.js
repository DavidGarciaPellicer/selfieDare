(function() {
    
    var CaloriasController = function ($scope, $log, UserService, ActividadesService, ReservasService, $state) {
        var userId = UserService.getUsuarioSesion();
        
function calcularCalorias(reservas){
      var total = 0;
    for(var i=0; i<reservas.length; i++){
         total += parseInt(reservas[i].attributes.actividad.attributes.calorias);
    }
    return total;
}        
            

            
            //para calcular las calorias de la semana
            
           ReservasService.getUserWeekReservas(userId).then(function (reservasSemanales){

               var totalSemana = calcularCalorias(reservasSemanales);
               var quedan = parseInt(userId.objetivo) - totalSemana;

            //semanales            
                $scope.chartSemanalObject = {};       
                $scope.chartSemanalObject.type = "PieChart";
                $scope.caloriasTotales = [
                    {v: "Consumidas"},
                    {v: totalSemana},
                    {v: 'orange'}
                ];

                $scope.chartSemanalObject.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Slices", type: "number"},
                    {role: "style", type: "string"}
                ], "rows": [
                    {c: $scope.caloriasTotales},
                    {c: [
                        {v: "Objetivo"},
                        {v: quedan},
                        {v: 'red'}
                    ]}
                ]};

                $scope.chartSemanalObject.options = {
                    'title': 'Esta semana llevas consumidas '+totalSemana+' kcal. Te quedan '+quedan+' kcal para tu objetivo. Ánimo!!!',
                     'titleTextStyle': { 'color': '#EE3D70',
                                          'fontName': 'Gloria Hallelujah',
                                          'fontSize': '15',
                                          'bold': true,
                                          'italic': false },
                    'is3D': true,
                    'slices': {0: {color: '#95bf7b'}, 1: {color: '#f5751f'}}
                };
               
               //el servicio nos devuelve un objeto JSON donde contiene 4 propiedades cada una de las cuales contiene las reservas de una semana (en total, las 4 semanas anteriores a la fecha actual)
               ReservasService.get4SemanasAnterioresReservas(userId).then(function (reservasPorSemana){
                    var total4Semanas = [],
                    total = 0;
                   //en cada semana sumamos las calorías totales y las añadimos al array total4Semanas
                   angular.forEach(reservasPorSemana,function(semana){
                      for(var i=0; i<semana.length; i++){
                            total += semana[i].attributes.actividad.attributes.calorias;
                        }
                        total4Semanas.push(total);
                        total=0;
                   });
                                          
                //Gráfico de barras para pintar las 4 semanas anteriores          
                    $scope.chartObject = {};      
                   $scope.chartObject.type = "ColumnChart";


                    $scope.chartObject.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "KCal", type: "number"},
                        {role: "style", type: "string"}
                    ], "rows": [
                        
                    {c:[
                        {v: "Hace 4 semanas"},
                        {v: total4Semanas[0]},
                        {v: 'green'}
                    ]},
                        {c: [
                            {v: "Hace 3 semanas"},
                            {v: total4Semanas[1]},
                             {v: 'orange'}
                        ]},
                        {c: [
                            {v: "Hace 2 semanas"},
                            {v: total4Semanas[2]},
                             {v: 'violet'}
                        ]},
                        {c: [
                            {v: "Hace 1 semana"},
                            {v: total4Semanas[3]},
                             {v: 'rgb(51, 102, 204)'}
                        ]}
                    ]};

                    $scope.chartObject.options = {
                        'title': 'Evolución en las 4 semanas anteriores',
                        'titleTextStyle': { 'color': '#EE3D70',
                                          'fontName': 'Gloria Hallelujah',
                                          'fontSize': '15',
                                          'bold': true,
                                          'italic': false }
                       // 'legend':{'position': bottom}
                    };
                   
                });           
               
           });    
        
};
    
    CaloriasController.$inject = ['$scope', '$log', 'UserService','ActividadesService','ReservasService', '$state'];

    angular.module('RetameApp')
      .controller('CaloriasController', CaloriasController);
    
}());