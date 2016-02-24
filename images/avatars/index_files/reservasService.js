(function() {
    var ReservasService = function($q) {
        
        //devuelve las reservas de un usuario          
        this.getUserReservas = function(userId){
			var d = $q.defer();
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId;
			// Consultamos primero las reservas
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
            reservasQuery.include("actividad.tipo");
			reservasQuery.equalTo("userId", user);
            reservasQuery.greaterThan('horario',new Date());
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
            
            var Actividad = Parse.Object.extend("Actividad");
            var actividad = new Actividad();
            actividad.id = idActividad;
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = idUser;
            
            var Reserva = Parse.Object.extend("Reservas");
                
                var reserva = new Reserva();
                reserva.set('actividad', actividad);
                reserva.set('userId', user);
                reserva.set('horario', horario);
                reserva.save(null, {
				success: function (reserva) {
					d.resolve(reserva);
				},
				error: function (item, error) {
					d.reject(error);
				}
			});
            
                 return d.promise;      
        },
            
        this.deleteReserva = function(idReserva) {
            var d = $q.defer();    
            
            var Reservas = Parse.Object.extend("Reservas");  
             var reservasQuery = new Parse.Query(Reservas);
            reservasQuery.get(idReserva, {
              success: function(reserva) {
                // The object was retrieved successfully.
                reserva.destroy({});
                d.resolve(reserva.attributes.actividad.id);
              },
              error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                  d.reject(error);
              }
            });
                 return d.promise;      
        },
            
        //devuelve las reservas de la semana          
        this.getUserWeekReservas = function(userId){
			var d = $q.defer();
            
            var startOfWeek = moment().startOf('isoweek').toDate();
            var endOfWeek   = moment().endOf('isoweek').toDate();
            var today = new Date();
            
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId.objectId;
			// Consultamos primero las reservas
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
            reservasQuery.include("actividad.tipo");
			reservasQuery.equalTo("userId", user);
            reservasQuery.greaterThan('horario',startOfWeek);
            reservasQuery.lessThan('horario',today);

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
        
        //const weeksInMonth = moment(moment().endOf('month') - moment().startOf('month')).weeks()
            
        //devuelve las reservas de la semana          
        this.get4SemanasAnterioresReservas = function(userId){
			var d = $q.defer();
            var dias = new Date().getDay()!=0 ? new Date().getDay():7;
            var domingoAnterior = moment().subtract(dias,'day');
            var lunes4SemanasAntes = domingoAnterior.clone().subtract(27, 'day')
            
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId.objectId;
			// Consultamos primero las reservas
			var Reservas = Parse.Object.extend("Reservas");
			var reservasQuery = new Parse.Query(Reservas);
            reservasQuery.include("actividad.tipo");
			reservasQuery.equalTo("userId", user);
            reservasQuery.greaterThan("horario", lunes4SemanasAntes.toDate());
            reservasQuery.lessThanOrEqualTo("horario", domingoAnterior.toDate());

			// Consulta de las reservas del usuario
			reservasQuery.find({
				success: function (reservas) {

                //tenemos las reservas de las 4 semanas anteriores
                //se agrupan en el array por semana

                var groupedByWeek = _.groupBy(reservas, function(reserva) {
                    var fecha = moment(reserva.attributes.horario).format('DD/MM/YYYY');
                    var dateMoment = moment(fecha,'DD/MM/YYYY');
                    return dateMoment.week();
                });
            
					d.resolve(groupedByWeek);
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
