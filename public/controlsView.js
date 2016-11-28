var ControlsView = Backbone.View.extend({
  events: {
    "click #Play" : "Play",
    "click #Stop" : "Stop",
    "change #ex8" : "VolumeChanging",
    "click .glyphicon-volume-off" : "VolumeOff",
    "click .glyphicon-volume-up": "VolumUp", 
  },

  initialize: function() {
  	this.template = _.template($("#_root").html());
    this.listenTo(this.model, "change", this.render);
    this.render();

    var ws = new WebSocket ('ws://localhost:10002/');
    ws.onmessage = function (message) {
      var res = JSON.parse(message.data)
      
      $('.js-group').text(res.autor);
      $('.js-song').text(res.songName);
      $('.js-album').text(res.album);
    };
  },

  render: function() {
    var json = this.model.toJSON();
    var view = this.template(json);
    this.$el.html(view);

    this.Slider = $('#ex8').slider();
    this.SetCurrentVolume();
    
    if(this.model.get('volume') == 0)
      $('.glyphicon-volume-off').addClass('unactive');
  },

  Play: function(event) {
  	this.model.set({
  		playing: true,
      volume: Number($('#ex8').val()),
  	});

    $('#RootAudio').trigger('play');
  },

  Stop: function(event) {
    this.model.set({
      playing: false,
      volume: Number($('#ex8').val()),
    });
    $('#RootAudio').trigger('pause');
  },

  VolumeChanging: function (e) {
    if(e.target.value != 0 && $('.glyphicon-volume-off').hasClass('unactive'))
      $('.glyphicon-volume-off').removeClass('unactive');

    if(e.target.value == 0)
      $('.glyphicon-volume-off').addClass('unactive');

    $('audio').prop("volume", Number($('#ex8').val() / 100));
  },

  VolumeOff: function () {
    this.Slider.slider('setValue', 0);
    $('audio').prop("volume", 0);
    $('.glyphicon-volume-off').addClass('unactive');
  },

  VolumUp: function () {
    this.Slider.slider('setValue', 100);
    $('audio').prop("volume", 1);
    $('.glyphicon-volume-off').removeClass('unactive');
  },

  SetCurrentVolume: function () {
    $('audio').prop("volume", Number(this.model.get('volume') / 100));
    return false;
  }
})