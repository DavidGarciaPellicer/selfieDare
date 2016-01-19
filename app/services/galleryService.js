(function() {
    var GalleryService = function() {
                var gallery = [
            {
                id: 1, 
                imagen: '/img/galeria/blog.gif', 
                author:'Juan', 
                theme:'Pueblerinos',
                localidad:'Algemesí',
                privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 2, 
                 imagen: '/img/galeria/cateto_ilustrado.jpg', 
                author:'Pedro', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            },
            {
                id: 3, 
                 imagen: '/img/galeria/Mufeo.jpg', 
                author:'Pepe', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 4, 
                imagen: '/img/galeria/otrocateto.jpeg', 
                author:'Rocío', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            },
           
            {
                id: 5, 
                imagen: '/img/galeria/blog.gif', 
                author:'Juan', 
                theme:'Pueblerinos',
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            }, 
            {
                id: 6, 
                 imagen: '/img/galeria/cateto_ilustrado.jpg', 
                author:'Pedro', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                 privacidad:'publico',
                dareId: 1
            },
            {
                id: 7, 
                 imagen: '/img/galeria/Mufeo.jpg', 
                author:'Pepe', 
                theme:'Pueblerinos', 
                localidad:'Algemesí',
                dareId: 1
            }, 
            {
                id: 8, 
                imagen: '/img/galeria/otrocateto.jpeg', 
                author:'Rocío', 
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