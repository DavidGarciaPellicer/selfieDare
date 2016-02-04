(function() {
    var GalleryService = function($q) {
                var gallery = [];
        
        this.getGallery = function() {
            return gallery;
        },
            
        this.getIndexImages = function(){

			var d = $q.defer();

			// Initialise Query
			var Image = Parse.Object.extend("Image");
			var imageQuery = new Parse.Query(Image);
			imageQuery.equalTo("category", "inicio");

			// Perform the query
			imageQuery.find({
				success: function (imagenes) {
					angular.forEach(imagenes, function (img) {
						var img = new Image(img);
						gallery.push(img)
					});
					// Finished
					d.resolve(gallery);
				}
			});

			return d.promise;
            
        },
        
        this.getPhoto = function(photoId) {
            for (var i=0,len=gallery.length;i<len;i++) {
               if (gallery[i].id === parseInt(customerId)) {
                   return gallery[i];
               }
            }
            return {};
        }

    };
    
    angular.module('RetameApp').service('GalleryService', GalleryService);
                                           
}());