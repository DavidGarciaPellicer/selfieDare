(function() {
    var GalleryService = function() {
                var gallery = [
            {
                id: 1, 
                imagen: '/images/galeria/cat.jpg', 
                author:'Juan', 
                theme:'Pueblerinos',
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 2, 
                imagen: '/images/galeria/jump.jpg', 
                author:'Pedro', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            },
            {
                id: 3, 
                imagen: '/images/galeria/mirada2niña.jpg', 
                author:'Pepe', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 4, 
                imagen: '/images/galeria/mirada1.jpg', 
                author:'Rocío', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            },
           
            {
                id: 5, 
                imagen: '/images/galeria/morning.jpg', 
                author:'Juan', 
                theme:'Pueblerinos',
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 6, 
                imagen: '/images/galeria/jump.jpg', 
                author:'Pedro', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            },
            {
                id: 7, 
                imagen: '/images/galeria/mirada2niña.jpg', 
                author:'Pepe', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 8, 
                imagen: '/images/galeria/cat.jpg', 
                author:'Juan', 
                theme:'Pueblerinos',
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            }
        ];  
        
        this.getGallery = function() {
            return gallery;
        };
        
        this.getPhoto = function(photoId) {
            for (var i=0,len=gallery.length;i<len;i++) {
               if (gallery[i].id === parseInt(customerId)) {
                   return gallery[i];
               }
            }
            return {};
        };

    };
    
    angular.module('RetameApp').service('GalleryService', GalleryService);
                                           
}());