(function() {
    var ReservasService = function($q) {
        
        //devuelve las reervas de un usuario          
        this.getUserReservas = function(userId){
			var d = $q.defer();

			// Initialise Query
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
			reservasQuery.equalTo("userId", userId);
            reservasQuery.descending('createdAt');

			// Perform the query
			reservasQuery.find({
				success: function (reservas) {
					d.resolve(reservas);
				},
                error: function (reservas, error){
                    alert('Error en la reserva ');
                    d.reject(error);
                }
			});

			return d.promise;
            
        }
    };
    
    angular.module('RetameApp').service('ReservasService', ReservasService);
                                           
}());
