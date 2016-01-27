(function() {
    var UserService = function($q) {
        
        var currentuser = {},
            images = [],
            imagenesUsuario = [];
        
        this.getUsuarioSesion = function(){
            return JSON.parse(sessionStorage.getItem('usuarioPhotoChallenge'));
        },
            
        this.guardarUsuarioSesion = function(user){
            sessionStorage.usuarioPhotoChallenge = JSON.stringify(user);
        },
        
        this.removeSesion = function(){
            sessionStorage.removeItem("usuarioPhotoChallenge");
        },
        
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
            console.log(this);
            if(this.getUsuarioSesion())
                removeSesion(); 

			Parse.User.logIn(email, password, {
				success: function (user) {
					console.log("Logged In");
					d.resolve(user);
				},
				error: function (user, error) {
				    console.log(user);
                    alert('error: '+error.message); 
                    d.reject(error);
				}
			});
            
			return d.promise;
		},
        
            this.saveImage = function (dataImagen, form) {
			//self.isSaving = true;
			var d = $q.defer();

			var Image = Parse.Object.extend("Image");
			//var user = AuthService.user;
			var file = dataImagen ? new Parse.File("photo.jpg", {base64: dataImagen.$ngfDataUrl}) : null;
            
            //var file = dataImagen.$ngfDataUrl;

			var image = new Image();
			image.set("owner", this.getUsuarioSesion().objectId);
			image.set("picture", file);
			image.set("title", form.titulo);   
			image.set("category", form.categoria);
            image.set("description", form.descripcion);
			image.set("created", new Date());

			image.save(null, {
				success: function (imagen) {
					console.log("Imagen guardada");
					images.push(imagen);
					d.resolve(imagen);
				},
				error: function (item, error) {
				    alert('Error guardando la imagen: ' + error.message);
					d.reject(error);
				}
			});

			return d.promise;
		},
            
        this.getUserImages = function(){
             {
			//self.isLoading = true;
			var d = $q.defer();

			// Initialise Query
			var Image = Parse.Object.extend("Image");
			var imageQuery = new Parse.Query(Image);
			imageQuery.equalTo("owner", this.getUsuarioSesion().objectId);
            imageQuery.descending('created');

			// Paginate
			//imageQuery.skip(self.page * self.page_size);
			//imageQuery.limit(self.page_size);

			// Perform the query
			mealQuery.find({
				success: function (imagenes) {
					angular.forEach(imagenes, function (img) {
						var img = new Imagen(img);
						this.imagenesUsuario.push(img)
					});
					console.debug(this.imagenesUsuario);

					// Finished
					d.resolve();
				}
			});

			return d.promise;
            
        }

        

    };
    
    angular.module('RetameApp').service('UserService', UserService);
                                           
}());