define(["jquery","config","underscore","util/facebook"],function($,Config,_,Facebook) {
	
	return {
		//TWITTER
		tweet: function(shareText,shareUrl,related) {
			shareText = shareText;
			shareUrl = shareUrl || Config.APP_URL;
			related = related;
			var encodedURL = 'http://twitter.com/intent/tweet?text='+encodeURIComponent(shareText)+'&url='+ encodeURIComponent(shareUrl) +'&related='+encodeURIComponent(related);			
			if (!window.open(encodedURL, "tweetFollow", "width=550,height=420,toolbar=no") ) {
                window.location.href = encodedURL;
            }
		},
		
		//FACEBOOK
		fbpost: function( options, fbcallback ) {
			
	        var obj = {};
	        obj.method = 'feed';
	       
	        obj = _.extend( obj, options);
	        
	        // calling the API ...
            Facebook.SDK.ui(obj, fbcallback);
		},
		
		//TODO: figure out where to get the list of user ids who are already using the app
		//message:String
		//exclude_ids: array of 'user_ids' 
		inviteFacebookFriends: function ( message ) {
            Facebook.SDK.ui({method:'apprequests', message: message});
		},
		
		shareSiteFacbook: function( url ) {
		 
		  window.open("https://www.facebook.com/sharer.php?u="+url, "fbShare", "width=550,height=420,toolbar=no");
		
		},
	  
		followTwitter: function( user ) {
		  window.open('https://twitter.com/intent/user?screen_name='+user, "tweetFollow", "width=550,height=420,toolbar=no");
		 
		}
	};
});