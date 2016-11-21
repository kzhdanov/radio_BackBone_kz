var taskModel = Backbone.Model.extend({});

var oneTask = new taskModel({ task: 'Dring a lot', id: 1 });
console.log(oneTask.get('task'));

var taskView = Backbone.View.extend({
  render: function () {
    var content = '<div> ' + this.model.get('task') + ' </div>';
    $(this.el).html(content);
  },
});
var oneView = new taskView({ model: oneTask });

oneView.render();
console.log(oneView.el);
