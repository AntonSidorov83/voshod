(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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



(lib.карты_1 = function() {
	this.initialize(img.карты_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,2250);// helper functions:

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


(lib.Символ50 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#155DA5").s().p("AiOBjIAIgFIgtg2IgLADIgIgKIAegOIBKAjIABgBIgfglIgLACIgIgKIAmgQIAJAJIgJAGIA2BBIgUAJIhKgiIgBAAIAgAmIAKgDIAJAKIgnARgAg7AmIAqgTIAJAMIgpATgAATAfQgPgEgLgPIgOgPQgMgQACgLQABgMAPgGQANgGAOAEQAOAEAMAQIAOARQAMANgCAMQgCALgNAHQgIADgIAAQgGAAgGgCgAgFgjQgGACABAFQAAAFAIAKIAOASQAHAIAGADQAGADAGgDQAFgCgBgFQAAgGgHgHIgPgTQgIgJgGgDQgDgBgCAAIgFABgAg/AbQgMgDgHgIIgFgHQgFgGAAgFQgBgFADgFQAEgFAHgDQAHgEAIABQAHgBAHAEQAHADAEAGIAGAHQAGAHgBAJQgDAIgKAEQgIAEgHAAIgHgBgAhEgHQgEABAAADQAAADADACIAEAGQADADADABQADABAEgBIAAAAQADgCABgDQAAgCgDgDIgEgFQgDgDgDgCIgDAAIgEABgABYAAQgOgDgMgPIgOgRQgMgPACgMQABgLAOgGQAOgGAPAEQANAFANAPIANAQQALAPgBAMQgCALgNAGQgJADgIAAQgFAAgGgCgABAhCQgGADABAFQAAAEAHAKIAPASQAHAJAHAEQAFACAGgCQAFgDgBgFQAAgFgHgJIgPgTQgHgJgGgCIgGgCIgFABgACQgcIANgIIgngyIgPAHIgIgKIAegUIAzBAIAQgEIAHAKIgwAVg");
	this.shape.setTransform(19.925,10.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ50, new cjs.Rectangle(0,0,39.9,21.9), null);


(lib.Символ48 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#155DA5").s().p("AiOBjIAIgFIgtg2IgLADIgIgKIAegOIBKAjIABgBIgfglIgLACIgIgKIAmgQIAJAJIgJAGIA2BBIgUAJIhKgiIgBAAIAgAmIAKgDIAJAKIgnARgAg7AmIAqgTIAJAMIgpATgAATAfQgPgEgLgPIgOgPQgMgQACgLQABgMAPgGQANgGAOAEQAOAEAMAQIAOARQAMANgCAMQgCALgNAHQgIADgIAAQgGAAgGgCgAgFgjQgGACABAFQAAAFAIAKIAOASQAHAIAGADQAGADAGgDQAFgCgBgFQAAgGgHgHIgPgTQgIgJgGgDQgDgBgCAAIgFABgAg/AbQgMgDgHgIIgFgHQgFgGAAgFQgBgFADgFQAEgFAHgDQAHgEAIABQAHgBAHAEQAHADAEAGIAGAHQAGAHgBAJQgDAIgKAEQgIAEgHAAIgHgBgAhEgHQgEABAAADQAAADADACIAEAGQADADADABQADABAEgBIAAAAQADgCABgDQAAgCgDgDIgEgFQgDgDgDgCIgDAAIgEABgABYAAQgOgDgMgPIgOgRQgMgPACgMQABgLAOgGQAOgGAPAEQANAFANAPIANAQQALAPgBAMQgCALgNAGQgJADgIAAQgFAAgGgCgABAhCQgGADABAFQAAAEAHAKIAPASQAHAJAHAEQAFACAGgCQAFgDgBgFQAAgFgHgJIgPgTQgHgJgGgCIgGgCIgFABgACQgcIANgIIgngyIgPAHIgIgKIAegUIAzBAIAQgEIAHAKIgwAVg");
	this.shape.setTransform(19.925,10.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ48, new cjs.Rectangle(0,0,39.9,21.9), null);


(lib.Символ45 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AzYNdIBGgyImDnPIheAWIhIhYIEAhwIKJEpIADgCIkNlFIheAWIhIhXIFPiUIBIBYIhIAxIHPIyIioBLIqGkmIgDACIEOFFIBdgWIBIBWIlOCVgAoFFKIFoigIBRBiIlpCigACiEQQiBgnhniBIh0iOQhuiFARhjQANhmB8g0QB1g1B+AnQB6AkBtCGIB0CPQBnCBgMBjQgRBgh0A4IgCAAQhIAfhIAAQgxAAgxgOgAg0k3QgwASAEAvQAEAsBABPICDCjQA+BMA2AZQAyAXAvgUIABgBQArgVgCgrQgGgvg9hLIiDikQhBhNgzgXQgdgOgZAAQgWAAgUAKgAosDqQhigXg9hMIgrg1QgrgzgFgwQgHgzAegqQAbgsBCgZQA7gfBFAEQA/gCA6AeQA4AZAqA3IAtA1QA8BIgRBKQgTBFhdAtIAAAAQg/Aag/AAQgfAAgggHgApWhEIgBAAQgfALAAAZQgCAYAWAZIArA1QATAZAgALQAbAHAegKIACgBQAagOAFgVQgBgYgUgZIgqg2QgYgagbgIQgOgGgNAAQgQAAgPAIgAL6ADQh8glhoiCIh0iPQhsiFARhiQANhmB6gwQBzg1CAAlQB5AmBrCFIBwCOQBlCCgMBhQgSBihxA0IgCAAQhIAehIAAQgvAAgwgNgAInpAQgwATAHAuQABArA/BPICCCiQA9BKA2AcQAxAVAugTIABAAQArgVgCgqQgGgvg6hNIiDiiQhAhPgwgVQgdgPgbAAQgWAAgUALgATcj6IB0hGIlTmtIiDA7IhAhTIEAiuIG3IrICJgrIBCBVImeC5g");
	this.shape.setTransform(0.0315,-0.0155,0.1155,0.1155);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-10.9,39.9,21.9);


(lib.Символ44 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#155DA5").s().p("AzBUQIOQm6IIDLJIuSHCgAv1U3IFvICIKMlBIlwn+gAsqVeIGIi/IDdEzImIDAgAEJV5ICChAIiUjMIiCBAIlun7IEAh9IhHhlIB/g+IBKBkIGBi7IhKhjICAg+IhJhkImAC5IBJBkIiBA/IhIhlIiBA/IhJhlIiAA+IBJBlIiCA+IBKBlIiCA+IhIhlIkEB9IhJhkIiCA+IBJBmICChAICSDLIoKD9IiQjMICBg/IBKBlICCg+IhJhmIiDA/IhIhlIEEh+IhJhlIEEh9IBJBlIEDh9IhJhkIEBh8IkimOIiAA9IBJBkIiCA9IhIhjIkCB6IBIBkIECh7IBJBkImEC5IiRjIIkEB8IBJBlIkEB8IhJhkIEEh9IhHhkIMHlxIhIhkICBg9IiQjGICBg8ICPDFICAg9IhIhjICAg9IiQjEIiAA8IBIBjIh/A9IhIhjIB/g9IhHhiIB/g8IhIhiIj/B4IhHhiIiBA9IhHhjIJ+krICPDDIB/g9IBIBiIB/g8ICPDEIh/A8IhHhiIiAA8IEhGJIF9i1IBIBiIj+B5ICRDGIp9EyIBJBjID/h6IBIBjICBg9IBJBjIB/g9IhJhjICAg+IhKhjICAg9IhJhjIB/g9IhIhjIB+g8IhJhiIB+g9IhIhjIB+g8IBJBjIB+g8IhJhiIF4i0IBKBiIh9A7IBIBiIB+g8IBJBhIh+A9IhJhiIh9A8ICSDEIh+A8IBJBjID8h5IBJBiIB/g9IBJBjIh+A9IBKBiIh+A9ICTDGIh+A+IEqGNIB+g+IjfkpIB+g+IhKhjIB+g9IIJK3Ih+A+IhLhkIl8C7IBLBkIj+B9IhLhlIh/A/IBLBlIkAB+IhKhmICAg+IhLhlID/h9IhKhlID+h8IBKBkIB/g+IhKhkIh/A+IhLhkIj9B8IBKBkIn/D6IDfEvIkAB/IhLhmICBg/IjfkvIkAB9IiUjKICAg/IBKBlICAg+IhJhlID/h8IjdksIh/A+IBKBjIiAA+IBJBlIkAB8IBJBlIiAA+IhKhkIiBA+IBKBlICBg/ICTDLIiBA/IEoGXIkDB/gAOICCIDeEsIF9i6IjdkqgAibBlIBJBkID/h8IhJhjgAOXolIBJBiIl9C4IBJBjIh/A9IBJBkIB/g9IhJhkIB/g+IBKBkIB/g9IBJBjID9h7IBKBkIB/g+IhKhjIh/A9IiTjGIhfAuIArBzIh/A9IhKhjICehNIgqhyIBAgfIhJhiIB+g9IiSjEIj9B5IBJBjIB/g9IBJBigAh1lAID+h6IhIhjIh+A9IhJhjIkAB6IBJBjICAg9gArOmyIBIBkICBg+IhJhjgAUmnaIBJBjIB+g8IhKhjgAmWrMIBIBjICAg8IhIhjgAJ6OwICAg/IBKBlIiAA/gA2qLUICDg/IBIBmIiDA/gApFLKICBg/IBJBlIiBA/gA8FHkICDg/IBIBlICCg+IBIBkIiCA/IBIBlIiCA/gA2qLUgAGcKBgAX5H6gA02GNICCg+IBIBkIiCA/gAsgGbIhIhlICBg9IBJBkIiCA+gA+VEaICCg+IBIBlIiCA+gA7LFBgARSCoIB+g+IBLBkIiAA+gAquBXICBg+IBIBjIiBA/gEgnPgIFIOKmpIH1K0IuNGvgEgkGgHfIFkHyIKJkzIllnwgEgg9gG4IGEi4IDXEqImFC4gAa1mOIB9g9IBLBjIh+A9gAwYmbICCg9IBHBjIiAA+gAtPl1gAynphIEBh5IBIBiIkBB6gAQVpigAtep4gAXYq1IhJhiIB9g9IBJBiIh9A9gA3FvrICBg8ICODEICBg8IBHBiIkAB5gAgYuBIB+g8IBIBhIh/A9gAjK5CINvmeIH6KkItyGkgAgE4dIFnHnIJ2krIlqnkgADB33IF5iyIDZEjIl6CzgAk40JIhIhgIB/g9IBHBiIh+A7g");
	this.shape.setTransform(61.6479,49.4929,0.2454,0.2454);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ44, new cjs.Rectangle(0,0,123.3,99), null);


(lib.Символ42 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AirHvIm9puIMOlvIHDJZg");
	this.shape.setTransform(61.65,49.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("Apoh/IMOlvIHCJZIsTGEg");
	this.shape_1.setTransform(61.65,49.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ42, new cjs.Rectangle(-1,-1,125.3,101), null);


(lib.Символ38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("A8+JyMA04gaKIFFF2Mg1WAa7g");
	this.shape.setTransform(185.475,104.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("A8+JyMA04gaKIFFF2Mg1WAa6g");
	this.shape_1.setTransform(185.475,104.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ38, new cjs.Rectangle(-1,-1,373,211.7), null);


(lib.Символ36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("A3AGWMA0zgaLIFHGCMg1OAa2gEgi5ADeIHeAAIAAQYIneAAg");
	this.shape.setTransform(223.425,127.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("A89JvMA0zgaLIFIGCMg1PAa3g");
	this.shape_1.setTransform(261.5,105.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ36, new cjs.Rectangle(-1,-1,448.9,256.1), null);


(lib.Символ30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AA2AAQAAAXgPAQQgQAPgXAAQgWAAgQgPQgPgQAAgXQAAgWAPgQQAQgQAWAAQAXAAAQAQQAPAQAAAWg");
	this.shape.setTransform(5.45,5.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgmAmQgPgQAAgWQAAgWAPgPQARgQAVgBQAXABAPAQQAQAPABAWQgBAWgQAQQgPARgXgBQgVABgRgRg");
	this.shape_1.setTransform(5.45,5.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ30, new cjs.Rectangle(-1,-1,12.9,12.9), null);


(lib.Символ27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("ABQAAQAAAhgYAXQgXAXghAAQggAAgYgXQgXgXAAghQAAggAXgYQAYgXAgAAQAhAAAXAXQAYAYAAAgg");
	this.shape.setTransform(7.95,7.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag4A4QgWgXAAghQAAggAWgXQAYgYAgAAQAhAAAXAYQAYAXAAAgQAAAhgYAXQgXAYghAAQggAAgYgYg");
	this.shape_1.setTransform(7.95,7.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ27, new cjs.Rectangle(-1,-1,17.9,17.9), null);


(lib.Символ23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#155DA5").s().p("AAiBlIhphUIhghKIA5gcIC1CTIhTjBIA4gcIB8EhIg9Aeg");
	this.shape.setTransform(5.36,-5.1015,0.319,0.319);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("AAACJIgEgBQgZgJgYgUQgagWgcgkQgSgXgMgUQgMgSgEgPQgJggAMgZQAOgdAjgQQAZgMAbgBQAbgBAWAHIADABQAaAJAYAUQAXAUAeAmQARAVAOAWQALASAFAPQALAggOAaQgOAbgiARQgaALgbACIgIAAQgVAAgUgGgAhHhbQgYALAAAZQAAANALAUQAJASAXAdQATAYARAQQAJAJAHAFIAOAJQAPAIAPABQAPABANgGQAXgLAAgZQAAgMgLgVQgKgUgXgcQgRgWgTgRIgPgOQgHgGgHgEQgRgJgQAAQgMAAgMAGg");
	this.shape_1.setTransform(15.6251,-8.8083,0.319,0.319);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#155DA5").s().p("AgGCPIgqgKIAWgtQAbAJAMACQAiAEAVgLQAZgMAEgTQAEgOgLgPQgJgLgPgDQgNgEgoABIgyACQhOABgeglQgWgcAKgeQALggApgTQAygZBQANIgJAsIgmgDQgggBgUAJQgQAIgGANQgFANAJALQAOASAugBIAtgBQA5gBAcAIQAbAHATAXQAVAbgEAdQgGAog2AZQgjARgoAAQgQAAgQgCg");
	this.shape_2.setTransform(24.4847,-13.0714,0.319,0.319);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#155DA5").s().p("AhdAtIgngwIhAhLIA5gbIAKANIAEAFIBBBWIBVgpIhThlIA4gbIANASIAtA7ICNCrIg5AbIgJgNIgEgFIhJhdIhUAoIBaBtIg5Acg");
	this.shape_3.setTransform(33.2685,-17.321,0.319,0.319);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#155DA5").s().p("AAACHIgCgBQgbgJgWgTQgZgUgdgmQgOgQgSgaQgJgOgGgTQgKgfAMgZQANgcAjgRQAZgMAbAAQAbgCAXAIIACABQAZAJAYATQAZAVAdAlQAQATAPAXQAMASAFAOQAKAhgNAZQgOAbghAQQgYALgcADIgGAAQgZAAgUgHgAhIhaQgXALAAAYQAAAOALAUQALATAWAaQATAYAQAQIAQAOQAHAFAIAEQAPAIAPABQAPABANgGQAWgMAAgYQAAgNgLgTQgMgWgWgZQgRgVgTgSQgIgJgGgEQgHgGgIgFQgRgJgQAAQgMAAgMAGg");
	this.shape_4.setTransform(41.8986,-21.4307,0.319,0.319);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#155DA5").s().p("AiuhdIBRgnQAngSAfgBQASgBAQAEQAcAHAbAUQAdAVAeAlQAeAlANAfQAMAfgJAWQgMAfg1AZIhRAngAhChfIgZAMICMCuIAZgMQAjgRAEgSQADgNgKgUQgKgUgZgfQgUgXgTgSQgLgLgKgFIgKgFQgKgFgMAAQgUAAgZAMg");
	this.shape_5.setTransform(50.3074,-25.2123,0.319,0.319);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#155DA5").s().p("AAVCHIgVgGQgSgHgSgOQgNgJgQgRQgTgUgOgRQgRgUgOgWQgNgTgEgNQgLgeALgZQALgaAhgQQAZgMAdABQAZAAAXAJIAIAEQAXAKAUATQATAQAdAjQATAXAMATQALAPAGAQQAMAfgMAZQgMAagfAPQgZAMgdAAQgOAAgPgDgAhJhZQgPAHgDAQQgCAPALAVQAKATAcAhQAVAaAUASIADADQAPANAPAGQAaAJARgIQAPgHADgRQACgOgLgVQgNgWgZgeQgWgagUgSIgCgCQgOgOgQgGQgOgFgLAAQgKAAgIAEg");
	this.shape_6.setTransform(76.8861,-38.1391,0.319,0.319);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#155DA5").s().p("AAWCHQgKgCgMgFQgUgIgPgMQgMgJgRgRQgPgOgTgXQgRgWgOgUQgNgTgEgNQgLgfAKgYQAMgbAggPQAYgMAfABQAZAAAXAKIAIADQAWALAUASQAVASAcAhQAQAUAPAWQALAPAGAQQALAfgKAYQgNAbgeAPQgaAMgcAAQgPAAgOgDgAhJhZQgQAIgCAQQgCANALAWQAKATAcAhQAVAZAUATIADACQAQAOAOAGQAaAKASgJQAOgHADgRQABgPgKgUQgKgSgdgiQgWgagTgSIgCgCQgQgOgPgGQgNgEgLAAQgKAAgIADg");
	this.shape_7.setTransform(85.6859,-42.2557,0.319,0.319);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#155DA5").s().p("AgNB1IA5gbIiNipIgxArIgggmIBZhOIC3DaIA3gbIAeAkIikBOg");
	this.shape_8.setTransform(94.3818,-46.2106,0.319,0.319);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-51.1,100.1,51.1);


(lib.Символ16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// barcode_plate
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AkDotIlfCeINmO9IFfitg");
	this.shape.setTransform(61.075,55.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("ApimQIFfidINmOuIlfCtg");
	this.shape_1.setTransform(61.075,55.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ16, new cjs.Rectangle(-1,-1,124.2,113.6), null);


(lib.Символ3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#155DA5").s().p("AD2IgIFjimIAJAKIljCmgADkINIFjinIAJAKIljCngADFHrIFjimIAVAXIliCngAChHDIFhimIAKAKIliCmgACGGlIFhimIASAUIlhCmgABfF7IFgimIAKAKIlhCmgABEFdIFgimIAJAKIlgClgAAdEyIFgilIAJAKIlgClgAgPEBIFeikIAbAdIlfCkgAggDtIFdijIAJAJIldCkgAg+DNIFcikIATATIleClgAhiCmIFcijIAJAJIlcCkgAiIB8IFciiIAeAgIldCigAiiBfIFbiiIAJAJIlcCjgAi0BMIFciiIAIAKIlbChgAjIA2IFbiiIAMANIlcChgAjrAPIFaiiIAbAdIlbCigAkGgNIFbiiIAJAJIlbCjgAkrg2IFZiiIAaAdIlZCigAlFhTIFZihIAIAJIlYCigAlhhyIFYihIAUAVIlZCigAmEiYIFYihIASATIlZChgAmpjBIFYihIAdAgIlZChgAnDjdIFYihIAIAKIlYChgAndj5IFYigIARASIlYChgAoBkiIFWifIARASIlXCggAoSk0IFWigIAJAKIlXCfgAo0lZIFWigIAIAJIlWCggApQl4IFVigIAJAKIlWCggAphmKIFVigIAIAJIlVCgg");
	this.shape.setTransform(61,55.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0,122,110.9), null);


(lib.Символ47 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ48();
	this.instance.setTransform(0,0.05,1,1,0,0,0,19.9,11);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59).to({_off:false},0).wait(1).to({regY:10.9,y:-0.05,alpha:0.08},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0},0).wait(52));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-10.9,39.9,21.9);


(lib.Символ40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_44 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_45 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_46 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_47 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_48 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_49 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_50 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_51 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_52 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_53 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_54 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_55 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_56 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_57 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_58 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_59 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_60 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_61 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_62 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_63 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_64 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_65 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_66 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_67 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_68 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_69 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_70 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_71 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_72 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_73 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_74 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_75 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_76 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_77 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_78 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_79 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_80 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_81 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_82 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_83 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_84 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_85 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_86 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_87 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_88 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_89 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_90 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_91 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_92 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_93 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_94 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_95 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_96 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_97 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_98 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_99 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_100 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_101 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_102 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_103 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_104 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_105 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_106 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_107 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_108 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_109 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_110 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_111 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_112 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_113 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_114 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_115 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_116 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_117 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_118 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");
	var mask_graphics_119 = new cjs.Graphics().p("AjzNkIAA7HIHnAAIAAbHg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(44).to({graphics:mask_graphics_44,x:-97.4997,y:2.65}).wait(1).to({graphics:mask_graphics_45,x:-76.5333,y:2.65}).wait(1).to({graphics:mask_graphics_46,x:-55.5669,y:2.65}).wait(1).to({graphics:mask_graphics_47,x:-34.6001,y:2.65}).wait(1).to({graphics:mask_graphics_48,x:-13.6332,y:2.65}).wait(1).to({graphics:mask_graphics_49,x:7.3332,y:2.65}).wait(1).to({graphics:mask_graphics_50,x:28.3,y:2.65}).wait(1).to({graphics:mask_graphics_51,x:49.2669,y:2.65}).wait(1).to({graphics:mask_graphics_52,x:70.2333,y:2.65}).wait(1).to({graphics:mask_graphics_53,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_54,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_55,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_56,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_57,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_58,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_59,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_60,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_61,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_62,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_63,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_64,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_65,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_66,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_67,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_68,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_69,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_70,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_71,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_72,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_73,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_74,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_75,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_76,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_77,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_78,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_79,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_80,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_81,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_82,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_83,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_84,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_85,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_86,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_87,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_88,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_89,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_90,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_91,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_92,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_93,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_94,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_95,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_96,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_97,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_98,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_99,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_100,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_101,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_102,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_103,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_104,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_105,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_106,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_107,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_108,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_109,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_110,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_111,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_112,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_113,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_114,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_115,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_116,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_117,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_118,x:91.1997,y:2.65}).wait(1).to({graphics:mask_graphics_119,x:91.1997,y:2.65}).wait(1));

	// Слой_1
	this.instance = new lib.Символ42();
	this.instance.setTransform(-0.05,0.05,1,1,0,0,0,61.6,49.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(44).to({_off:false},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0},0).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.6,-50.4,125.30000000000001,100.9);


(lib.Символ34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_29 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_30 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_31 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_32 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_33 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_34 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_35 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_36 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_37 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_38 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_39 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_40 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_41 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_42 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_43 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_44 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_45 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_46 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_47 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_48 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_49 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_50 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_51 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_52 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_53 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_54 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_55 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_56 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_57 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_58 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_59 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_60 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_61 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_62 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_63 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_64 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_65 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_66 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_67 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_68 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_69 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_70 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_71 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_72 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_73 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_74 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_75 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_76 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_77 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_78 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_79 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_80 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_81 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_82 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_83 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_84 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_85 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_86 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_87 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_88 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_89 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_90 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_91 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_92 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_93 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_94 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_95 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_96 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_97 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_98 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_99 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_100 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_101 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_102 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_103 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_104 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_105 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_106 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_107 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_108 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_109 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_110 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_111 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_112 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_113 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_114 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_115 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_116 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_117 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_118 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");
	var mask_graphics_119 = new cjs.Graphics().p("AmLMAIAA3/IMXAAIAAX/g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(29).to({graphics:mask_graphics_29,x:-226.4423,y:98.699}).wait(1).to({graphics:mask_graphics_30,x:-180.7124,y:77.089}).wait(1).to({graphics:mask_graphics_31,x:-134.982,y:55.4791}).wait(1).to({graphics:mask_graphics_32,x:-89.2521,y:33.8692}).wait(1).to({graphics:mask_graphics_33,x:-43.5222,y:12.2594}).wait(1).to({graphics:mask_graphics_34,x:2.2081,y:-9.351}).wait(1).to({graphics:mask_graphics_35,x:47.938,y:-30.9609}).wait(1).to({graphics:mask_graphics_36,x:93.6679,y:-52.5708}).wait(1).to({graphics:mask_graphics_37,x:139.3979,y:-74.1807}).wait(1).to({graphics:mask_graphics_38,x:185.1278,y:-95.7906}).wait(1).to({graphics:mask_graphics_39,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_40,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_41,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_42,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_43,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_44,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_45,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_46,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_47,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_48,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_49,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_50,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_51,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_52,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_53,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_54,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_55,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_56,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_57,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_58,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_59,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_60,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_61,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_62,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_63,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_64,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_65,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_66,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_67,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_68,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_69,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_70,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_71,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_72,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_73,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_74,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_75,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_76,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_77,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_78,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_79,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_80,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_81,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_82,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_83,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_84,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_85,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_86,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_87,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_88,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_89,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_90,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_91,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_92,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_93,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_94,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_95,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_96,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_97,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_98,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_99,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_100,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_101,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_102,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_103,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_104,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_105,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_106,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_107,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_108,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_109,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_110,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_111,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_112,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_113,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_114,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_115,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_116,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_117,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_118,x:230.8577,y:-117.401}).wait(1).to({graphics:mask_graphics_119,x:230.8577,y:-117.401}).wait(1));

	// Слой_1
	this.instance = new lib.Символ36();
	this.instance.setTransform(-38.1,21.75,1,1,0,0,0,223.4,127);
	this.instance.alpha = 0;
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0},0).wait(81));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-262,-106.2,448.4,256);


(lib.Символ31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ30();
	this.instance.setTransform(0.05,0.05,1,1,0,0,0,5.5,5.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-5.9,11.9,11.9);


(lib.Символ28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ27();
	this.instance.setTransform(0.05,0.05,1,1,0,0,0,8,8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.4,-8.4,16.9,16.9);


(lib.Символ24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// embos_typewrite_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_18 = new cjs.Graphics().p("EgjLgLqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_19 = new cjs.Graphics().p("EghGgLqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_20 = new cjs.Graphics().p("A/BrqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_21 = new cjs.Graphics().p("A88rqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_22 = new cjs.Graphics().p("A63rqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_23 = new cjs.Graphics().p("A4yrqIAAkKMAqgAAAIAAEKg");
	var mask_graphics_24 = new cjs.Graphics().p("A2trqIAAkKMAqfAAAIAAEKg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(18).to({graphics:mask_graphics_18,x:-225.2,y:-101.35}).wait(1).to({graphics:mask_graphics_19,x:-211.9083,y:-101.35}).wait(1).to({graphics:mask_graphics_20,x:-198.6167,y:-101.35}).wait(1).to({graphics:mask_graphics_21,x:-185.325,y:-101.35}).wait(1).to({graphics:mask_graphics_22,x:-172.0333,y:-101.35}).wait(1).to({graphics:mask_graphics_23,x:-158.7417,y:-101.35}).wait(1).to({graphics:mask_graphics_24,x:-145.45,y:-101.35}).wait(1));

	// embos_text_2
	this.text = new cjs.Text("(выдавленные символы)", "20px 'AGGloria'");
	this.text.textAlign = "right";
	this.text.lineHeight = 25;
	this.text.lineWidth = 296;
	this.text.parent = this;
	this.text.setTransform(-20,-200.7);
	this.text._off = true;

	var maskedShapeInstanceList = [this.text];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.text).wait(18).to({_off:false},0).wait(7));

	// embos_typewrite (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_12 = new cjs.Graphics().p("A/utmIAAkLMAjkAAAIAAELg");
	var mask_1_graphics_13 = new cjs.Graphics().p("A9ptmIAAkLMAjkAAAIAAELg");
	var mask_1_graphics_14 = new cjs.Graphics().p("A7ktmIAAkLMAjkAAAIAAELg");
	var mask_1_graphics_15 = new cjs.Graphics().p("A5ftmIAAkLMAjkAAAIAAELg");
	var mask_1_graphics_16 = new cjs.Graphics().p("A3ZtmIAAkLMAjjAAAIAAELg");
	var mask_1_graphics_17 = new cjs.Graphics().p("A1UtmIAAkLMAjjAAAIAAELg");
	var mask_1_graphics_18 = new cjs.Graphics().p("AzPtmIAAkLMAjjAAAIAAELg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_1_graphics_12,x:-203.075,y:-113.75}).wait(1).to({graphics:mask_1_graphics_13,x:-189.7667,y:-113.75}).wait(1).to({graphics:mask_1_graphics_14,x:-176.4583,y:-113.75}).wait(1).to({graphics:mask_1_graphics_15,x:-163.15,y:-113.75}).wait(1).to({graphics:mask_1_graphics_16,x:-149.8417,y:-113.75}).wait(1).to({graphics:mask_1_graphics_17,x:-136.5333,y:-113.75}).wait(1).to({graphics:mask_1_graphics_18,x:-123.225,y:-113.75}).wait(7));

	// emboss_text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgjAnQgLgOAAgZQAAgHACgJQACgIAEgHQAGgLAKgGQALgFAMgBQAIAAAIACQAHADAFAEQAHAGADAGQAEAHACAJQACAJAAAJIAAADIhMAAQAAAIACAHQACAHAFAGQAFAGAGACQAFACAHAAQAKAAAIgGQAIgHABgIIAPAAQgCAQgNAIQgMAJgRAAQgYAAgMgPgAgUgfQgJAKABAOIA5AAQABgNgIgKQgHgLgOAAQgNAAgIAKg");
	this.shape.setTransform(-26.15,-212.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAGA0IAAgMIASAAIAAhIIgrBUIgUAAIAAhbIgRAAIAAgMIAyAAIAAAMIgRAAIAABFIAphRIAnAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_1.setTransform(-37.65,-212.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAHA0IAAgMIAQAAIAAgiIgtAAIAAAiIAQAAIAAAMIgyAAIAAgMIARAAIAAhPIgRAAIAAgMIAyAAIAAAMIgQAAIAAAhIAtAAIAAghIgQAAIAAgMIAyAAIAAAMIgSAAIAABPIASAAIAAAMg");
	this.shape_2.setTransform(-49.85,-212.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgkAyQgIgGgEgLIgBgHIAAgDQAAgRAMgIQALgHARAAIALAAIAQAAIAAgKQAAgFgCgEQgBgEgEgEQgCgDgFgBIgIgBQgHAAgEABQgFACgEAFQgCACgBADIgBAHIgRAAQAAgLAGgIQAFgHAMgFQADgBAFAAIAKgBQAIAAAGACQAHADAGAEQAGAFACAHQACAFAAAJIAAA8IAQAAIAAAMIgfAAIAAgUQgFALgIAFQgHAGgNgBQgNAAgIgEgAgUAFQgLAEAAAOQAAAJAEAFQAFAFAJAAQAQAAAIgMQAHgLAAgQIgIgBIgIgBQgQABgGADg");
	this.shape_3.setTransform(-61.2,-212.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgtA0IAAgMIAQAAIAAhPIgQAAIAAgMIA4AAIALABQAGAAADACQAGADADAHQAEAGAAAIQAAAJgGAFQgFAHgKABQALACAGAGQAGAHABAJQgBAHgCAFQgCAFgEAEQgJAJgTAAgAgMAoIASAAIAJgBIAHgDQAEgCACgEQACgEAAgEQAAgGgCgDQgCgEgDgBQgCgCgEgBIgJAAIgUAAgAgMgGIAQAAIAKgBQAEgBACgCQAIgEAAgKQAAgKgIgDQgCgCgEAAIgGAAIgDAAIgRAAg");
	this.shape_4.setTransform(-72.7,-212.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgUAzQgJgEgHgKQgGgIgCgKQgDgKAAgKQAAgLADgJQACgKAHgHQAHgIAKgDQAKgFAJAAQAXABANAPQALAPAAAXQAAAYgMAOQgNAQgXAAQgLAAgJgDgAgOgmQgGAEgFAHQgDAGgBAHQgCAHAAAHQAAAJACAHQABAHAEAGQAFAFAGAFQAHADAGAAQAHAAAIgFQAGgEAEgHQADgGABgGQACgHAAgHQAAgRgGgLQgIgNgRAAQgHAAgHADg");
	this.shape_5.setTransform(-83.3,-212.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag3BGIAAgMIARAAIAAhwIgRAAIAAgMIAiAAIAAAUQAFgMAJgGQAIgFANAAQANAAAHAFQAJAFAHANQADAHABAHIABARQAAALgBAIQgDAKgFAIQgHAIgHAEQgIAFgKAAQgNAAgIgFQgJgFgFgLIAAAoIARAAIAAAMgAgPgqQgEAGgBAGQgCAHABAIQgBAJACAGQACAHAEAGQADAGAHAEQAEAEAIAAQAPAAAJgOQAHgLAAgPQAAgJgCgIQgBgGgDgHQgEgGgGgFQgHgDgHAAQgPAAgJAPg");
	this.shape_6.setTransform(-95.15,-210.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAGA0IAAgMIASAAIAAhIIgsBUIgTAAIAAhbIgRAAIAAgMIAyAAIAAAMIgRAAIAABFIAphRIAnAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_7.setTransform(-107.2,-212.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgfAnQgMgPAAgXQAAgKACgKQADgJAHgKQAGgGAIgFQAJgEAJgBQAKABAHADQAHAEAFAIIAAgMIANAAIAAAmIgNAAQAAgMgHgIQgHgJgLABQgPAAgIAMQgHALAAARQAAAHABAHQACAHAEAHQAJAOANAAQAKAAAHgIQAHgGABgLIAPAAQAAARgMAKQgMAKgRAAQgVAAgNgPg");
	this.shape_8.setTransform(-118.15,-212.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgfAnQgMgPAAgXQAAgKACgKQADgJAHgKQAFgGAJgFQAJgEAJgBQAJABAIADQAHAEAFAIIAAgMIANAAIAAAmIgNAAQAAgMgHgIQgHgJgLABQgPAAgIAMQgIALABARQAAAHACAHQABAHAEAHQAJAOANAAQALAAAGgIQAHgGABgLIAPAAQAAARgMAKQgMAKgRAAQgVAAgNgPg");
	this.shape_9.setTransform(-128.15,-212.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgUAzQgKgEgGgKQgGgIgDgKQgCgKAAgKQAAgLACgJQADgKAHgHQAHgIAKgDQAJgFAKAAQAYABAMAPQAMAPAAAXQAAAYgNAOQgNAQgXAAQgLAAgJgDgAgNgmQgHAEgFAHQgDAGgBAHQgCAHABAHQgBAJACAHQACAHAEAGQAEAFAHAFQAGADAGAAQAHAAAIgFQAGgEAEgHQADgGACgGQABgHAAgHQAAgRgHgLQgIgNgQAAQgIAAgFADg");
	this.shape_10.setTransform(-138.8,-212.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgUBMQgJgEgHgJQgMgRABgVQAAgsAMgVQAKgTAXgGQASgFAHgDQAHgDABgDIAMAAQgCAMgIAGQgIAGgYAGQgPAEgIAJQgIAKgEAQQAIgIAJgFQAJgFALAAQAWAAAMAQQALAOAAAYQAAAXgMAPQgNAQgXAAQgLAAgJgEgAgOgMQgGAEgFAHQgDAFgBAHQgCAHAAAHQAAAKACAHQABAHAEAGQAFAFAGAEQAHAEAGAAQAHAAAIgFQAGgEAEgHQADgGABgHQACgGAAgIQAAgRgGgKQgIgNgRAAQgHAAgHADg");
	this.shape_11.setTransform(-149.9,-214.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAVA0IAAgMIAQAAIAAhJIgfBVIgMAAIgfhVIAABJIARAAIAAAMIgwAAIAAgMIARAAIAAhPIgRAAIAAgMIAqAAIAaBSIAchSIApAAIAAAMIgQAAIAABPIAQAAIAAAMg");
	this.shape_12.setTransform(-162.925,-212.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgsA9QgPgOAAgYIASAAQAAARAKAJQALAKARAAQAVAAANgQQAJgOABgXIg3AAIAAgNIA3AAQgBgXgKgOQgNgPgWAAQgRAAgLALQgLALAAARIgPAAIAAgyIAOAAIAAAUQAGgMALgGQALgFAPAAQAdAAARAVQAQATAAAhQAAAPgDANQgEANgIALQgJALgMAGQgNAFgOAAQgaAAgPgNg");
	this.shape_13.setTransform(-177.5,-214);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).wait(13));

	// emboss_arrow_mask (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_3 = new cjs.Graphics().p("AgiAjIAAhFIBFAAIAABFg");
	var mask_2_graphics_4 = new cjs.Graphics().p("AgiEsIAApXIBFAAIAAJXg");
	var mask_2_graphics_5 = new cjs.Graphics().p("AgiI2IAAxrIBFAAIAARrg");
	var mask_2_graphics_6 = new cjs.Graphics().p("AgiM/IAA59IBFAAIAAZ9g");
	var mask_2_graphics_7 = new cjs.Graphics().p("AlSM/IAA59IKlAAIAAZ9g");
	var mask_2_graphics_8 = new cjs.Graphics().p("AqCM/IAA59IUFAAIAAZ9g");
	var mask_2_graphics_9 = new cjs.Graphics().p("AuyM/IAA59IdlAAIAAZ9g");
	var mask_2_graphics_10 = new cjs.Graphics().p("AziM/IAA59MAnFAAAIAAZ9g");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_2_graphics_3,x:-12.9753,y:-14.8248}).wait(1).to({graphics:mask_2_graphics_4,x:-12.9753,y:-41.3658}).wait(1).to({graphics:mask_2_graphics_5,x:-12.9753,y:-67.9073}).wait(1).to({graphics:mask_2_graphics_6,x:-12.9753,y:-94.4478}).wait(1).to({graphics:mask_2_graphics_7,x:-43.3814,y:-94.4478}).wait(1).to({graphics:mask_2_graphics_8,x:-73.7879,y:-94.4478}).wait(1).to({graphics:mask_2_graphics_9,x:-104.1939,y:-94.4478}).wait(1).to({graphics:mask_2_graphics_10,x:-134.6004,y:-94.4478}).wait(15));

	// emboss_arrow
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AJZAEIAAAAIAAgHIAAAAAJKgDIyiAAApYAEISiAA");
	this.shape_14.setTransform(-72.775,-77.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(0,0,0,0)").ss(0.8,1,1).p("AgCERIAFABIAAok");
	this.shape_15.setTransform(-12.975,-49.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("ATNMBIgCAAIAA36MgmdAAAIAAgIMAmlAAAIAAPYIAAAHIAAIjg");
	this.shape_16.setTransform(-136.225,-99.25);

	var maskedShapeInstanceList = [this.shape_14,this.shape_15,this.shape_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},3).wait(22));

	// emboss_flash___копия
	this.instance = new lib.Символ23("synched",0);
	this.instance.setTransform(51.05,-27.45,1,1,0,0,0,50.1,-25.6);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.0247,scaleY:1.0245,x:50.05,y:-33.2,alpha:0.25},0).wait(1).to({scaleX:1.0495,scaleY:1.0489,x:49,y:-38.95,alpha:0.5},0).wait(1).to({scaleX:1.0742,scaleY:1.0734,x:47.95,y:-44.7,alpha:0.75},0).wait(1).to({scaleX:1.0989,scaleY:1.0978,x:46.9,y:-50.45,alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// emboss_arrow_start
	this.instance_1 = new lib.Символ31("synched",0);
	this.instance_1.setTransform(-13,-22.2,0.0917,0.0917);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1).to({scaleX:0.7338,scaleY:0.7338},0).wait(1).to({scaleX:1.3758,scaleY:1.3758},0).wait(1).to({scaleX:1.1465,scaleY:1.1465},0).wait(1).to({scaleX:0.9172,scaleY:0.9172},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-318.8,-227.5,420.70000000000005,225.7);


(lib.Символ22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// emboss_flash
	this.instance = new lib.Символ23("synched",0);
	this.instance.setTransform(51.05,-27.45,1,1,0,0,0,50.1,-25.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-52.9,101.1,52.9);


(lib.Символ21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ22();
	this.instance.setTransform(50.8,-26.9,1,1,0,0,0,50.8,-26.9);

	this.instance_1 = new lib.Символ24();
	this.instance_1.setTransform(50.8,-26.9,1,1,0,0,0,50.8,-26.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("An7C2IOsnCIBLBUIuuHFg");
	this.shape.setTransform(50.8,-26.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#155DA5").s().p("An7C2IOsnCIBLBUIuuHFg");
	this.shape_1.setTransform(50.8,-26.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-54.7,103.6,55.7);


(lib.Символ17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_1 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_2 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_3 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_4 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_5 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_6 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_7 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_8 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_9 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_10 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_11 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_12 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_13 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_14 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_15 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_16 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_17 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_18 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_19 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_20 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_21 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_22 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_23 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_24 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_25 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_26 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_27 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_28 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_29 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_30 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_31 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_32 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_33 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_34 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_35 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_36 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_37 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_38 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_39 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_40 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_41 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_42 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_43 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_44 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_45 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_46 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_47 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_48 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_49 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_50 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_51 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_52 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_53 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_54 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_55 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_56 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_57 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_58 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_59 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_60 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_61 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_62 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_63 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_64 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_65 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_66 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_67 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_68 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_69 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_70 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_71 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_72 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_73 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_74 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_75 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_76 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_77 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_78 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_79 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_80 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_81 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_82 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_83 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_84 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_85 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_86 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_87 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_88 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_89 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_90 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_91 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_92 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_93 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_94 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_95 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_96 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_97 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_98 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_99 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_100 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_101 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_102 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_103 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_104 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_105 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_106 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_107 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_108 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_109 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_110 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_111 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_112 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_113 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_114 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_115 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_116 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_117 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_118 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");
	var mask_graphics_119 = new cjs.Graphics().p("AvTDrIAAnVIenAAIAAHVg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:141.0251,y:17.55}).wait(1).to({graphics:mask_graphics_1,x:125.2472,y:-0.0054}).wait(1).to({graphics:mask_graphics_2,x:109.4697,y:-17.5608}).wait(1).to({graphics:mask_graphics_3,x:93.6918,y:-35.1167}).wait(1).to({graphics:mask_graphics_4,x:77.9139,y:-52.6725}).wait(1).to({graphics:mask_graphics_5,x:62.136,y:-70.2279}).wait(1).to({graphics:mask_graphics_6,x:46.3581,y:-87.7833}).wait(1).to({graphics:mask_graphics_7,x:30.5806,y:-105.3387}).wait(1).to({graphics:mask_graphics_8,x:14.8027,y:-122.8941}).wait(1).to({graphics:mask_graphics_9,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_10,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_11,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_12,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_13,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_14,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_15,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_16,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_17,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_18,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_19,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_20,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_21,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_22,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_23,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_24,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_25,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_26,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_27,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_28,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_29,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_30,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_31,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_32,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_33,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_34,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_35,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_36,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_37,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_38,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_39,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_40,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_41,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_42,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_43,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_44,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_45,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_46,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_47,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_48,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_49,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_50,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_51,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_52,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_53,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_54,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_55,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_56,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_57,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_58,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_59,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_60,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_61,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_62,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_63,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_64,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_65,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_66,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_67,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_68,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_69,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_70,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_71,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_72,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_73,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_74,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_75,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_76,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_77,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_78,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_79,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_80,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_81,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_82,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_83,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_84,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_85,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_86,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_87,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_88,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_89,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_90,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_91,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_92,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_93,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_94,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_95,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_96,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_97,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_98,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_99,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_100,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_101,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_102,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_103,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_104,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_105,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_106,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_107,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_108,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_109,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_110,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_111,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_112,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_113,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_114,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_115,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_116,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_117,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_118,x:-0.9747,y:-140.45}).wait(1).to({graphics:mask_graphics_119,x:-0.9747,y:-140.45}).wait(1));

	// barcode_plate_animat
	this.instance = new lib.Символ16();
	this.instance.setTransform(61.1,-55.8,1,1,0,0,0,61.1,55.8);
	this.instance.alpha = 0;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.32},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.16},0).wait(1).to({alpha:0.08},0).wait(1).to({alpha:0},0).wait(111));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-112.6,124.2,113.6);


(lib.Символ49 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// mstripe_typewrite (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_12 = new cjs.Graphics().p("A88iuIAAkLMAjjAAAIAAELg");
	var mask_graphics_13 = new cjs.Graphics().p("A7aivIAAkKMAjkAAAIAAEKg");
	var mask_graphics_14 = new cjs.Graphics().p("A53ivIAAkKMAjkAAAIAAEKg");
	var mask_graphics_15 = new cjs.Graphics().p("A4UivIAAkKMAjjAAAIAAEKg");
	var mask_graphics_16 = new cjs.Graphics().p("A2xivIAAkKMAjjAAAIAAEKg");
	var mask_graphics_17 = new cjs.Graphics().p("A1PivIAAkLMAjkAAAIAAELg");
	var mask_graphics_18 = new cjs.Graphics().p("AzsivIAAkLMAjkAAAIAAELg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_graphics_12,x:-185.325,y:-44.2}).wait(1).to({graphics:mask_graphics_13,x:-175.4542,y:-44.2125}).wait(1).to({graphics:mask_graphics_14,x:-165.5833,y:-44.225}).wait(1).to({graphics:mask_graphics_15,x:-155.7125,y:-44.2375}).wait(1).to({graphics:mask_graphics_16,x:-145.8417,y:-44.25}).wait(1).to({graphics:mask_graphics_17,x:-135.9708,y:-44.2625}).wait(1).to({graphics:mask_graphics_18,x:-126.1,y:-44.275}).wait(7));

	// mstripe_text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABA0IAAgMIARAAIAAghIgSAAQgHAAgEADQgEADgCAIIgJAfIgYAAIAAgMIALAAIAGgWQACgHAEgDQADgEAGgCQgLgCgFgGQgFgGAAgMQAAgHADgGQADgGAFgEQAFgCAGgBIANgBIADAAIA0AAIAAAMIgRAAIAABPIARAAIAAAMgAgMgnQgDAAgCADQgDACgBAEQgCADAAAFQAAAEACAEQABAEADACQADACAFABIAKABIARAAIAAgjIgUAAIgKAAg");
	this.shape.setTransform(-37.575,-72.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAGA0IAAgMIASAAIAAhIIgrBUIgVAAIAAhbIgQAAIAAgMIAyAAIAAAMIgRAAIAABFIAqhRIAmAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_1.setTransform(-49.2,-72.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAqA/IAAgWIhiAAIAAgMIASAAIAAhPIgSAAIAAgMIAyAAIAAAMIgQAAIAABPIAuAAIAAhPIgRAAIAAgMIAyAAIAAAMIgRAAIAABPIARAAIAAAig");
	this.shape_2.setTransform(-61.4,-71.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgkAxQgJgFgCgMIgBgGIAAgEQAAgQALgHQALgIARAAIAKAAIARAAIAAgJQAAgGgCgEIgFgIQgDgCgEgCIgHgCQgHABgGABQgEABgEAGQgCACgBAEIgBAGIgRAAQAAgLAGgIQAGgIALgEQAEgBAEAAIAKAAQAHAAAHABQAGADAHAEQAGAFADAHQABAFAAAKIAAA6IARAAIAAANIggAAIAAgVQgFAMgIAFQgHAFgNABQgMAAgJgGgAgUAEQgMAFABAOQAAAJAEAFQAFAGAJAAQAPAAAJgNQAHgLAAgRIgIAAIgIgBQgPAAgHADg");
	this.shape_3.setTransform(-72.75,-73.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag2BGIAAgMIAQAAIAAhwIgQAAIAAgMIAgAAIAAAVQAHgNAIgFQAHgGANAAQANAAAJAFQAHAGAIANQADAFACAIIABARQgBAMgBAGQgCALgGAHQgHAJgIAFQgHAEgLAAQgMAAgIgFQgJgFgGgLIAAAoIARAAIAAAMgAgPgqQgEAGgBAHQgBAGgBAIQABAJABAGQACAHADAGQAEAGAGAEQAGAEAHAAQAQAAAHgNQAIgMAAgPQAAgKgBgGQgCgIgEgGQgDgHgHgEQgGgDgGAAQgQAAgJAPg");
	this.shape_4.setTransform(-84.85,-71.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgjAnQgLgNAAgZQAAgIACgJQABgIAFgIQAFgKAMgGQAKgGAMABQAIAAAHABQAIADAFAFQAGAEAFAHQADAHACAJQACAJAAAJIAAADIhMAAQgBAIADAHQACAHAFAGQAFAGAFACQAGACAIAAQAJAAAIgGQAIgGABgKIAPAAQgDARgLAJQgMAJgSAAQgXAAgNgQgAgUggQgIALAAAOIA5AAQAAgOgGgKQgJgKgNgBQgNAAgIAKg");
	this.shape_5.setTransform(-96.15,-73.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAVA0IAAgMIAQAAIAAhJIgfBVIgMAAIgfhVIAABJIARAAIAAAMIgwAAIAAgMIARAAIAAhPIgRAAIAAgMIAqAAIAaBSIAchSIApAAIAAAMIgQAAIAABPIAQAAIAAAMg");
	this.shape_6.setTransform(-108.975,-72.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgeBFIgGgBIAAgNQAGABAGAAQAHAAAFgHQADgEADgKIgjhcIgKAAIAAgMIAsAAIAAAMIgQAAIAZBIIAYhIIgQAAIAAgMIAqAAIAAAMIgJAAIgiBdIgGAPIgFAKIgFAEIgHADIgJACIgHgBg");
	this.shape_7.setTransform(-121.85,-71.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAOBHIAAgMIAUAAIAAg1IhDAAIAAA1IAUAAIAAAMIg6AAIAAgMIAUAAIAAh0IgUAAIAAgOIA6AAIAAAOIgUAAIAAAyIBDAAIAAgyIgUAAIAAgOIA6AAIAAAOIgUAAIAAB0IAUAAIAAAMg");
	this.shape_8.setTransform(-135.225,-74.9);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).wait(13));

	// mstripe_arrow_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_3 = new cjs.Graphics().p("AgiAjIAAhFIBFAAIAABFg");
	var mask_1_graphics_4 = new cjs.Graphics().p("AgiBoIAAjPIBFAAIAADPg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AgiCtIAAlZIBFAAIAAFZg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AgiDyIAAnjIBFAAIAAHjg");
	var mask_1_graphics_7 = new cjs.Graphics().p("AjDD0IAAnnIGHAAIAAHng");
	var mask_1_graphics_8 = new cjs.Graphics().p("AllD2IAAnrILLAAIAAHrg");
	var mask_1_graphics_9 = new cjs.Graphics().p("AoHD4IAAnvIQPAAIAAHvg");
	var mask_1_graphics_10 = new cjs.Graphics().p("AqpD7IAAn1IVTAAIAAH1g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_1_graphics_3,x:-23.3748,y:-17.6751}).wait(1).to({graphics:mask_1_graphics_4,x:-23.4252,y:-24.8742}).wait(1).to({graphics:mask_1_graphics_5,x:-23.4747,y:-32.0738}).wait(1).to({graphics:mask_1_graphics_6,x:-23.4747,y:-38.9246}).wait(1).to({graphics:mask_1_graphics_7,x:-39.4538,y:-39.4533}).wait(1).to({graphics:mask_1_graphics_8,x:-55.4328,y:-39.9821}).wait(1).to({graphics:mask_1_graphics_9,x:-71.4119,y:-40.5117}).wait(1).to({graphics:mask_1_graphics_10,x:-87.3905,y:-40.6805}).wait(15));

	// mstripe_arrow
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AJZAEIAAgHApYAEISiAAAJKgDIyiAA");
	this.shape_9.setTransform(71.975,-126.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(0,0,0,0)").ss(0.8,1,1).p("AgCERIAFACIAAol");
	this.shape_10.setTransform(131.775,-98.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AKCDuIAAnUI0LAAIAAgIIUTAAIAAHcg");
	this.shape_11.setTransform(-89.55,-38.05);

	var maskedShapeInstanceList = [this.shape_9,this.shape_10,this.shape_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},3).wait(22));

	// mstripe_arrow_start
	this.instance = new lib.Символ31("synched",0);
	this.instance.setTransform(-25,-15,0.0917,0.0917);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({scaleX:0.7338,scaleY:0.7338,y:-15.025},0).wait(1).to({scaleX:1.3758,scaleY:1.3758,y:-15.05},0).wait(1).to({scaleX:1.1465,scaleY:1.1465},0).wait(1).to({scaleX:0.9172,scaleY:0.9172},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Слой_1
	this.instance_1 = new lib.Символ50();
	this.instance_1.setTransform(0,0.05,1,1,0,0,0,19.9,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:10.9,y:-6.05},0).wait(1).to({y:-12.05},0).wait(1).to({y:-18.05},0).wait(1).to({y:-24.1},0).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-330,-88.4,350,99.4);


(lib.Символ46 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ47();

	this.instance_1 = new lib.Символ49();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiOBjIAIgFIgtg2IgLADIgIgKIAegOIBKAjIABgBIgfglIgLACIgIgKIAmgQIAJAJIgJAGIA2BBIgUAJIhKgiIgBAAIAgAmIAKgDIAJAKIgnARgAg7AmIAqgTIAJAMIgpATgAATAfQgPgEgLgPIgOgPQgMgQACgLQABgMAPgGQANgGAOAEQAOAEAMAQIAOARQAMANgCAMQgCALgNAHQgIADgIAAQgGAAgGgCgAgFgjQgGACABAFQAAAFAIAKIAOASQAHAIAGADQAGADAGgDQAFgCgBgFQAAgGgHgHIgPgTQgIgJgGgDQgDgBgCAAIgFABgAg/AbQgMgDgHgIIgFgHQgFgGAAgFQgBgFADgFQAEgFAHgDQAHgEAIABQAHgBAHAEQAHADAEAGIAGAHQAGAHgBAJQgDAIgKAEQgIAEgHAAIgHgBgAhEgHQgEABAAADQAAADADACIAEAGQADADADABQADABAEgBIAAAAQADgCABgDQAAgCgDgDIgEgFQgDgDgDgCIgDAAIgEABgABYAAQgOgDgMgPIgOgRQgMgPACgMQABgLAOgGQAOgGAPAEQANAFANAPIANAQQALAPgBAMQgCALgNAGQgJADgIAAQgFAAgGgCgABAhCQgGADABAFQAAAEAHAKIAPASQAHAJAHAEQAFACAGgCQAFgDgBgFQAAgFgHgJIgPgTQgHgJgGgCIgGgCIgFABgACQgcIANgIIgngyIgPAHIgIgKIAegUIAzBAIAQgEIAHAKIgwAVg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-10.9,39.9,21.9);


(lib.Символ43 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// mstripe_typewrite (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_12 = new cjs.Graphics().p("A7utCIAAkKMAjkAAAIAAEKg");
	var mask_graphics_13 = new cjs.Graphics().p("A6xtBIAAkLMAjjAAAIAAELg");
	var mask_graphics_14 = new cjs.Graphics().p("A51tBIAAkLMAjjAAAIAAELg");
	var mask_graphics_15 = new cjs.Graphics().p("A45tBIAAkLMAjkAAAIAAELg");
	var mask_graphics_16 = new cjs.Graphics().p("A39tBIAAkLMAjkAAAIAAELg");
	var mask_graphics_17 = new cjs.Graphics().p("A3AtBIAAkKMAjjAAAIAAEKg");
	var mask_graphics_18 = new cjs.Graphics().p("A2EtBIAAkKMAjkAAAIAAEKg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_graphics_12,x:-177.475,y:-110.1}).wait(1).to({graphics:mask_graphics_13,x:-171.4458,y:-110.0875}).wait(1).to({graphics:mask_graphics_14,x:-165.4167,y:-110.075}).wait(1).to({graphics:mask_graphics_15,x:-159.3875,y:-110.0625}).wait(1).to({graphics:mask_graphics_16,x:-153.3583,y:-110.05}).wait(1).to({graphics:mask_graphics_17,x:-147.3292,y:-110.0375}).wait(1).to({graphics:mask_graphics_18,x:-141.3,y:-110.025}).wait(7));

	// mstripe_text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAnA/IAAgWIhMAAIAAAWIgPAAIAAgiIAKAAQAHgDAEgLQAFgKAAgPIAAgoIgRAAIAAgMIBgAAIAAAMIgRAAIAABPIARAAIAAAigAgMgJQAAAKgDAKQgCALgFAHIAqAAIAAhPIggAAg");
	this.shape.setTransform(-62.725,-203.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgVAzQgIgFgHgJQgGgIgCgKQgDgKgBgJQABgMADgJQACgJAHgIQAHgIAKgEQAKgEAJAAQAYABAMAQQALAOAAAXQABAXgMAPQgOAQgWAAQgMAAgKgDgAgOglQgGADgFAHQgDAGgBAHQgCAHAAAHQAAAJACAHQACAHADAGQAFAFAGAEQAHAEAGAAQAIAAAGgFQAIgEADgHQADgFABgHQACgHAAgHQAAgRgGgLQgIgNgRAAQgHAAgHAEg");
	this.shape_1.setTransform(-73.95,-204.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAKA0IAAgMIAMAAIgYgpIgQAQIAAAZIAOAAIAAAMIgvAAIAAgMIARAAIAAhPIgRAAIAAgMIAvAAIAAAMIgOAAIAAAnIAlgnIgLAAIAAgMIAqAAIAAAMIgOAAIgbAcIAgAzIALAAIAAAMg");
	this.shape_2.setTransform(-84.95,-204.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgXAHIAAgNIAuAAIAAANg");
	this.shape_3.setTransform(-93.95,-204.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAiBHIgNgpQgCgKgCgEQgEgEgEgBIgGgCIgFgBIgDAAIgUAAIAAAyIAUAAIAAANIg5AAIAAgNIAUAAIAAh0IgUAAIAAgMIA8AAIAUAAQAIABAHAEQAGAFAEAJQAEAIAAAJQAAAQgHAJQgIAKgPACQALADAEAFQADAEADALIAJAgIAQAAIAAANgAgZgEIATAAIAOAAQAHgCAFgDQAEgEADgGQACgHAAgFQAAgHgCgFQgCgGgEgEQgEgDgFgBIgMgBIgZAAg");
	this.shape_4.setTransform(-103.9,-206.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AghBEQgNgFgJgMQgIgJgEgOQgEgOAAgOQAAgeARgVQATgWAgAAQAPAAAMAGQAMAEAJANQAIAKAEANQADANABAOQgBASgGAQQgIAVgOAFIAFgBIAGAAIANAAIAQAAIAAANIg0AAIgJABIgOABQgRAAgNgGgAgpgnQgLARAAAYIAAAJIAEAMQACAJADAHQAFAHAIAGQAEAEAIACQAGACAHAAQAWAAANgUQAMgRAAgXQAAgYgMgQQgMgTgXAAQgXAAgNAUg");
	this.shape_5.setTransform(-118.3,-206.55);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).wait(13));

	// mstripe_arrow_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_3 = new cjs.Graphics().p("AgiAjIAAhFIBFAAIAABFg");
	var mask_1_graphics_4 = new cjs.Graphics().p("AgiEsIAApXIBFAAIAAJXg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AgiI2IAAxrIBFAAIAARrg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AgiM/IAA59IBFAAIAAZ9g");
	var mask_1_graphics_7 = new cjs.Graphics().p("AiEM/IAA59IEJAAIAAZ9g");
	var mask_1_graphics_8 = new cjs.Graphics().p("AjmM/IAA59IHNAAIAAZ9g");
	var mask_1_graphics_9 = new cjs.Graphics().p("AlIM/IAA59IKRAAIAAZ9g");
	var mask_1_graphics_10 = new cjs.Graphics().p("AmqM/IAA59INVAAIAAZ9g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_1_graphics_3,x:-47.1753,y:-43.1253}).wait(1).to({graphics:mask_1_graphics_4,x:-47.0916,y:-69.8661}).wait(1).to({graphics:mask_1_graphics_5,x:-47.0084,y:-96.6069}).wait(1).to({graphics:mask_1_graphics_6,x:-46.9251,y:-123.3477}).wait(1).to({graphics:mask_1_graphics_7,x:-58.4739,y:-123.9206}).wait(1).to({graphics:mask_1_graphics_8,x:-70.0236,y:-124.4934}).wait(1).to({graphics:mask_1_graphics_9,x:-81.5724,y:-125.0663}).wait(1).to({graphics:mask_1_graphics_10,x:-92.5074,y:-123.2478}).wait(15));

	// mstripe_arrow
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AJZAEIAAgHAJKgDIyiAAApYAEISiAA");
	this.shape_6.setTransform(66.975,-122.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(0,0,0,0)").ss(0.8,1,1).p("AgCERIAFABIAAok");
	this.shape_7.setTransform(126.775,-94.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("ATLMBIAA36MgmdAAAIAAgIMAmlAAAIAAYCg");
	this.shape_8.setTransform(-172.925,-116.6);

	var maskedShapeInstanceList = [this.shape_6,this.shape_7,this.shape_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},3).wait(22));

	// mstripe_arrow_start
	this.instance = new lib.Символ31("synched",0);
	this.instance.setTransform(-50,-40,0.0917,0.0917);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({scaleX:0.7338,scaleY:0.7338},0).wait(1).to({scaleX:1.3758,scaleY:1.3758},0).wait(1).to({scaleX:1.1465,scaleY:1.1465},0).wait(1).to({scaleX:0.9172,scaleY:0.9172},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// qr
	this.instance_1 = new lib.Символ44();
	this.instance_1.setTransform(-0.1,0.05,1,1,0,0,0,61.6,49.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({y:-7.3},0).wait(1).to({y:-14.65},0).wait(1).to({y:-22},0).wait(1).to({y:-29.35},0).wait(21));

	// qr_
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AirHvIm9puIMOlvIHDJZg");
	this.shape_9.setTransform(0,0.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(0,0,0,0.004)").s().p("Apoh/IMOlvIHCJZIsTGEg");
	this.shape_10.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9}]}).to({state:[]},1).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-354.9,-220,417.59999999999997,270.5);


(lib.Символ39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ40();

	this.instance_1 = new lib.Символ43();

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AirHvIm9puIMOlvIHDJZg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Apoh/IMOlvIHCJZIsTGEg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.6,-50.4,125.30000000000001,100.9);


(lib.Символ37 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// mstripe_typewrite (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_12 = new cjs.Graphics().p("Egt5gHLIAAkLMAjlAAAIAAELg");
	var mask_graphics_13 = new cjs.Graphics().p("EgregHMIAAkKMAjkAAAIAAEKg");
	var mask_graphics_14 = new cjs.Graphics().p("EgpEgHMIAAkKMAjkAAAIAAEKg");
	var mask_graphics_15 = new cjs.Graphics().p("EgmqgHMIAAkKMAjkAAAIAAEKg");
	var mask_graphics_16 = new cjs.Graphics().p("EgkQgHMIAAkLMAjkAAAIAAELg");
	var mask_graphics_17 = new cjs.Graphics().p("Egh2gHMIAAkLMAjjAAAIAAELg");
	var mask_graphics_18 = new cjs.Graphics().p("A/cnMIAAkLMAjjAAAIAAELg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_graphics_12,x:-293.75,y:-72.7}).wait(1).to({graphics:mask_graphics_13,x:-278.3458,y:-72.7125}).wait(1).to({graphics:mask_graphics_14,x:-262.9417,y:-72.725}).wait(1).to({graphics:mask_graphics_15,x:-247.5375,y:-72.7375}).wait(1).to({graphics:mask_graphics_16,x:-232.1333,y:-72.75}).wait(1).to({graphics:mask_graphics_17,x:-216.7292,y:-72.7625}).wait(1).to({graphics:mask_graphics_18,x:-201.325,y:-72.775}).wait(7));

	// mstripe_text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgkAxQgIgFgEgMIgBgGIAAgEQAAgQAMgIQALgHARAAIALAAIAQAAIAAgKQAAgFgCgEQgBgDgEgFQgCgCgFgCIgIgBQgHgBgEACQgFACgEAFQgCACgBADIgBAHIgRAAQAAgLAGgIQAFgHAMgEQADgCAFAAIAKgBQAIABAGACQAHACAGAEQAGAFACAHQACAGAAAIIAAA7IAQAAIAAANIgfAAIAAgVQgFAMgIAFQgHAGgNAAQgNgBgIgFgAgUAEQgLAFAAAOQAAAJAEAFQAFAGAJgBQAQAAAIgMQAHgKAAgRIgIgBIgIAAQgQAAgGACg");
	this.shape.setTransform(-182.25,-130.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgfAnQgMgPAAgWQAAgLACgKQADgJAHgKQAFgGAJgFQAJgFAJAAQAJAAAIAEQAHAEAFAIIAAgMIANAAIAAAmIgNAAQAAgLgHgJQgHgIgLAAQgPgBgIANQgIAMABAQQAAAHACAHQABAIAEAGQAJANANAAQALABAGgIQAHgGABgLIAPAAQAAARgMAKQgMALgRAAQgVAAgNgQg");
	this.shape_1.setTransform(-192.95,-130.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgUAyQgKgDgGgKQgGgIgDgKQgCgKAAgKQAAgLACgKQADgJAHgHQAHgIAKgDQAJgEAKgBQAYAAAMAQQAMAPAAAXQAAAYgNAOQgNAQgXABQgLgBgJgEgAgNgmQgHAEgFAHQgDAGgBAHQgCAHABAHQgBAJACAHQACAHAEAGQAEAFAHAFQAGADAGAAQAHAAAIgEQAGgFAEgHQADgFACgIQABgGAAgHQAAgRgHgLQgIgNgQAAQgIAAgFADg");
	this.shape_2.setTransform(-203.6,-130.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AguA1IgGgCIAAgNIAGAAIAFABQAJAAADgKQADgIAAgRIAAgsIgRAAIAAgMIBgAAIAAAMIgRAAIAABPIARAAIAAAMIgyAAIAAgMIARAAIAAhPIggAAIAAAwQAAAYgHAKQgGALgQAAIgFAAg");
	this.shape_3.setTransform(-215,-129.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgUAyQgKgDgGgKQgGgIgDgKQgCgKAAgKQAAgLACgKQADgJAHgHQAHgIAKgDQAJgEAKgBQAYAAAMAQQAMAPAAAXQAAAYgNAOQgNAQgXABQgLgBgJgEgAgNgmQgHAEgFAHQgDAGgBAHQgBAHAAAHQAAAJABAHQABAHAEAGQAFAFAHAFQAGADAGAAQAHAAAIgEQAGgFAEgHQADgFABgIQACgGAAgHQAAgRgGgLQgJgNgQAAQgIAAgFADg");
	this.shape_4.setTransform(-226.2,-130.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAHA0IAAgMIARAAIAAhPIguAAIAABPIAQAAIAAAMIgxAAIAAgMIARAAIAAhPIgRAAIAAgMIBvAAIAAAMIgQAAIAABPIAQAAIAAAMg");
	this.shape_5.setTransform(-237.9,-129.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AABA0IAAgMIARAAIAAghIgSAAQgHAAgEADQgEADgCAIIgJAfIgYAAIAAgMIALAAIAGgWQACgHAEgDQADgEAGgCQgLgCgFgGQgFgGAAgMQAAgHADgGQADgGAFgEQAFgCAGgBIANgBIADAAIA0AAIAAAMIgRAAIAABPIARAAIAAAMgAgMgnQgDAAgCADQgDACgBAEQgCADAAAFQAAAEACAEQABAEADACIAIADIAKABIARAAIAAgjIgUAAIgKAAg");
	this.shape_6.setTransform(-255.125,-129.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgkAxQgJgFgCgMIgBgGIAAgEQAAgQAMgIQAKgHARAAIAKAAIARAAIAAgKQAAgFgBgEIgGgIQgDgCgEgCIgHgBQgHgBgGACQgEACgEAFQgCACgBADIgBAHIgRAAQAAgLAGgIQAGgHAKgEQAFgCAEAAIAJgBQAIABAHACQAHACAGAEQAGAFADAHQABAGAAAIIAAA7IARAAIAAANIggAAIAAgVQgFAMgIAFQgHAGgNAAQgMgBgJgFgAgUAEQgMAFAAAOQABAJAEAFQAFAGAJgBQAPAAAJgMQAHgKAAgRIgIgBIgIAAQgPAAgHACg");
	this.shape_7.setTransform(-265.9,-130.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAHA0IAAgMIARAAIAAgiIguAAIAAAiIAQAAIAAAMIgyAAIAAgMIASAAIAAhPIgSAAIAAgMIAyAAIAAAMIgQAAIAAAhIAuAAIAAghIgRAAIAAgMIAyAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_8.setTransform(-277.85,-129.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgaA0IAAgMIATAAIAAhPIgZAAIAAAYIgOAAIAAgkIBdAAIAAAkIgOAAIAAgYIgZAAIAABPIATAAIAAAMg");
	this.shape_9.setTransform(-289.125,-129.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAGA0IAAgMIASAAIAAhIIgsBUIgUAAIAAhbIgQAAIAAgMIAyAAIAAAMIgRAAIAABFIAqhRIAmAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_10.setTransform(-300.4,-129.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAHA0IAAgMIARAAIAAgiIguAAIAAAiIAQAAIAAAMIgxAAIAAgMIARAAIAAhPIgRAAIAAgMIAxAAIAAAMIgQAAIAAAhIAuAAIAAghIgRAAIAAgMIAxAAIAAAMIgQAAIAABPIAQAAIAAAMg");
	this.shape_11.setTransform(-312.6,-129.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgrA0IAAgMIARAAIAAhPIgRAAIAAgMIBXAAIAAAkIgPAAIAAgYIgmAAIAABPIATAAIAAAMg");
	this.shape_12.setTransform(-323.5,-129.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgkAxQgIgFgEgMIAAgGIAAgEQgBgQAMgIQALgHARAAIALAAIAQAAIAAgKQAAgFgCgEIgFgIQgCgCgFgCIgHgBQgIgBgEACQgFACgEAFQgCACgBADIgBAHIgRAAQAAgLAGgIQAGgHALgEQAEgCAEAAIAKgBQAHABAHACQAGACAHAEQAGAFADAHQABAGAAAIIAAA7IARAAIAAANIggAAIAAgVQgFAMgIAFQgHAGgNAAQgNgBgIgFgAgUAEQgLAFAAAOQAAAJAEAFQAFAGAJgBQAQAAAIgMQAHgKAAgRIgIgBIgIAAQgQAAgGACg");
	this.shape_13.setTransform(-333.55,-130.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAhBIIAAgOIASAAIAAh0IgBAAIgrCCIgPAAIgqiCIgBAAIAAB0IASAAIAAAOIg2AAIAAgOIAUAAIAAh0IgUAAIAAgNIAzAAIAkB6IAmh6IAyAAIAAANIgUAAIAAB0IAUAAIAAAOg");
	this.shape_14.setTransform(-348.875,-131.9);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).wait(13));

	// mstripe_arrow_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_3 = new cjs.Graphics().p("AgiAjIAAhFIBFAAIAABFg");
	var mask_1_graphics_4 = new cjs.Graphics().p("AgiEsIAApXIBFAAIAAJXg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AgiI2IAAxrIBFAAIAARrg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AgiM/IAA59IBFAAIAAZ9g");
	var mask_1_graphics_7 = new cjs.Graphics().p("AkbM/IAA59II3AAIAAZ9g");
	var mask_1_graphics_8 = new cjs.Graphics().p("AoVM/IAA59IQrAAIAAZ9g");
	var mask_1_graphics_9 = new cjs.Graphics().p("AsPM/IAA59IYfAAIAAZ9g");
	var mask_1_graphics_10 = new cjs.Graphics().p("AwJM/IAA59MAgTAAAIAAZ9g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_1_graphics_3,x:-167.3748,y:31.9248}).wait(1).to({graphics:mask_1_graphics_4,x:-167.742,y:6.9174}).wait(1).to({graphics:mask_1_graphics_5,x:-168.1083,y:-18.0905}).wait(1).to({graphics:mask_1_graphics_6,x:-168.4751,y:-43.0979}).wait(1).to({graphics:mask_1_graphics_7,x:-193.8015,y:-43.3967}).wait(1).to({graphics:mask_1_graphics_8,x:-219.128,y:-43.6955}).wait(1).to({graphics:mask_1_graphics_9,x:-244.4544,y:-43.9947}).wait(1).to({graphics:mask_1_graphics_10,x:-268.2936,y:-43.0979}).wait(15));

	// mstripe_arrow
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AJZAEIAAgHAJKgDIyiAAApYAEISiAA");
	this.shape_15.setTransform(-72.775,-77.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("rgba(0,0,0,0)").ss(0.8,1,1).p("AgCERIAFABIAAok");
	this.shape_16.setTransform(-12.975,-49.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("ATLMCIAA37MgmdAAAIAAgHMAmlAAAIAAYCg");
	this.shape_17.setTransform(-292.825,-41.95);

	var maskedShapeInstanceList = [this.shape_15,this.shape_16,this.shape_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},3).wait(22));

	// mstripe_arrow_start
	this.instance = new lib.Символ31("synched",0);
	this.instance.setTransform(-170,35,0.0917,0.0917);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({scaleX:0.7338,scaleY:0.7338},0).wait(1).to({scaleX:1.3758,scaleY:1.3758},0).wait(1).to({scaleX:1.1465,scaleY:1.1465},0).wait(1).to({scaleX:0.9172,scaleY:0.9172},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// mstripe
	this.instance_1 = new lib.Символ38();
	this.instance_1.setTransform(0.05,0.05,1,1,0,0,0,185.5,104.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:104.8,y:-8.2},0).wait(1).to({y:-16.35},0).wait(1).to({y:-24.5},0).wait(1).to({y:-32.7},0).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-475,-145.4,661.5,250.8);


(lib.Символ33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ34();

	this.instance_1 = new lib.Символ37();

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("A8+JyMA04gaKIFFF2Mg1WAa7g");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#323232").s().p("A8+JyMA04gaKIFFF2Mg1WAa6g");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-186.4,-105.8,372.9,211.7);


(lib.Символ29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ28("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-8.9,17.9,17.9);


(lib.Символ14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_22 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(22).call(this.frame_22).wait(1));

	// barcode_text_typewrite (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_12 = new cjs.Graphics().p("ArSpCIAAkKIWlAAIAAEKg");
	var mask_graphics_13 = new cjs.Graphics().p("ArSpCIAAkKIWlAAIAAEKg");
	var mask_graphics_14 = new cjs.Graphics().p("ArSpCIAAkKIWlAAIAAEKg");
	var mask_graphics_15 = new cjs.Graphics().p("ArMpCIAAkKIWlAAIAAEKg");
	var mask_graphics_16 = new cjs.Graphics().p("Ap9pCIAAkKIWlAAIAAEKg");
	var mask_graphics_17 = new cjs.Graphics().p("AotpCIAAkLIWlAAIAAELg");
	var mask_graphics_18 = new cjs.Graphics().p("AnepCIAAkLIWlAAIAAELg");
	var mask_graphics_19 = new cjs.Graphics().p("AmOpCIAAkLIWlAAIAAELg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(12).to({graphics:mask_graphics_12,x:25.7999,y:-84.5}).wait(1).to({graphics:mask_graphics_13,x:41.6928,y:-84.5107}).wait(1).to({graphics:mask_graphics_14,x:57.5856,y:-84.5214}).wait(1).to({graphics:mask_graphics_15,x:72.8892,y:-84.5321}).wait(1).to({graphics:mask_graphics_16,x:80.8356,y:-84.5429}).wait(1).to({graphics:mask_graphics_17,x:88.7821,y:-84.5536}).wait(1).to({graphics:mask_graphics_18,x:96.7285,y:-84.5643}).wait(1).to({graphics:mask_graphics_19,x:104.6749,y:-84.575}).wait(4));

	// barcode_text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAnA/IAAgWIhMAAIAAAWIgPAAIAAgiIAKAAQAHgDAEgLQAFgKAAgPIAAgoIgRAAIAAgMIBgAAIAAAMIgRAAIAABPIARAAIAAAigAgMgJQAAAKgDAKQgCALgFAHIAqAAIAAhPIggAAg");
	this.shape.setTransform(201.525,-152.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgUAzQgJgEgHgKQgGgIgCgKQgDgKAAgKQAAgLADgJQACgKAHgHQAHgIAKgDQAKgFAJAAQAXABANAPQALAPAAAXQAAAYgMAOQgNAQgXAAQgLAAgJgDgAgOgmQgGAEgFAHQgDAGgBAHQgCAHAAAHQAAAJACAHQABAHAEAGQAFAFAGAFQAHADAGAAQAHAAAIgFQAGgEAEgHQADgGABgGQACgHAAgHQAAgRgGgLQgIgNgRAAQgHAAgHADg");
	this.shape_1.setTransform(190.3,-153.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAKA0IAAgMIAMAAIgYgpIgQAQIAAAZIAOAAIAAAMIgvAAIAAgMIARAAIAAhPIgRAAIAAgMIAvAAIAAAMIgOAAIAAAnIAlgnIgLAAIAAgMIAqAAIAAAMIgOAAIgbAcIAgAzIALAAIAAAMg");
	this.shape_2.setTransform(179.3,-153.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgXAHIAAgNIAuAAIAAANg");
	this.shape_3.setTransform(170.3,-153.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAHA0IAAgMIAQAAIgXgfIgZAfIASAAIAAAMIgtAAIAAgMIAKAAIAhgpIgegmIgLAAIAAgMIAtAAIAAAMIgPAAIAWAeIAXgeIgQAAIAAgMIAqAAIAAAMIgKAAIgeAnIAfAoIALAAIAAAMg");
	this.shape_4.setTransform(161.475,-153.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAGA0IAAgMIASAAIAAhIIgsBUIgTAAIAAhbIgRAAIAAgMIAyAAIAAAMIgRAAIAABFIAphRIAnAAIAAAMIgRAAIAABPIARAAIAAAMg");
	this.shape_5.setTransform(149.75,-153.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag3BGIAAgMIASAAIAAhwIgSAAIAAgMIAiAAIAAAUQAFgMAJgGQAHgFAOAAQAMAAAIAFQAJAFAHANQADAHABAHIABARQAAALgBAIQgDAKgFAIQgHAIgHAEQgIAFgKAAQgNAAgIgFQgJgFgFgLIAAAoIARAAIAAAMgAgPgqQgEAGgBAGQgBAHAAAIQAAAJABAGQABAHAEAGQAEAGAHAEQAEAEAIAAQAPAAAJgOQAHgLAAgPQAAgJgCgIQgBgGgDgHQgEgGgGgFQgHgDgHAAQgPAAgJAPg");
	this.shape_6.setTransform(137.4,-152.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgaA0IAAgMIATAAIAAhPIgZAAIAAAYIgOAAIAAgkIBdAAIAAAkIgOAAIAAgYIgZAAIAABPIATAAIAAAMg");
	this.shape_7.setTransform(126.275,-153.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhjBIIAAgOIAVAAIAAh0IgVAAIAAgMIA6AAIAAAMIgUAAIAAB0IA1AAIAAh0IgUAAIAAgMIA5AAIAAAMIgVAAIAAB0IA2AAIAAh0IgUAAIAAgMIA5AAIAAAMIgUAAIAAB0IAUAAIAAAOg");
	this.shape_8.setTransform(110.6,-155.5);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).wait(11));

	// barcode_arrow_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_3 = new cjs.Graphics().p("Av6AAIP6v6IP7P6Iv7P7g");
	var mask_1_graphics_4 = new cjs.Graphics().p("Av6AAIP6v6IP7P6Iv7P7g");
	var mask_1_graphics_5 = new cjs.Graphics().p("Av6AAIP6v6IP7P6Iv7P7g");
	var mask_1_graphics_6 = new cjs.Graphics().p("Av6gdIP6v7IP7P7Iv7P6g");
	var mask_1_graphics_7 = new cjs.Graphics().p("Av6g4IP6v7IP7P7Iv7P6g");
	var mask_1_graphics_8 = new cjs.Graphics().p("Av6hSIP6v8IP7P7Iv7P7g");
	var mask_1_graphics_9 = new cjs.Graphics().p("Av6htIP6v8IP7P7Iv7P7g");
	var mask_1_graphics_10 = new cjs.Graphics().p("At8iIIP6v8IP7P7Iv7P7g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_1_graphics_3,x:64.825,y:-2.925}).wait(1).to({graphics:mask_1_graphics_4,x:50.3583,y:-37.925}).wait(1).to({graphics:mask_1_graphics_5,x:35.8917,y:-72.925}).wait(1).to({graphics:mask_1_graphics_6,x:21.425,y:-104.925}).wait(1).to({graphics:mask_1_graphics_7,x:47.85,y:-107.6062}).wait(1).to({graphics:mask_1_graphics_8,x:74.275,y:-110.2875}).wait(1).to({graphics:mask_1_graphics_9,x:100.7,y:-112.9687}).wait(1).to({graphics:mask_1_graphics_10,x:114.525,y:-115.65}).wait(13));

	// barcode_arrow
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("ApAAEIAAgHISAAAIAAAHg");
	this.shape_9.setTransform(90.4,-140,1.0794,1,0,0,0,-57.7,0.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("AJZAEIypAAIgIAAIAAgHISxAA");
	this.shape_10.setTransform(150.525,-140.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(0,0,0,0)").ss(0.8,1,1).p("AAEkSIAAIlIgHAAIAAol");
	this.shape_11.setTransform(90.825,-112.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgDETIAAokIAHAAIAAIkg");
	this.shape_12.setTransform(90.825,-112.6);

	var maskedShapeInstanceList = [this.shape_9,this.shape_10,this.shape_11,this.shape_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},3).wait(20));

	// barcode_arrow_start
	this.instance = new lib.Символ29("synched",0);
	this.instance.setTransform(90.95,-85,0.0629,0.0629);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({scaleX:0.3564,scaleY:0.3564},0).wait(1).to({scaleX:0.6499,scaleY:0.6499},0).wait(1).to({scaleX:0.9435,scaleY:0.9435},0).wait(1).to({scaleX:0.8386,scaleY:0.8386},0).wait(1).to({scaleX:0.7338,scaleY:0.7338},0).wait(1).to({scaleX:0.629,scaleY:0.629},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// barcode
	this.instance_1 = new lib.Символ3();
	this.instance_1.setTransform(61,-56.05,1,1,0,0,0,61,55.5);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({scaleX:1.0533,scaleY:1.0533,y:-64.7,alpha:0.2},0).wait(1).to({scaleX:1.1066,scaleY:1.1066,y:-73.35,alpha:0.4},0).wait(1).to({scaleX:1.1598,scaleY:1.1598,y:-82.05,alpha:0.6},0).wait(1).to({scaleX:1.2131,scaleY:1.2131,y:-90.65,alpha:0.8},0).wait(19));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-169,228,168.4);


(lib.Символ13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// barcode_botton
	this.instance = new lib.Символ17();
	this.instance.setTransform(61.1,-55.6,1,1,0,0,0,61.1,-55.6);

	this.instance_1 = new lib.Символ14();
	this.instance_1.setTransform(61.1,-55.6,1,1,0,0,0,61.1,-55.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.7,1,1).p("ApimPINkO7IFhioItruug");
	this.shape.setTransform(61.075,-55.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ApimQIFaiaINrOuIlhCng");
	this.shape_1.setTransform(61.075,-55.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-112.1,240.5,153.7);


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

	// mstripe_container
	this.instance = new lib.Символ33();
	this.instance.setTransform(492.8,448.9);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.Символ33(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// barcode_container
	this.instance_1 = new lib.Символ13();
	this.instance_1.setTransform(662.6,179.6,1,1,0,0,0,61.1,-55.6);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.Символ13(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// num_container
	this.instance_2 = new lib.Символ46();
	this.instance_2.setTransform(610.6,121.05);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib.Символ46(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// number_idn
	this.instance_3 = new lib.Символ45("synched",0);
	this.instance_3.setTransform(610.6,121.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// qr_container
	this.instance_4 = new lib.Символ39();
	this.instance_4.setTransform(322.95,421.5);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 2, false, new lib.Символ39(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// emboss_container
	this.instance_5 = new lib.Символ21();
	this.instance_5.setTransform(493.95,319.3,1,1,0,0,0,50.8,-26.9);
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.Символ21(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// backplate_card
	this.instance_6 = new lib.карты_1();
	this.instance_6.setTransform(0,-40);

	this.instance_7 = new lib.карты_1();
	this.instance_7.setTransform(0,-40);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6}]}).wait(1));

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
		{src:"карты_1.jpg", id:"карты_1"}
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