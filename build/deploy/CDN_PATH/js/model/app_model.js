/**
 * User: emlyn
 * Date: 27/06/12
 * Time: 2:16 PM
 */
define(["backbone"],function (Backbone) {
    var Model = Backbone.Model.extend({

        PAGES: {
            TIMELINE: "TIMELINE",
            DETAIL: "DETAIL"
        }

    });

    return new Model();
});