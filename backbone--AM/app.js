/*(function(){
   // Crear modelo
   var DesarrolladorModel = Backbone.Model.extend({
      initialize: function(){
         console.info("Nuevo modelo de: DesarrolladorModel");

         this.on("change:editor", function(){
            console.log("Has modificado el editor");
         });

         // Evento a la escuha del error
         this.on("error", function(model, error){
            console.log(error);
         });
      },
      defaults:{
         nombre: "Pepito Perez",
         edad: 24,
         lenguajes:[]
      },
      addLenguaje: function(nuevoLenguaje){
         var array_lenguajes = this.get('lenguajes');
         array_lenguajes.push(nuevoLenguaje);
         this.set({lenguajes:array_lenguajes});
      },

      // Funcion de validacion
      validate: function(attributes){
         if(attributes.editor == "Dreamweaver"){
            return "Dreamweaver no es un editor permitido!";
         }
      }
   });

   // Crear instancia
   var desarrollador = new DesarrolladorModel;

   // Crear otra instancia cambiando valores
   var desarrollador2 = new DesarrolladorModel({
      nombre: "Mario marito",
      edad: 19,
      lenguajes: ["Javascript", "C"],
      editor: "Sublime Text 2"
   });

   // Agregando atributos posteriormente
   desarrollador.set({editor: "Notepad++"});
   desarrollador.set({editor: "Dreamweaver"});

   // Agregar nuevo lenguaje
   desarrollador.addLenguaje("Python");
})();*/


var mi_objeto = {};
MiObjeto = _.extend(mi_objeto, Backbone.Events);

// Con la funcion bind podemos enlazar un evento cualquiera con una
// función callback que se ejecutará cuando este evento ocurra en este objeto

/*mi_objeto.bind("un_evento", function(msg) {
   alert('Vaya, ha ocurrido un_evento con mensaje' + msg);
});
*/
// Un objeto puede disparar un evento en el momento que desee
// utilizando la función trigger
//mi_objeto.trigger('un_evento', 'de_ejemplo');

mi_objeto.bind('all', function(nombre_evento) {
   //alert('all');
});


mi_objeto.unbind('mi_evento');

mi_objeto.bind('un_evento', function() {
   alert('Función callback 1');
});
mi_objeto.bind('un_evento', function() {
   alert('Función callback 2')
});
//mi_objeto.trigger('un_evento'); // Se ejecutan los dos alert;
//mi_objeto.unbind('mi_evento');  

//mi_objeto.trigger('un_evento');
//DESENLAZA EVENTOS
/*
mi_objeto.unbind('mi_evento', miFuncionCallback); // Desenlaza solo la función miFuncionCallback del evento mi_evento
mi_objeto.unbind('mi_evento');                    // Desenlaza todas las funciones callback del evento mi_evento
mi_objeto.unbind();                               // Desenlaza todas las funciones de todos los eventos*/



/************************************************MODELOS*************************/
Cliente = Backbone.Model.extend();
//var cliente = new Cliente();
//alert (cliente.cid); // c0

/************************************************COLECCIONES*************************/

Clientes = Backbone.Collection.extend({
   model: Cliente
});

var clientes = new Clientes([{
   nombre: 'Alfonso',
   apellidos: 'Marín'
}, {
   nombre: 'Javier',
   apellidos: 'Serrano'
}]);

//console.log(clientes);

FichaCliente = Backbone.View.extend({
   template: _.template($('#ficha_template').html()),
   render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
   },
   events: {
      "click .close": "cierraFicha",
      "click .sel": "seleccionaFicha",
      "mouseover .title": "muestraToolTip"
   },
   seleccionaFicha: function() {
      this.model.set({
         'selected': true
      });
   },
   cierraFicha: function() { alert('Cierra Ficha');
   },
   muestraToolTip: function() { /* ... */
   }
});
var cliente = new Cliente({
   nombre: 'Alfonso',
   apellidos: 'Marín Marín'
});
var ficha = new FichaCliente({
   el: $('body'),
   model: cliente
});
ficha.render();



$(document).ready(function() {
   /*Vista = Backbone.View.extend({
      render: function() {
         $(this.el).text('Hola Mundo');
         return this;
      }
   });

   var v = new Vista();
   $('body').append(v.render().el);*/
   //Insertamos el div dentro del body de la página
});