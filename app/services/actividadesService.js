(function() {
    var ActividadesService = function($q) {
        
        //devuelve las actividades de la semana actual
        this.getWeekActividades = function(){
            
            var d = $q.defer();
            
            var fecha = new Date();
            // Initialise Query
			var Actividad = Parse.Object.extend("Actividad");
			var actividadQuery = new Parse.Query(Actividad);
            actividadQuery.ascending('date');

			// Perform the query
			actividadQuery.find({
				success: function (actividades) {
					console.debug(actividades);
					// Finished
					d.resolve(actividades);
				}
			});

			return d.promise;
            
        },
        
        //devuelve todas las actividades
        this.getActividades = function(){

			var d = $q.defer();

			// Initialise Query
			var Actividad = Parse.Object.extend("Actividad");
			var actividadQuery = new Parse.Query(Actividad);
            actividadQuery.ascending('date');

			// Perform the query
			actividadQuery.find({
				success: function (actividades) {
					console.debug(actividades);
					// Finished
					d.resolve(actividades);
				}
			});

			return d.promise;
            
        },
        
        //no se emplea de momento, pero averigua los días del mes actual
        this.getDaysInMonth = function(anyDateInMonth){
             return new Date(anyDateInMonth.getYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();
        }
    };
    
    angular.module('RetameApp').service('ActividadesService', ActividadesService);
                                           
}());
