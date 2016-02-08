(function() {
    var ActividadesService = function($q) {
        
        var actividades = null,
            tipoactividades = null;
        
        this.getLocalActividades = function(){
            return actividades;
        },
        //devuelve las actividades de la semana actual
        this.getWeekActividades = function(){
            
            var d = $q.defer();
            
            var fechainicio = new Date();
            //dejamos a 0 las horas para que sea el comienzo de nuestro tiempo
            fechainicio.setHours(0,0,0,0);
            var fechafinal = new Date();
            fechafinal.setTime( fechafinal.getTime() + 7 * 86400000 );
            // Initialise Query
			var Actividad = Parse.Object.extend("Actividad");
			var actividadQuery = new Parse.Query(Actividad);
            actividadQuery.include("monitor");
            actividadQuery.include("tipo");
            
            actividadQuery.greaterThan('date',fechainicio);
            actividadQuery.lessThan('date',fechafinal);
            actividadQuery.ascending('date');

			// Perform the query
			actividadQuery.find({
				success: function (actividades) {
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
                    this.actividades = actividades;
					d.resolve(actividades);
				}
			});

			return d.promise;
            
        },     
            
        //devuelve todas las actividades
        this.getTipoActividades = function(){

			var d = $q.defer();

			// Initialise Query
			var TipoActividad = Parse.Object.extend("TipoActividad");
			var tipoQuery = new Parse.Query(TipoActividad);

			// Perform the query
			tipoQuery.find({
				success: function (tipoactividades) {
                    this.tipoactividades = tipoactividades;
					d.resolve(tipoactividades);
				}
			});

			return d.promise;
            
        }, 
            
        this.consultarPlazas = function(actividadId){

			var d = $q.defer();

			// Initialise Query
			var Actividad = Parse.Object.extend("Actividad");
			var actividadQuery = new Parse.Query(Actividad);
            actividadQuery.equalTo("objectId", actividadId);

			// Perform the query
			actividadQuery.first({
				success: function (Actividad) {
                      Actividad.save(null, {
                          
                        success: function (actividad) {
                            //si hay plazas disponibles restamos una
                            if(actividad.attributes.disponibles>0){
                                actividad.set("disponibles", actividad.attributes.disponibles - 1);
                                actividad.save();
                                actividad.reservaHecha = true;
                            }else actividad.reservaHecha = false;
                        }
                      }).then(function (actividad){
                           d.resolve(actividad);	
                      });           
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
