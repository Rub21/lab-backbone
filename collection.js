// 
$(function() {

	var UserModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: null,
				name: "John Doe",
				age: 18 + parseInt(Math.random() * 20),
				employed: "No"
			};
		},

		validate: function(attributes) {
			if (!_.isNumber(attributes.age) || _.isNaN(attributes.age)) {
				return "Age is not a number";
			}

			if (attributes.age < 18) {
				return "Sorry, just 18 and older";
			}
		}
	});

	var UserCollection = Backbone.Collection.extend({
		model: UserModel
	});


	var users = new UserCollection();

	//asi como los modelos tienen eventos las coleciones tambien tienen eventos

	users.on("add", userChanged); //implementacion en backbone para agegar , elisten add
	users.on("remove", userChanged); //implementacion de backbone para eliminar ..listen remove
	//tambien se puede cnoindir varios eventos que hagan lo mismo

	/*users.on("add remove", userChanged);*/

	function userChanged() {
		var template = $("[data-template-name='user-row']").html().trim();
		//alert(template);
		$tbody = $(".users-table > tbody");

		$tbody.empty();

		users.each(function(user) {
			$tbody.append(Mustache.render(template, user.toJSON()));
		});

	}
	$(".add").click(function(event) {
		var d = new Date()
		var user = new UserModel({
			id: d.getTime(),
			name: $("input[name='name']").val(),
			age: parseInt($("input[name='age']").val()),
			employed: $("input[name='employed']").is(":checked") ? "Yes" : "No"
		});

		//como UserModel se cre dentro de la conleccion no es necesario instanciar un nuevo usuario.
		//se puede hacer defrente
		/*
		users.add({
			id: d.getTime(),
			name: $("input[name='name']").val(),
			age: parseInt($("input[name='age']").val()),
			employed: $("input[name='employed']").is(":checked") ? "Yes" : "No"
		});
	*/

		users.add(user);
		//alert(users.size());
	});


	//delegate es para versiones nateriores de jqueri 1.7
	/*$(".users-table").delegate(".delete", "click", function() {
		alert("tttt");
	});*/
	//on se utiliza para versiones superiores a 1.7
	$(".users-table").on("click", ".delete", deleteUser);

	function deleteUser(event) {
		var $button = $(event.currentTarget);
		var userId = $button.data("user-id");

		var user = users.find(function(item) { //find devuelve un elemto.
			return item.get("id") == userId;
		});
		var oldusers = users.select(function(item) { //select devuelve varios elemtos
			return item.get("age") > 30;
		});


		//utiliznado los metodos de bacbone 

		var user2 = users.get(userId);

		users.remove(user);


	}

});