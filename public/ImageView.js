var ImageView = Backbone.View.extend({
	events: {
	    "click .newWindow_link" : "newWindow"
    },

	initialize: function() {
	  	this.template = _.template($("#_image").html());

	  	var ws = new WebSocket ('ws://localhost:10002/');
	    ws.onmessage = (function (message) {
	      var res = JSON.parse(message.data);
	      res.imgSrc = './RadioCovers/' + res.autor + '-' + res.album + '.jpg';
		  this.model.set(res);
	    }).bind(this);

		this.listenTo(this.model, "change", this.render);
	    this.render();
  	},

  	render: function() {
	    var json = this.model.toJSON();
	    var view = this.template(json);
	    this.$el.html(view);
  	},

  	newWindow: function () {
  		window.open('/window/new',"RadioAvance.ru",
					"width=480,height=260,scrollbars=no,status=yes");
  	}
})