define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "preloadjs",
    "util/animation/AnimationUtils"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    PreloadJS,
    AnimationUtils
) {
  return Backbone.View.extend({

        $top_bar: null,
        $scrollIt: null,
        $window: null,
        dispatcher: null,
        data: null,
        loader: null,
        manifest: null,
        assets: null,
        canvas: null,
        ctx: null,
        img: null,
        img2: null,
        img3: null,
        img4: null,
        resultImageData: null,
        tpValue: 0,

        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,

        targetScale: 0,

        isMouseOver:false,

        currentBarPx:1000,
        currentScale:10,

        $momentsNode: null,


        initialize: function(options) {
            this.dispatcher = options.dispatcher;
            _.bindAll(
                this,
                "handleFileLoad",
                "handleProgress",
                "handleComplete",
                "mouseMoveHandler",
                "loopInterval",
                "touchMoveHandler",
                "onScrollChange",
                "mouseEnterHandler",
                "mouseLeaveHandler"
            );
            this.assets = [];
            this.manifest = [
                {src:Config.CDN+'/img/kaleidoscope2.jpg', id:"kaleidoscope"}
            ];

           // this.requestFrameAnimation();
           require(["text!"+Config.BASE_URL+"templates/kaleidoscope.html!strip"], _.bind(this.onTemplateLoaded, this) );
        },

        onTemplateLoaded: function( template ) {
            var templateFunction = Handlebars.compile( template );
            this.$el.append(
                $( templateFunction( { 'title': 'Awesome!', 'time': new Date().toString() } ) )
            );

            this.canvas = document.getElementById("kaleidoscope");
            this.ctx = this.canvas.getContext('2d');

            this.$scrollIt = $('.kaleidoscope-scroll');
            this.$top_bar = $('.top-bar');
            this.$canvas = $(this.canvas);
            this.$window = $(window);

            this.loadAsset();
        },

        loadAsset: function(){
            this.loader = new PreloadJS();
            this.loader.onFileLoad = this.handleFileLoad;
            this.loader.onComplete = this.handleComplete;
            this.loader.onProgress = this.handleProgress;
            this.loader.loadManifest(this.manifest);
        },

        handleFileLoad: function(event) {
            this.assets.push(event);
        },

        handleProgress: function(event){
        },

        onScrollChange:function(topValue){
            //console.log(topValue);
            this.tpValue = topValue;
        },

        mouseEnterHandler: function(){
            this.isMouseOver = true;
        },

        mouseLeaveHandler: function(){
            this.isMouseOver = false;
        },

        handleComplete: function() {
            this.img = this.assets[0].result;

            $(this.canvas).on('mousemove',this.mouseMoveHandler);
            $(this.canvas).on('mouseenter',this.mouseEnterHandler);
            $(this.canvas).on('mouseleave',this.mouseLeaveHandler);

            $(window).on('touchmove',this.touchMoveHandler);

            this.dispatcher.on('scroll_change', this.onScrollChange);

            this.interval = setInterval(this.loopInterval,1000/60);
        },

        mouseMoveHandler: function(e){
            if(this.isMouseOver){
                var offset = $('#kaleidoscope').offset();
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;
                this.targetX = x + this.tpValue / (this.$scrollIt.height() - this.$window.height()) * (1500-850);
                this.targetY = y / 2;
            }
        },

        touchMoveHandler: function(e){
            //e.preventDefault();
            var offset = $('#kaleidoscope').offset();
            var x = e.originalEvent.touches[0].pageX - offset.left;
            var y = e.originalEvent.touches[0].pageY - offset.top;
            //this.targetX = x;
            //this.targetY = y / 2;
        },

        loopInterval: function(e){
            var pr = this.tpValue / (this.$scrollIt.height() - this.$window.height());
            if(!this.isMouseOver){
                this.targetX = pr*(2000-350);
                this.targetY = pr*(350);
            }
            this.currentX += (this.targetX - this.currentX)*0.15;
            this.currentY += (this.targetY - this.currentY)*0.15;
            
            this.drawKaleidoscope(this.ctx, this.img, this.currentX, this.currentY );

            this.targetScale = 0.4;
            if(this.currentScale !== this.targetScale){
                this.currentScale = this.targetScale;
                var vals = this.targetScale * 0.3;
                var totsScale = this.targetScale;
                var listTransform = [
                    AnimationUtils.getTransformationMatrix(0,-130,0),
                    AnimationUtils.getScaleMatrix(totsScale,totsScale,totsScale),
                    AnimationUtils.getRotationZMatrix(45)
                ];
                var transformResultM = AnimationUtils.getResultMatrix(listTransform);
                var stringTransform = AnimationUtils.getStringTransform3d(transformResultM);
                this.$canvas.css({
                    'transform': stringTransform,
                    '-ms-transform': stringTransform,
                    '-webkit-transform': stringTransform,
                    '-moz-transform': stringTransform,
                    '-o-transform': stringTransform
                });
            }
        },

        drawKaleidoscope: function(ctx, img, imgX, imgY) {
            var sqSide = 500;
            var sqDiag = Math.sqrt(2 * sqSide * sqSide);
            var maskSide = 1000;
            if (img.height < img.width) {
                maskSide = Math.abs(img.height - sqDiag);
            } else {
                maskSide = Math.abs(img.width - sqDiag);
            }
            var c = 500;

            ctx.clearRect(0, 0, 1000, 1000);
            
            ctx.beginPath();

            //7 (1)
            ctx.save();
            ctx.translate(c, c);
            ctx.rotate(-90 * (Math.PI / 180));
            ctx.scale(-1, -1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //2 (4)
            ctx.save();
            ctx.translate(c, c);
            ctx.rotate(-90 * (Math.PI / 180));
            ctx.scale(1, -1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //3 (5)
            ctx.save();
            ctx.translate(c, c);
            ctx.rotate(-90 * (Math.PI / 180));
            ctx.scale(1, 1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //8
            ctx.save();
            ctx.translate(c, c);
            ctx.rotate(-90 * (Math.PI / 180));
            ctx.scale(-1, 1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //1
            ctx.save();
            ctx.moveTo(c, c);
            ctx.lineTo(c - sqSide, c);
            ctx.lineTo(c - sqSide, c - sqSide);
            ctx.lineTo(c, c);
            ctx.clip();
            ctx.translate(c, c);
            ctx.scale(-1, -1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //4
            ctx.save();
            ctx.moveTo(c, c);
            ctx.lineTo(c + sqSide, c - sqSide);
            ctx.lineTo(c + sqSide, c);
            ctx.lineTo(c, c);
            ctx.clip();
            ctx.translate(c, c);
            ctx.scale(1, -1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //5
            ctx.save();
            ctx.moveTo(c, c);
            ctx.lineTo(c + sqSide, c);
            ctx.lineTo(c + sqSide, c + sqSide);
            ctx.lineTo(c, c);
            ctx.clip();
            ctx.translate(c, c);
            ctx.scale(1, 1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();
            //8
            ctx.save();
            ctx.moveTo(c, c);
            ctx.lineTo(c - sqSide, c + sqSide);
            ctx.lineTo(c - sqSide, c);
            ctx.lineTo(c, c);
            ctx.clip();
            ctx.translate(c, c);
            ctx.scale(-1, 1);
            ctx.drawImage(img, imgX, imgY, maskSide, maskSide, 0, 0, sqSide, sqSide);
            ctx.restore();

            ctx.closePath();

            //

        },

        cleanUp: function(){
           
        },

		render: function() {

            this.$el.append('What an awesome about page!!');
		}


	});
});
