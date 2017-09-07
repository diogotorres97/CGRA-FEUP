var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.Light0 = true;
	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = true;
	this.Light4 = true;

	this.Clock=true;
	this.Fish=false;
	this.Speed=3;

	this.Music=true;
	this.SoundFX=true;

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.7, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.enableTextures(true);

	// Scene elements
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.cylinder = new MyCylinder(this,8,20,true);
	this.clock = new MyClock(this);
	this.sub = new MySubmarine(this,7.25,2.5,5,0);

	this.torpedosPool = [];
	this.torpedos = [];
	this.targets = [new MyTarget(this,10,0,10), new MyTarget(this,5,0,4), new MyTarget(this,3, 10, 14)];
	this.tIndex = 0;

	this.fish1= new MyFish(this);
	this.fish2= new MyRedFish(this);
	this.fish3= new MyDarkFish(this);
	this.rock = new MyRock(this);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialD = new CGFappearance(this); //Metal
	this.materialD.setAmbient(0.3,0.3,0.3,1);
	this.materialD.setDiffuse(0.6,0.6,0.6,1);
	this.materialD.setSpecular(1,1,1,0.5);
	this.materialD.setShininess(200);

	this.black = new CGFappearance(this); //Floor
	this.black.setAmbient(0.3,0.3,0.3,1);
	this.black.setDiffuse(0,0,0,1);
	this.black.setSpecular(0.5,0.5,0.5,0.5);
	this.black.setShininess(50);

	// TEXTURES

	this.ocean = new CGFappearance(this);
	this.ocean.loadTexture("../resources/images/ocean.png");
	this.ocean.setTextureWrap("REPEAT","REPEAT");
	this.ocean.setAmbient(0.3,0.3,0.3,1);
	this.ocean.setDiffuse(0.2,0.2,0.2,1);
	this.ocean.setSpecular(0.1,0.1,0.1,1);
	this.ocean.setShininess(0);

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.loadTexture("../resources/images/marmore.jpg");
	this.cylinderAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.cylinderAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.cylinderAppearance.setShininess(100);
	this.cylinderAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.clockAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.clockAppearance.setShininess(100);
	this.clockAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	this.submarineAppearance = new CGFappearance(this);
	this.submarineAppearance.loadTexture("../resources/images/cores.jpg");
	this.submarineAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.submarineAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.submarineAppearance.setShininess(100);
	this.submarineAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	this.rustAppearance = new CGFappearance(this);
	this.rustAppearance.loadTexture("../resources/images/rust.jpg");
	this.rustAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.rustAppearance.setSpecular(0.8, 0.8, 0.8, 1);
	this.rustAppearance.setShininess(10000);
	this.rustAppearance.setDiffuse(0.3, 0.3, 0.3, 1);

	this.explosion = new CGFappearance(this);
	this.explosion.loadTexture("../resources/images/expp.png");
	this.explosion.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.explosion.setSpecular(0.8, 0.8, 0.8, 1);
	this.explosion.setShininess(100);
	this.explosion.setDiffuse(1, 1, 1, 0);

	this.fishTexture = new CGFappearance(this);
	this.fishTexture.loadTexture("../resources/images/fish.jpg");
	this.fishTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.fishTexture.setSpecular(0.8, 0.8, 0.8, 1);
	this.fishTexture.setShininess(100);
	this.fishTexture.setDiffuse(1, 1, 1, 0);

	this.fishTexture1 = new CGFappearance(this);
	this.fishTexture1.loadTexture("../resources/images/fish1.jpg");
	this.fishTexture1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.fishTexture1.setSpecular(0.8, 0.8, 0.8, 1);
	this.fishTexture1.setShininess(100);
	this.fishTexture1.setDiffuse(1, 1, 1, 0);

	this.fishTexture2 = new CGFappearance(this);
	this.fishTexture2.loadTexture("../resources/images/fish2.jpg");
	this.fishTexture2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.fishTexture2.setSpecular(0.8, 0.8, 0.8, 1);
	this.fishTexture2.setShininess(100);
	this.fishTexture2.setDiffuse(1, 1, 1, 0);

	this.rockAppearance = new CGFappearance(this);
	this.rockAppearance.loadTexture("../resources/images/rock2.jpg");
	this.rockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.rockAppearance.setSpecular(0.3, 0.3, 0.3, 1);
	this.rockAppearance.setShininess(10);
	this.rockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.submarineAppearances = [this.cylinderAppearance, this.materialD,this.submarineAppearance,this.rustAppearance];
	this.submarineAppearanceList = {
			"Stone": 0,
			"Metal": 1,	
			"Colors": 2,
			"Rust" : 3
	};
	this.Textures = 0;	

	this.audio = new Audio('../resources/music/music1.mp3');
	this.audio.volume=0.2;
	this.bombSound = new Audio('../resources/music/bomb.mp3');

	this.setUpdatePeriod(1);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 0);

	// Positions for four lights
	this.lights[0].setPosition(0, 5, 0, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(0, 5, 15, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(15, 5, 0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(7.5, 5.0, 7.5, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(15, 5, 15, 1.0);
	this.lights[4].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(0.2);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1,1,0,1);
	this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};


LightingScene.prototype.display = function() {
	for(var i = 0; i < 5; i++){
		if(this["Light"+i] === true)
			this.lights[i].enable();
		else
			this.lights[i].disable();
	}

	if(this.Music)
		this.audio.play();	
	else
		this.audio.pause();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.ocean.apply();
	this.floor.display();
	this.popMatrix();

	//cylinder
	this.pushMatrix();
	this.translate( 8, 5, 0);
	this.rotate(Math.PI/2,1,0,0);
	this.scale(1,1,5);
	this.materialD.apply();
	this.cylinder.display();
	this.popMatrix();

	if(this.Fish){
		this.displayFish();
	}

	this.displayRock();

	//clock
	this.pushMatrix();
	this.translate( 8, 4, 1);
	this.scale(0.7,0.7,0.2);
	this.clock.display();
	this.popMatrix();

	//target
	for(i = 0; i < this.targets.length; i++){
		this.pushMatrix();
		this.targets[i].display();
		this.popMatrix();
	}

	//sub
	this.pushMatrix();
	this.submarineAppearances[this.Textures].apply();
	this.sub.display();
	this.popMatrix();

	//torpedo
	for(i = 0; i < this.torpedos.length; i++){
		this.pushMatrix();
		this.torpedos[i].display();
		this.popMatrix();
	}

	// ---- END Primitive drawing section
};


LightingScene.prototype.update = function(currTime) {
	if (this.Clock == true)
		this.clock.update(currTime);

	this.sub.update(currTime);

	if(this.Fish){
		this.fish1.update(currTime);
		this.fish2.update(currTime);
		this.fish3.update(currTime);
	}

	for(j = 0; j < this.torpedos.length; j++){
		this.torpedos[j].update(currTime);
	}

	for(i = 0; i < this.torpedos.length; i++){
		if(this.torpedos[i].isHit()){
			tgt = this.targets.indexOf(this.torpedos[i].getTarget());
			this.targets[tgt].setExplosion();
			if(this.SoundFX){
				this.bombSound.fastSeek(2);
				this.bombSound.play();
			}

			this.torpedos[i].clearHit();
			this.torpedos.splice(i,1);
		}
	}

	for(i = 0; i < this.targets.length; i++)
		this.targets[i].update(currTime);

	for(i = 0; i < this.targets.length; i++){
		if(this.targets[i].isDestroyed()){
			this.targets.splice(i,1);
			this.tIndex--;
		}
	}
};

LightingScene.prototype.Options = function (){
	console.log("Doing something...");
};

LightingScene.prototype.getNextTarget = function (){
	if(this.tIndex < this.targets.length){
		console.log("target adquired")
		this.tIndex++;
		return this.targets[this.tIndex-1];
	}
	else{
		console.log("no new target");
		return null;
	}
};

LightingScene.prototype.getTorpedo = function (){
	for(i = 0; i < this.torpedosPool.length; i++){
		if(!this.torpedosPool[i].isActive() && !this.torpedosPool[i].isHit()){
			console.log("used torpedo");
			return this.torpedosPool[i];
		}
	}
	this.torpedosPool.push(new MyTorpedo(this,5,5,10,0));
	console.log("new torpedo");
	return this.torpedosPool[this.torpedosPool.length-1];
};

LightingScene.prototype.displayFish = function (){
	//Front
	//fish
	this.pushMatrix();
	this.translate(0.5,0.5,1.5);
	this.fishTexture.apply();
	this.fish1.display();
	this.popMatrix();

	//fish2
	this.pushMatrix();
	this.translate(7,0.8,3);
	this.fishTexture1.apply();
	this.fish2.display();
	this.popMatrix();

	//fish3
	this.pushMatrix();
	this.translate(4.5,0.8,5);
	this.fishTexture2.apply();
	this.fish3.display();
	this.popMatrix();

	//Back
	//fish1
	this.pushMatrix();
	this.translate(0,0.2,12);
	this.fishTexture.apply();
	this.fish1.display();
	this.popMatrix();

	//fish2
	this.pushMatrix();
	this.translate(6.5,0.5,13);
	this.fishTexture1.apply();
	this.fish2.display();
	this.popMatrix();

	//fish3
	this.pushMatrix();
	this.translate(4,0.5,14);
	this.fishTexture2.apply();
	this.fish3.display();
	this.popMatrix();
};


LightingScene.prototype.displayRock = function (){
	//rock
	this.pushMatrix();
	this.rockAppearance.apply();
	this.translate(2,0.15,5);
	this.rotate(-40*degToRad, 0,1,0);
	this.scale(1.5, 0.5, 1.4)
	this.rock.display();
	this.popMatrix();

	this.pushMatrix();
	this.rockAppearance.apply();
	this.translate(5,0.6,10);
	//this.translate(10,0.6,6);
	this.scale(1.5,2,1.5);
	this.rock.display();
	this.popMatrix();

	this.pushMatrix();
	this.rockAppearance.apply();
	//this.translate(5,0.2,10);
	this.translate(10,0.2,5.5);
	this.rotate(20*degToRad, 0,1,0);
	this.scale(2.8,0.7,2.8);
	this.rock.display();
	this.popMatrix();
};
