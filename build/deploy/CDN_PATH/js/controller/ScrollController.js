
define([
    "underscore",
    "router",
    "model/app_model"
],function (
    _,
    Router,
    AppModel
) {

    var ScrollController = function(){
        
    };

    _.extend(ScrollController.prototype, {

        $target: null,
        dispatcher: null,

        init: function($target,dispatcher) {
            this.$target = $target;
            this.dispatcher = dispatcher;
            _.bindAll(
                this,
                "scrollHandler"
            );
            $target.on('scroll', this.scrollHandler);
        },

        scrollHandler: function(e){
            var scrollTop = this.$target.scrollTop();
            this.dispatcher.trigger('scroll_change',scrollTop);
        }
    });
        

    return ScrollController;
});