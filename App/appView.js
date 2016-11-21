var AppView = Backbone.View.extend({
  events: {
    "click .js-press_M": "press_M",
    "click .js-press_P": "press_P"
  },

  initialize: function() {
  	this.template = _.template($("#_root").html());
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  render: function() {
    var json = this.model.toJSON();
    var view = this.template(json);
    this.$el.html(view);
  },

  press_M: function(event) {
  	var age = this.model.get('age');
  	this.model.set({
  		age: Number(age-1),
  	});
  },

  press_P: function(event) {
  	var age = this.model.get('age');
  	this.model.set({
  		age: Number(age+1),
  	});
  }
})