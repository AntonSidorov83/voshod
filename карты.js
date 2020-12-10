(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"карты_atlas_1", frames: [[0,0,246,225],[0,227,246,224],[0,453,246,224],[248,224,123,123],[419,309,4,4],[425,309,4,4],[248,349,123,123],[373,224,83,83],[431,309,4,4],[373,309,44,42],[248,474,206,53],[0,679,246,224],[248,0,244,222]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_10 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_176 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_175 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.карты_1 = function() {
	this.initialize(img.карты_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,2250);


(lib.CachedBmp_3 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["карты_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Символ16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ16, new cjs.Rectangle(-0.5,-0.5,123,112.5), null);


(lib.Символ3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0,122,111), null);


(lib.Символ17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_8
	this.instance = new lib.Символ16();
	this.instance.setTransform(61.1,-55.8,1,1,0,0,0,61.1,55.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:61,x:61,alpha:0.125},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0},0).wait(51));

	// Слой_1
	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-0.5,-111.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1).wait(59));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-112.1,123,112.5);


(lib.Символ14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_22 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(22).call(this.frame_22).wait(1));

	// Слой_6 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_12 = new cjs.Graphics().p("AoBpCIAAkKIQDAAIAAEKg");
	var mask_graphics_13 = new cjs.Graphics().p("Am1pCIAAkKIQDAAIAAEKg");
	var mask_graphics_14 = new cjs.Graphics().p("AmFpCIAAkKIQDAAIAAEKg");
	var mask_graphics_15 = new cjs.Graphics().p("AlNpCIAAkKIQDAAIAAEKg");
	var mask_graphics_16 = new cjs.Graphics().p("AkYpCIAAkKIQDAAIAAEKg");
	var mask_graphics_17 = new cjs.Graphics().p("AjlpCIAAkKIQDAAIAAEKg");
	var mask_graphics_18 = new cjs.Graphics().p("AiVpCIAAkKIQDAAIAAEKg");
	var mask_graphics_19 = new cjs.Graphics().p("AhhpCIAAkKIQDAAIAAEKg");
	var mask_graphics_20 = new cjs.Graphics().p("AgXpCIAAkKIQDAAIAAEKg");
	var mask_graphics_21 = new cjs.Graphics().p("AgXpCIAAkKIQDAAIAAEKg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_graphics_12,x:46.625,y:-84.5}).wait(1).to({graphics:mask_graphics_13,x:59.025,y:-84.5}).wait(1).to({graphics:mask_graphics_14,x:63.825,y:-84.5}).wait(1).to({graphics:mask_graphics_15,x:69.425,y:-84.5}).wait(1).to({graphics:mask_graphics_16,x:74.75,y:-84.5}).wait(1).to({graphics:mask_graphics_17,x:79.825,y:-84.5}).wait(1).to({graphics:mask_graphics_18,x:87.825,y:-84.5}).wait(1).to({graphics:mask_graphics_19,x:93.025,y:-84.5}).wait(1).to({graphics:mask_graphics_20,x:100.45,y:-84.5}).wait(1).to({graphics:mask_graphics_21,x:100.45,y:-84.5}).wait(2));

	// Штрих_код
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(98.05,-169,0.5,0.5);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).wait(11));

	// Слой_4
	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(81.7,-83.35,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(81.5,-102.85,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_6();
	this.instance_3.setTransform(81.35,-122.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_36();
	this.instance_4.setTransform(81.1,-142.85,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_35();
	this.instance_5.setTransform(81.7,-83.35,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_176();
	this.instance_6.setTransform(81.1,-142.85,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_175();
	this.instance_7.setTransform(81.7,-83.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).to({state:[{t:this.instance_7},{t:this.instance_6}]},1).wait(1));

	// Слой_1
	this.instance_8 = new lib.Символ3();
	this.instance_8.setTransform(61,-56.05,1,1,0,0,0,61,55.5);
	this.instance_8.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({y:-59.4,alpha:0.1143},0).wait(1).to({y:-62.8,alpha:0.2286},0).wait(1).to({y:-66.2,alpha:0.3429},0).wait(1).to({y:-69.55,alpha:0.4571},0).wait(1).to({y:-72.95,alpha:0.5714},0).wait(1).to({y:-76.35,alpha:0.6857},0).wait(1).to({y:-79.75,alpha:0.8},0).wait(16));

	// Слой_1
	this.instance_9 = new lib.CachedBmp_9();
	this.instance_9.setTransform(-0.5,-111.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:true},1).wait(22));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-169,201.4,169.4);


(lib.Символ13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ17();
	this.instance.setTransform(61.1,-55.6,1,1,0,0,0,61.1,-55.6);

	this.instance_1 = new lib.Символ14();
	this.instance_1.setTransform(61.1,-55.6,1,1,0,0,0,61.1,-55.6);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(-0.5,-111.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-112.1,123,112.5);


// stage content:
(lib.карты = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Слой_7
	this.instance = new lib.Символ13();
	this.instance.setTransform(662.6,179.6,1,1,0,0,0,61.1,-55.6);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.Символ13(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Слой_1
	this.instance_1 = new lib.карты_1();
	this.instance_1.setTransform(0,-40,0.32,0.32);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(480,280,480,400);
// library properties:
lib.properties = {
	id: '9045774EE020A9438B141A4F15763C49',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/карты_1.jpg", id:"карты_1"},
		{src:"images/карты_atlas_1.png", id:"карты_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['9045774EE020A9438B141A4F15763C49'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
