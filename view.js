// 
$(function() {

	var UserModel = Backbone.Model.extend({
		defaults: function() {
			return {
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



	/********************vistas*/
	var UsersView = Backbone.View.extend({
		el: "body",
		//hacemos un match con los funciones que se vana a ejecutar //agrgamos los eventons que vamos a recivir de la visytas y 
		events: { //agrgamos los eventons que vamos a recivir de la visytas y 
			"click .add": "addUser"
		},
		initializer: function() {
			_.bindAll(this); //es recomendable poner el this ya que esta asociando todos los objetos que se estab generando en esta vista, ejemplo initializer, render, addUser,,
			this.model = new UserCollection();
			this.model.on("add", this.addOne); //este modelo llega en el constructor
			this.model.on("remove", this.removeOne);
		},
		render: function() {
			var $tbody = $(".users-table tbody");
			var template = $.trim($("[data-template-name='user-row']").html() || "Row template not found!");
			$tbody.empty();
			users.each(function(user) {
				$tbody.append(Mustache.render(template, user.toJSON()));
			}, this);
		},


		addUser: function() { //agragamos la funcion addUser dentro de la Vista
			var d = new Date();
			try {
				users.add({ //capturamos los valores de la vista y las agregamos a la coleccion sin hacer ya otra instancia de user
					id: d.getTime(),
					name: $("input[name='name']").val(),
					age: parseInt($("input[name='age']").val()),
					employed: $("input[name='employed']").is(":checked") ? "Yes" : "No"
				});


			} catch (error) {
				console.log(error.message);
			}
		},
		addOne: function(user) {
			if (user.view == null) {
				user.View = new UserView({
					model: user
				});
			}
			this.$(".users-table tbody").append(user.view.render().el);

		},
		removeOne: function(user) {
			if (user.view == null) {
				user.view.remove(); //remove un medoto de backbone
			}

		}
	});

	//inicializamos creando el objeto
	/*
	var mainView = new UsersView();
	*/

	//se pueden padas colleciones o modelosd como parametros a las vistas de backbone
	var mainView = new UsersView({
		model: users
	});


	/*****************************otra forma para View */
	//este sera una vista para la representacion de cada uno de los usuarios

	var UserView = Backbone.View.extend({
		//creamos una variable template
		tagName: "tr",
		template: null,
		events: {
			"click .delete": "deleteUser"

		},
		initializer: function() {
			_.bindAll(this);
			//algo asi Quiero el tr que esta dentro de data-template-name='user-row
			this.template = $.trim($("[data-template-name='user-row'] tr").html() || "Row template not found!");
		},
		render: function() {

			//el render va hacer es tomar mi datos y poner en el html
			//leer el templete de row
			this.$el.html(Mustache.render(this.template, this.model.toJSON()));
			return this;

		},
		deleteUser: function() {
			this.model.Collection.remove(this.model);
		}
	});

});