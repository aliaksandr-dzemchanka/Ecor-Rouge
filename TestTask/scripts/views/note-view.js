define([
        'backbone',
        'app',
        'models/note-popup',
        'views/note-popup-view',
        'marionette'
], function (Backbone, App, NotePopup, NotePopupView) {

    var NoteView = Backbone.Marionette.ItemView.extend({
        template: "#note-template",
        tagName: 'tr',
        className: 'note',

        ui: {
            deleteBtn: ".delete",
            editBtn: ".edit"
        },

        modelEvents: {
            'change': 'fieldsChanged'
        },

        events: {
            'click @ui.deleteBtn': 'showDeleteNotePopup',
            'click @ui.editBtn': 'showEditNotePopup'
        },

        fieldsChanged: function () {
            this.render();
        },

        showEditNotePopup: function () {
            var that = this;
            var editView = new NotePopupView({
                model: new NotePopup({
                    note: this.model.clone()
                }),
                popupOptions: {
                    title: 'Edit Note',
                    buttons: [
                        {
                            text: "Save",
                            click: function () {
                                var popup = this;

                                if (_.isEqual(that.model.attributes, editView.model.get('note').attributes)) {
                                    $(popup).dialog("close");
                                    return;
                                }
                                editView.model.get('note').save({}, {
                                    url: that.model.collection.url,
                                    wait: true,
                                    success: function (model) {
                                        for (var field in model.changed)
                                            that.model.set(field, model.get(field));
                                        $(popup).dialog("close");
                                    },
                                    error: function () {
                                        App.vent.trigger("error:popup", "<p>Unable to update note.</p>");
                                    }
                                });
                            }
                        }
                    ]
                }
            });
            editView.render();
            editView.open();
        },

        showDeleteNotePopup: function () {
            var that = this;
            var editView = new NotePopupView({
                model: new NotePopup({
                    note: this.model,
                    editable: false
                }),
                editable: false,
                popupOptions: {
                    title: 'Delete Note',
                    buttons: [
                        {
                            text: "Delete",
                            click: function () {
                                var popup = this;
                                that.model.destroy({
                                    wait: true,
                                    success: function () {
                                        $(popup).dialog("close");
                                    },
                                    error: function () {
                                        App.vent.trigger("error:popup", "<p>Unable to delete note.</p>");
                                    }
                                });
                            }
                        }
                    ]
                }
            });
            editView.render();
            editView.open();
            return false;
        }
    });
    return NoteView;
});