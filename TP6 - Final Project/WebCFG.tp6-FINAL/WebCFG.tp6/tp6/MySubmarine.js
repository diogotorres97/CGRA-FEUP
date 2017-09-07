/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene,posX, posY, posZ, angulo) {
	CGFobject.call(this,scene);

	this.semiSphere = new MyLamp(this.scene,50,10);
	this.cylinder = new MyCylinder(this.scene,100,4,true);
	this.circle = new MyCircle(this.scene,100);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.trap = new MyTrap(this.scene,0.75);

	this.propang = 45;
	this.angs = 360;
	this.framerate = 0;
	this.delta = 0;
	this.lastCurrTime = 0;

	this.angsMove = angulo;
	this.posX = posX;
	this.posY = posY;
	this.posZ = posZ;

	this.vel = 0;
	this.velMin = 0.03;
	this.first = 0;
	this.wingV=0;
	this.wingH=0;
	this.angHeight = 0;
	this.perSp = 0.8;
	this.perDir = 0;
	this.perHeight = 1.07;
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {


	this.scene.translate(this.posX, this.posY, this.posZ);
	this.scene.rotate(this.angsMove, 0, 1, 0);
	this.scene.rotate(-this.angHeight,1, 0 ,0);
	//this.scene.translate(0,0,-2.5);

	//Back
	this.scene.pushMatrix();
	this.scene.scale(0.365,0.5,0.47);
	this.scene.translate(0,0,1);
	this.scene.rotate(-180*degToRad,1,0,0);
	this.semiSphere.display();
	this.scene.popMatrix();

	//Main Body
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.46);
	this.scene.scale(0.365,0.5,4.08);
	this.cylinder.display();
	this.scene.popMatrix();

	//Front
	this.scene.pushMatrix();
	this.scene.translate(0,0,4.53);
	this.scene.scale(0.365,0.5,0.47);
	this.semiSphere.display();
	this.scene.popMatrix();

	//Cockpit
	this.scene.pushMatrix();
	this.scene.translate(0,0,2.8);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.365,0.44,1.07);
	this.cylinder.display();
	this.scene.popMatrix();

	//Cockpit Top
	this.scene.pushMatrix();
	this.scene.translate(0,1.07,2.8);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.365,0.44,1);
	this.circle.display();
	this.scene.popMatrix();

	//Periscope Vert
	this.scene.pushMatrix();
	this.scene.translate(0,this.perHeight,3.05);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(0.05,0.05,0.57);
	this.cylinder.display();
	this.scene.popMatrix();

	//Periscope Hor
	this.scene.pushMatrix();
	this.scene.translate(0,0.56+this.perHeight,3);
	this.scene.scale(0.05,0.05,0.2);
	this.cylinder.display();
	this.scene.popMatrix();

	//Periscope Back Cover
	this.scene.pushMatrix();
	this.scene.translate(0,0.56+this.perHeight,3);
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.scale(0.05,0.05,0.2);
	this.circle.display();
	this.scene.popMatrix();

	//Periscope Front Cover
	this.scene.pushMatrix();
	this.scene.translate(0,0.56+this.perHeight,3.2);
	this.scene.scale(0.05,0.05,0.2);
	this.circle.display();
	this.scene.popMatrix();

	//Left Propeller
	//Cylinder
	this.scene.pushMatrix();
	this.scene.translate(0.52,-0.225,0.48);
	this.scene.scale(0.2,0.2,0.15);
	this.cylinder.display();
	this.scene.popMatrix();

	//Front Cover
	this.scene.pushMatrix();
	this.scene.translate(0.52,-0.225,0.561);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();

	//Back Cover
	this.scene.pushMatrix();
	this.scene.translate(0.52,-0.225,0.549);
	this.scene.rotate(180*degToRad,1,0,0);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();

	//Blade
	this.scene.pushMatrix();
	this.scene.translate(0.52,-0.225,0.555);
	this.scene.rotate(this.propang*degToRad,0,0,1)
	this.scene.scale(0.375,0.09,0.01); 
	this.cube.display();
	this.scene.popMatrix();

	//Right Propeller
	//Cylinder
	this.scene.pushMatrix();
	this.scene.translate(-0.52,-0.225,0.48);
	this.scene.scale(0.2,0.2,0.15);
	this.cylinder.display();
	this.scene.popMatrix();

	//Front Cover
	this.scene.pushMatrix();
	this.scene.translate(-0.52,-0.225,0.561);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();

	//Back Cover
	this.scene.pushMatrix();
	this.scene.translate(-0.52,-0.225,0.549);
	this.scene.rotate(180*degToRad,1,0,0);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();

	//Blade
	this.scene.pushMatrix();
	this.scene.translate(-0.52,-0.225,0.555);
	this.scene.rotate(-this.propang*degToRad,0,0,1)
	this.scene.scale(0.375,0.09,0.01); 
	this.cube.display();
	this.scene.popMatrix();


	//Vert Back Wing
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.36);
	this.scene.rotate(-90*degToRad,0,1,0);
	this.scene.rotate(-90*degToRad,0,0,1);
	this.scene.rotate(this.wingV*Math.PI/4,1	,0,0);
	this.scene.scale(1.70,0.2,0.05); 
	this.trap.display();
	this.scene.popMatrix();

	//Hor Back Wing
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.36);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(this.wingH*Math.PI/4,1,0,0);
	this.scene.scale(1.70,0.2,0.05); 
	this.trap.display();
	this.scene.popMatrix();

	//Hor Cockpit Wing
	this.scene.pushMatrix();
	this.scene.translate(0,0.785,2.8);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.scale(1.42,0.3,0.05);
	this.trap.display();
	this.scene.popMatrix();
};

MySubmarine.prototype.update = function(currTime) {
	this.posX += this.vel* Math.sin(this.angsMove);
	this.posZ += this.vel* Math.cos(this.angsMove);

	if(this.angHeight != 0){
		this.posY += this.vel*Math.sin(this.angHeight);
	}

	if(this.stopped)
		return;

	this.delta = currTime - this.lastCurrTime;
	this.lastCurrTime = currTime;

	if (this.first == 0){
		this.delta = 0;
		this.first = 1;
	}

	this.framerate = 1/(this.delta/1000);

	this.angs = (this.vel*360)/this.velMin;
	inc = this.angs/this.framerate;
	this.propang += inc;
	if(Math.abs(this.propang) > 360)
		this.propang -= 360

		if(this.perDir != 0){
			perInc = this.perSp/this.framerate;
			newHeight = this.perHeight+this.perDir*perInc;
			if(newHeight >= 1.07 || newHeight <= 0.7)
				this.perDir = 0;
			else
				this.perHeight = newHeight;
		}
};

MySubmarine.prototype.setRotate = function(rotation) {
	this.angsMove += rotation;
};

MySubmarine.prototype.setTravel = function(travel) {
	this.vel += travel/100;
};

MySubmarine.prototype.setHeight = function(height) {
	this.angHeight += height;
};

MySubmarine.prototype.setWingV = function (flag){
	this.wingV = flag;
};

MySubmarine.prototype.setWingH = function (flag){
	this.wingH = flag;
};


MySubmarine.prototype.setPeriscope = function(dir){
	this.perDir = dir;
};

MySubmarine.prototype.getPos = function(){
	pos = [this.posX, this.posY, this.posZ];
	return pos;
};

MySubmarine.prototype.getAngleXZ = function(){
	return this.angsMove;
};

MySubmarine.prototype.getAngleY = function(){
	return this.angHeight;
};
