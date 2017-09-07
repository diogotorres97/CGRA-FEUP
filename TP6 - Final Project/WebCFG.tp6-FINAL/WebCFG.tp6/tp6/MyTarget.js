/**
 * MyTarget
 * @constructor
 */
function MyTarget(scene, posX, posY, posZ) {
	CGFobject.call(this, scene);

	this.sphere = new MyLamp(this.scene,50,10,true);
	this.mine = new MyMine(this.scene);

	this.posX = posX;
	this.posY = posY;
	this.posZ = posZ;

	this.explosion = false;
	this.destroyed = false;

	this.framerate = 0;
	this.delta = 0;
	this.lastCurrTime = 0;
	this.first = 0;

	this.aTime = 2; //animation time
	this.scaleMax = 2;
	this.scaleD = this.scaleMax;
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

	if(this.explosion){
		if(!this.destroyed){
			this.scene.pushMatrix();
			this.scene.explosion.apply();

			this.scene.pushMatrix();
			this.scene.translate(this.posX, this.posY, this.posZ);
			this.scene.rotate(-90*degToRad, 1, 0, 0);
			this.scene.scale(this.scaleD,this.scaleD,this.scaleD);
			this.sphere.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(this.posX, this.posY, this.posZ);
			this.scene.rotate(90*degToRad, 1, 0, 0);
			this.scene.scale(this.scaleD,this.scaleD,this.scaleD);
			this.sphere.display();
			this.scene.popMatrix();

			this.scene.popMatrix();
		}
	}
	else{
		this.scene.pushMatrix();

		this.scene.rustAppearance.apply();
		this.scene.translate(this.posX, this.posY, this.posZ);
		this.mine.display();
		this.scene.popMatrix();
	}
};


MyTarget.prototype.update = function(currTime){
	this.delta = currTime - this.lastCurrTime;
	this.lastCurrTime = currTime;

	if (this.first == 0)
	{
		this.delta = 0;
		this.first = 1;
	}

	if(!this.explosion)
		return;

	this.framerate = 1/(this.delta/1000);
	this.scaleD -= this.scaleMax/(this.aTime*this.framerate);
	if(this.scaleD <= 0){
		this.destroyed = true;
		this.explosion = false;
	}
};

MyTarget.prototype.getPos = function(){
	pos = [this.posX, this.posY, this.posZ];
	return pos;
};

MyTarget.prototype.isDestroyed = function(){
	return this.destroyed;
};

MyTarget.prototype.setExplosion = function(){
	this.explosion = true;
};

MyTarget.prototype.isExploding = function(){
	return this.explosion();
};

