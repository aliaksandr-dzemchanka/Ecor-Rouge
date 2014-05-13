define([
    'backbone',
    'app',
    'models/note',
    'views/note-view',
    'models/note-popup',
    'views/note-popup-view',
    'marionette'
], function (Backbone, App, Note, NoteView, NotePopup, NotePopupView) {

    var NotesView = Backbone.Marionette.CompositeView.extend({
        tagName: "table",
        className: "notes",
        template: "#notes-template",
        itemView: NoteView,

        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        },
        ui: {
            addBtn: ".add",
            noteInput: ".newNote",
            noResults: ".no-results"
        },
        events: {
            'click @ui.addBtn': 'showAddNotePopup'
        },
        collectionEvents: {
            "failed": "fetchFailed",
            "add remove": "collectionChanged"
        },

        collectionChanged: function () {
            this.ui.noResults.css({ display: this.collection.length ? '' : 'block' });
        },

        fetchFailed: function () {
            this.remove();
        },

        showAddNotePopup: function () {
            var that = this;
            var newNote = new Note();
            var editView = new NotePopupView({
                model: new NotePopup({
                    note: newNote
                }),
                popupOptions: {
                    title: 'Create Note',
                    buttons: [
                        {
                            text: "Create",
                            click: function () {
                                if (!newNote.isValid())
                                    return;
                                var popup = this;
                                that.collection.create({
                                    title: $.trim(newNote.get('title'))
                                }, {
                                    wait: true,
                                    success: function () {
                                        $(popup).dialog("close");
                                    },
                                    error: function () {
                                        App.vent.trigger("error:popup", "<p>Unable to crete note.</p>");
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

    return NotesView;
});