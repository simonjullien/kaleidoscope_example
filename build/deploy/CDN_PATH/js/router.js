define(["backbone","underscore"],function(Backbone,_) {

    var Router = Backbone.Router.extend({

        page:null,
        pageOptions:null,
        authCheck:null,

        initialize: function( options ) {
            if(options) {
                this.authCheck = options.authCheck;
            }

            this.on('route', this.onRoute, this);
        },

        start: function() {
            Backbone.history.start();
        },

        setRoutes: function(routes) {
            _.each( routes, function( routeDef ) {
                this.route(routeDef[0],routeDef[1]);
            },this);

            Backbone.history.on('route', this.onRoute, this);
        },

        onRoute: function (router, page, options) {
            this.setPage(page, options);
        },

        setAuthCallBack:function( cb ) {
            this.authCheck = cb;
        },

        setPage : function(page, options) {
            this.page = page;
            this.pageOptions = options;
            this.trigger('page', page, options);
        },

        /**
         * Intercept navigation requests to check with auth system.
         * Designed to retain click context for pop-ups eg facebook login.
         */
        navigate: function(fragment, triggerRoute) {

            triggerRoute = triggerRoute === false ? false : true;

            if( this.authCheck ) {

                if( !this.authCheck.call(this, fragment)) {
                    return false;
                }

            }

            return Backbone.Router.prototype.navigate.call(this,fragment, triggerRoute);
        },

        back: function() {
            history.back();
        }


    });

    return new Router();
});