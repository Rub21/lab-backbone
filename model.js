// 
$(function() {

	//esta ya es una clase
	var UserModel = Backbone.Model.extend({

		defaults: function() { //valores predefinidos
			return {
				name: "John Doe",
				age: 18 + parseInt(Math.random() * 20),
				employed: "No"
			};
		},
		validate: function(attributes) { //valida los atributos

			if (_.isNaN(parseInt(attributes.age))) {
				//throw "no es un numero";
				return "age no is not number";
			}

			if (attributes.age < 18) {
				//throw "Grow up";
				return "Grop Up";
			}
		}
	});

	//backbone implementa metodos set y get
	//para instanciar
	var user = new UserModel();

	user.on("change", updateUser); ///esto permite capturar cualquier cnaio que se le haga en el modelo.
	/*user.on("change:age", function(data) {
		alert("Cambio la edad" + data.get("age"));
	});*/
	user.on("error", function(model, error) {
		console.log("Opps " + error);
	});

	function updateUser() {
		$("span.name").html(user.get("name"));
		$("span.age").html(user.get("age"));
		$("span.employed").html(user.get("employed"));
	};

	$(".update").click(function(event) {
		/*user.set("name", $("input[name='name']").val());
		user.set("age", parseInt($("input[name='age']").val()));
		user.set("employed", $("input[name='employed']").is(":checked") ? "Yes" : "No");
        */

		// tambien se puede hacer set de multiples propiedades.

		user.set({
			"name": $("input[name='name']").val(),
			"age": parseInt($("input[name='age']").val()),
			"employed": $("input[name='employed']").is(":checked") ? "Yes" : "No"
		});

		updateUser();
	});

	updateUser();
});