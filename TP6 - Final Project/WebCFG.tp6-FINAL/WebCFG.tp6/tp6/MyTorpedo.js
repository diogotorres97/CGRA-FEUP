/**
 * MyTorpedo
 * @constructor
 */

function MyTorpedo(scene,posX, posY, posZ, angulo) {
	CGFobject.call(this,scene);

	this.semiSphere = new MyLamp(this.scene,50,10);
	this.cylinder = new MyCylinder(this.scene,100,4);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.trap = new MyTrap(this.scene,0.75);

	this.posX = posX;
	this.posY = posY;
	this.posZ = posZ;

	this.target = null;

	this.start = false;
	this.hit = false;          //flag when target is hit;

	this.framerate = 0;
	this.delta = 0;
	this.lastCurrTime = 0;
	this.first = 0;
	this.angRot = 0; //Rotation angle in z-axis
	this.rotS = 360;
	this.angXZ = 0; //Rotation angle in x-axis
	this.angY = 0; //Rotation angle in y-axis

	this.lastPos = [];
	this.lastVect = [];
	this.targetPos = [];
	this.curvePts = [];
	this.t = 0;
	this.aTime; //animation time
	this.counter = 0;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

	if(!this.start)
		return;

	this.scene.pushMatrix();

	this.scene.translate(this.posX, this.posY, this.posZ);
	this.scene.translate(-Math.sin(this.angXZ)*Math.cos(this.angY),-Math.sin(this.angY),-Math.cos(this.angXZ)*Math.cos(this.angY));
	this.scene.rotate(this.angXZ,0,1,0);
	this.scene.rotate(-this.angY,1,0,0);
	this.scene.rotate(this.angRot*degToRad, 0,0,1);


	//Back
	this.scene.pushMatrix();
	this.scene.scale(0.1,0.1,0.092);
	this.scene.translate(0,0,1);
	this.scene.rotate(-180*degToRad,1,0,0);
	this.semiSphere.display();
	this.scene.popMatrix();

	//Main Body
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.091);
	this.scene.scale(0.1,0.1,0.818);
	this.cylinder.display();
	this.scene.popMatrix();

	//Front
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.908);
	this.scene.scale(0.1,0.1,0.092);
	this.semiSphere.display();
	this.scene.popMatrix();

	//Vert Back Wing
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.069);
	this.scene.rotate(-90*degToRad,0,1,0);
	this.scene.rotate(-90*degToRad,0,0,1);
	this.scene.scale(0.4,0.046,0.01); 
	this.trap.display();
	this.scene.popMatrix();

	//Hor Back Wing
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.069);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.scale(0.4,0.046,0.01); 
	this.trap.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};

MyTorpedo.prototype.update = function(currTime) {
	this.delta = currTime - this.lastCurrTime;
	this.lastCurrTime = currTime;

	if (this.first == 0)
	{
		this.delta = 0;
		this.first = 1;
		return;
	}

	if(!this.start)
		return;

	this.framerate = 1/(this.delta/1000);

	this.lastPos = [this.posX,this.posY,this.posZ];

	newPos = [];
	for(i = 0; i < 3; i++){
		newPos[i] = Math.pow(1-this.t,3)*this.curvePts[i] + 3*this.t*Math.pow(1-this.t,2)*this.curvePts[i+3] + 3*Math.pow(this.t,2)*(1-this.t)*this.curvePts[i+6] + Math.pow(this.t,3)*this.curvePts[i+9];
	}

	this.posX = newPos[0];
	this.posY = newPos[1];
	this.posZ = newPos[2];

	var newVector = [this.posX-this.lastPos[0], this.posY-this.lastPos[1], this.posZ-this.lastPos[2]];

	this.t += 1/(this.framerate*this.aTime);
	this.angRot += this.rotS/this.framerate;

	x= newVector[0];
	y= newVector[1];
	z= newVector[2];

	this.angXZ= Math.atan(x/z)+ (z < 0 ? Math.PI : 0);
	this.angY=  Math.atan(y/Math.sqrt(x*x+y*y+z*z)); 

	if(this.t >= 1){
		this.start = false;
		this.hit = true;
	}
};


MyTorpedo.prototype.setTarget = function(target, subPos, angXZ, angY){
	this.angXZ = angXZ;
	this.angY = angY;
	this.t = 0;
	this.hit = false;
	this.first = 0;
	this.target = target;
	this.targetPos = target.getPos();
	this.initPos = [subPos[0]+3*Math.sin(angXZ)*Math.cos(angY) + 0.6*Math.sin(angXZ)*Math.sin(angY),
		subPos[1]+3*Math.sin(angY) - 0.6*Math.cos(angY),
		subPos[2]+3*Math.cos(angXZ)*Math.cos(angY) + 0.6*Math.sin(angY)*Math.cos(angXZ)]


	this.posX = this.initPos[0];
	this.posY = this.initPos[1];
	this.posZ = this.initPos[2];


	this.aTime = Math.sqrt(Math.pow(this.initPos[0]-this.targetPos[0],2)+Math.pow(this.initPos[1]-this.targetPos[1],2)+Math.pow(this.initPos[2]-this.targetPos[2],2));


	var invert = 1;
	if(this.initPos[1] < this.targetPos[1]){
		invert = -1;
	}

	this.curvePts = [this.initPos[0],this.initPos[1],this.initPos[2],
		this.initPos[0]+11*Math.sin(angXZ)*Math.cos(angY), this.initPos[1]+11*Math.sin(angY), this.initPos[2]+11*Math.cos(angXZ)*Math.cos(angY),
		this.targetPos[0],this.targetPos[1]+3*invert,this.targetPos[2],
		this.targetPos[0],this.targetPos[1],this.targetPos[2]]

	this.start = true;
};


MyTorpedo.prototype.isActive = function(){
	return this.start;
};

MyTorpedo.prototype.isHit = function(){
	return this.hit;
};

MyTorpedo.prototype.clearHit = function(){
	this.hit = false;
};

MyTorpedo.prototype.getTarget = function(){
	return this.target;
};