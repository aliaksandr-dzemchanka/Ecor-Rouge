define([
        'backbone',
        'marionette'
], function (Backbone) {
    var App = new Backbone.Marionette.Application();

    App.vent.on("error:popup", function (html, options) {
        $('<div class="note-popup"/>').html(html).dialog($.extend({
            draggable: false,
            modal: true,
            resizable: false,
            width: 400,
            close: function () {
                $(this).dialog("destroy");
            },
            buttons: [{
                text: "Close",
                click: function () {
                    $(this).dialog("close");
                }
            }]
        }, options));
    });

    App.addRegions({
        mainRegion: "#content"
    });

    App.addInitializer(function (options) {
        require(['./views/notes-view', './collections/notes'], function (NotesView, Notes) {
            var notesView = new NotesView({ collection: new Notes([], options) });
            App.mainRegion.show(notesView);
        });
    });

    return App;
});