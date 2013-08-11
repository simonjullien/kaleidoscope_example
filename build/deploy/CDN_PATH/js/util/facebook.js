define(["config","underscore", "backbone"],function(Config,_, Backbone) {

	var fb = {

        sdk: null,
        ready: false,

		onFBinit: function() {
			
			window.FB.init({
              appId      : Config.getFBID(),
              channelUrl : Config.SITE_URL + '/channel.html',
              status     : true, // check login status
              cookie     : true, // enable cookies to allow the server to access the session
              xfbml      : true  // parse XFBML
            });
			
			//# Listen for like button
            window.FB.Event.subscribe('edge.create', _.bind(this.onFBLike,this) );
            window.FB.Event.subscribe('comment.create', _.bind(this.onFBComment,this));

            this.SDK = window.FB;
            this.ready = true;

			this.trigger("fb_ready");
		},

        onFBComment:function onFBComment(params) {
            this.trigger("fb_comment",params);
        },

		onFBLike: function( url ) {
			this.trigger("fb_like", url);
		}
		
	};
    _.extend(fb,Backbone.Events);
		
	window.fbAsyncInit = _.bind( fb.onFBinit, fb );

      // Load the SDK Asynchronously
      (function(d){
         var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "https://connect.facebook.net/en_US/all.js";
         d.getElementsByTagName('head')[0].appendChild(js);
       }(document));

      return fb;
	
});