(function() {
    var ReservasService = function($q) {
        
        //devuelve las reervas de un usuario          
        this.getUserReservas = function(userId){
			var d = $q.defer();

			// Consultamos primero las reservas
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
			reservasQuery.equalTo("userId", userId);
            reservasQuery.descending('createdAt');

			// Consulta de las reservas del usuario
			reservasQuery.find({
				success: function (reservas) {
                    //una vez tenemos las reservas queremos conocer tb los datos de la actividad
              
					d.resolve(reservas);
				},
                error: function (reservas, error){
                    alert('Error en la reserva ');
                    d.reject(error);
                }
			});

			return d.promise;
            
        },
            
                
        this.createReserva = function(idActividad, horario, idUser) {
            var d = $q.defer();             
            
            var Reserva = Parse.Object.extend("Reservas");
                
                var reserva = new Reserva();
                reserva.set('actividadId', idActividad);
                reserva.set('userId', idUser);
                reserva.set('horario', horario);
                reserva.save(null, {
				success: function (reserva) {
					console.log("Reserva realizada");
					d.resolve("ok");
				},
				error: function (item, error) {
					console.log("Error en la reserva");
					d.reject(error);
				}
			});
            
                 return d.promise;      
        }
    };
    
    angular.module('RetameApp').service('ReservasService', ReservasService);
                                           
}());
