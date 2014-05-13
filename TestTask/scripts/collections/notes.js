define([
        'backbone',
        'app',
        'models/note'
], function (Backbone, App, Note) {
    var Notes = Backbone.Collection.extend({
        model: Note,
        initialize: function (notes, options) {
            this.url = options.noteService;
            var that = this;
            this.fetch({
                error: function () {
                    that.trigger("failed");
                    App.vent.trigger("error:popup", "<p>Unable to get notes.</p>", {
                        buttons: null,
                        closeOnEscape: false,
                        open: function () {
                            $(this).parent().find('.ui-dialog-titlebar').hide();
                        }
                    });
                }
            });
        }
    });
    return Notes;
});