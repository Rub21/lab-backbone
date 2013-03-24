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

	users.on("add", userAdded);

	function userAdded() {
		var template = $("[data-template-name='user-row']").html().trim();
		//alert(template);
		$tbody = $(".users-table > tbody");

		$tbody.empty();

		users.each(function(user) {
			$tbody.append(Mustache.render(template, user.toJSON()));
		});

	}

	$(".add").click(function(event) {
		var user = new UserModel({
			name: $("input[name='name']").val(),
			age: parseInt($("input[name='age']").val()),
			employed: $("input[name='employed']").is(":checked") ? "Yes" : "No"
		});

		users.add(user);
		//alert(users.size());
	});


	$(".delete").click(function(){
		
	});
});