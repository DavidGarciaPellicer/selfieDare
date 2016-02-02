(function() {
    var ReservasService = function($q) {
        
        //devuelve las reervas de un usuario          
        this.getUserImages = function(userId){
			var d = $q.defer();

			// Initialise Query
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
			reservasQuery.equalTo("userId", userId);
            reservasQuery.descending('created');

			// Perform the query
			reservasQuery.find({
				success: function (reservas) {
					d.resolve(reservas);
				}
			});

			return d.promise;
            
        },
    };
    
    angular.module('RetameApp').service('ReservasService', ReservasService);
                                           
}());
