define([
        'backbone',
        'marionette'
], function (Backbone) {

    var NotePopupView = Backbone.Marionette.ItemView.extend({
        template: "#create-edit-note-template",

        ui: {
            noteInput: ".newNote"
        },

        events: {
            'change @ui.noteInput': 'changeNote'
        },

        popupOptions: {
            autoOpen: false,
            draggable: false,
            modal: true,
            resizable: false,
            width: 600,
            buttons: []
        },
        initialize: function () {
            var self = this;
            this.popupOptions.close = function () {
                self.destroy();
            };
            var popupOptions = $.extend(true, {}, this.popupOptions, this.options.popupOptions);
            popupOptions.buttons.push({
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            });
            this.$el.dialog(popupOptions);
        },
        changeNote: function () {
            this.model.get('note').set({ 'title': this.ui.noteInput.val() });
        },
        open: function () {
            this.$el.dialog("open");
        },
        destroy: function () {
            this.$el.dialog("destroy");
            this.remove();
        }
    });
    return NotePopupView;
});