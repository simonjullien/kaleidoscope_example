/**
 * User: emlyn
 * Date: 27/06/12
 * Time: 2:14 PM
 */
define([
    "router",
    "model/app_model"
],function (
    Router,
    AppModel
) {

    var controller = {

        init: function() {
            Router.on("page", this.onRouterPage, this);
        },

        onRouterPage: function ( page, pageOptions ) {
            AppModel.set({'page': page, 'pageOptions': pageOptions});
        }
};

    controller.init();

    return controller;
});