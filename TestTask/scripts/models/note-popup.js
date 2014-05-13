define([
        'backbone'
], function (Backbone) {
    var NotePopup = Backbone.Model.extend({
        defaults: {
            editable: true
        }
    });

    return NotePopup;

});