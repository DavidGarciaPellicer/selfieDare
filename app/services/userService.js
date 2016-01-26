(function() {
    var UserService = function($q) {
        
        var currentuser = {}; 
        
        this.signup = function(form) {
            var d = $q.defer();
            
            var User = Parse.Object.extend("User");
            
            var user = new User();
            user.set('username', form.email);
            user.set('password', form.password);
            user.set('name', form.nombre);
            user.set('city', form.poblacion);
            user.set('sex', form.sexo);
            user.set('email', form.email);
            user.set('birthday', form.nacimiento);
            console.log('user:'+user);
            user.signUp(null, {
               success: function(user){
                   console.log('usuario creado');
                   currentuser = user;
                   d.resolve(user);
               },
                error: function(item, error){
                    console.log(item);
                   alert('error: '+error.message); 
                    d.reject(error);
                }
            });
            
            return d.promise;
        },
        	this.login = function (email, password) {
			var d = $q.defer();

			Parse.User.logIn(email, password, {
				success: function (user) {
					console.log("Logged In");
				    currentuser = user;
					d.resolve(self.user);
				},
				error: function (user, error) {
				    console.log(user);
                    alert('error: '+error.message); 
                    d.reject(error);
				}
			});
            
			return d.promise;
		}

    };
    
    angular.module('RetameApp').service('UserService', UserService);
                                           
}());