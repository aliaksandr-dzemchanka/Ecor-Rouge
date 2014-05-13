define([
        'backbone'
], function (Backbone) {

    var Note = Backbone.Model.extend({
        defaults: {
            title: ''
        },
        sync: function (method, model, options) {
            if (method == 'update' && this.collection) {
                if (!options) {
                    options = {};
                    arguments[2] = options;
                }
                options.url = this.collection.url;
            }
            return Backbone.sync.apply(this, arguments);
        },
        validate: function (attrs, options) {
            if (!$.trim(attrs.title)) {
                return "Note cannot be empty!";
            }
        }
    });

    return Note;
});