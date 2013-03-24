$(function() {

	//Jquery;
	$(window).on("namespace_rub_for_events.sayHi", function(event, target, message, dude) {

		target.html("Howdy" + message + "!");
		alert("HEy" + dude + "!");

	});

	$("body").on("namespace_rub_for_events.sayHi", function(event) {
		$(this).css("background-color", "CCC")
	});

	$(".buttonCont").on("namespace_rub_for_events.sayHi", function(event) {
		$(this).css("background-color", "BADA55")
		alert("body");
		alert("button");
	});
	//namespace_rub_for_events es un evento personalizado
	$(".sayHi").click(function(event) {
		$(this).trigger("namespace_rub_for_events.sayHi", [$(".console"), "RUBEN", "blashput"]); //jquery dice que tenoememo que pasa los argumentos como arreglos
	});


	///Backbone
	//controller  seria con un central dispacher o una central listener
	var controller = _.extend({}, Backbone.Events); //extend toma todas las propiedades de un objeto a otro objeto..
	//Backbone.Events tiene objetos  triggers , on , off
	controller.on("namespace_rub_for_events.sayBye", function(target, message) {
		target.html("come back soom" + message);
	});

	$('.sayBye').click(function(event) {
		controller.trigger("namespace_rub_for_events.sayBye", $(".console"), "RUBEN");
	});

});