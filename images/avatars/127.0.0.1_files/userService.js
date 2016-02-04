(function() {
    var UserService = function($q) {
        
        var currentuser = {},
            images = [],
            imagenesUsuario = [],
            avatares = [],
            totalactividades = [];
        
        this.getAvatars = function(){
            return avatares;
        },
        
         this.getImgUsuario = function(){
            return imagenesUsuario;
        },
        
        this.getUsuarioSesion = function(){
            return JSON.parse(sessionStorage.getItem('usuarioPhotoChallenge'));
        },
            
        this.guardarUsuarioSesion = function(user){
            sessionStorage.usuarioPhotoChallenge = JSON.stringify(user);
        },
        
        this.removeSesion = function(){
            sessionStorage.removeItem("usuarioPhotoChallenge");
        },
             
        this.getParseAvatars = function () {
			var d = $q.defer();

			// Initialise Query
			var Avatar = Parse.Object.extend("avatar");
			var avatarQuery = new Parse.Query(Avatar);
             
			// Perform the query
			avatarQuery.find({
				success: function (imagenes) {
					angular.forEach(imagenes, function (img) {
						avatares.push(img)
					});
					console.debug(this.avatares);

					// Finished
					d.resolve(avatares);
				}
			});

			return d.promise;
		},
            
        this.getUserAvatar = function (id) {
			var d = $q.defer();

			// Initialise Query
			var Avatar = Parse.Object.extend("avatar");
			var avatarQuery = new Parse.Query(Avatar);
            avatarQuery.equalTo("objectId", id);
             
			// Perform the query
			avatarQuery.find({
				success: function (avatar) {
					// Finished
                    console.log(avatar);
					d.resolve(avatar[0].attributes);
				}
			});

			return d.promise;
		},
        
        this.signup = function(form, avatar) {
            var d = $q.defer();             
            
            var User = Parse.Object.extend("User");
            
           // this.getUserAvatar(avatar.id).then(function(avatar){
                
                var user = new User();
                user.set('username', form.email);
                user.set('password', form.password);
                user.set('name', form.nombre);
                user.set('city', form.poblacion);
                user.set('sex', form.sexo);
                user.set('email', form.email);
                user.set('birthday', form.nacimiento);
                user.set('imagen', avatar);
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
                
            //});
            
                 return d.promise;
           
        },
        	this.login = function (email, password) {
			var d = $q.defer();
            console.log(this);
            if(this.getUsuarioSesion())
                this.removeSesion(); 

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
			imageQuery.find({
				success: function (imagenes) {
					angular.forEach(imagenes, function (img) {
						var img = new Image(img);
						imagenesUsuario.push(img)
					});
					console.debug(this.imagenesUsuario);

					// Finished
					d.resolve();
				}
			});

			return d.promise;
            
        },
        
        this.getMonitores = function () {
			var d = $q.defer();

			// Initialise Query
			var User = Parse.Object.extend("User");
			var userQuery = new Parse.Query(User);
            userQuery.equalTo("monitor", true);
             
			// Perform the query
			userQuery.find({
				success: function (monitores) {
					// Finished
					d.resolve(monitores);
				}
			});

			return d.promise;
		}

        

    };
    
    angular.module('RetameApp').service('UserService', UserService);
                                           
}());