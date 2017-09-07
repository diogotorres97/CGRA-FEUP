/**
 * MyRedFish
 * @constructor
 */
function MyRedFish(scene) {
	CGFobject.call(this,scene);

	this.circle = new MyCircle(this.scene,12);
	this.triangle = new MyTriangle(this.scene,1,true);

	this.wallR = true;
	this.wallL= false;
	this.first=0;
	this.delta=0;
	this.lastCurrTime = 0;
	this.framerate = 0;
	this.x = 0;
	this.y = 0;
	this.dx = 0.15;
	this.dy = 0.001;
	this.angx = 0;
	this.angy = 0;
	this.temp=0;
	this.reverse=1;

};

MyRedFish.prototype = Object.create(CGFobject.prototype);
MyRedFish.prototype.constructor = MyRedFish;

MyRedFish.prototype.display = function() {

	this.scene.pushMatrix();
	this.scene.translate(this.x, this.y*this.y, 0);

	if(this.wallL){
		this.scene.rotate(Math.PI, 0,0,1);
		this.scene.rotate(Math.PI, 1,0,0);
	}

	this.scene.scale(0.2,0.2,0.2);

	//Head
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.rotate(-0.1,0,0,1);
	this.triangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.rotate(Math.PI/2,0,0,1);
	this.triangle.display();
	this.scene.popMatrix();

	//body
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.rotate(-0.1,0,0,1);
	this.scene.rotate(-Math.PI/2,0,0,1);
	this.scene.scale(1,2,1);
	this.triangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0.8);
	this.scene.rotate(-0.1,0,0,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.scale(2,1,1);
	this.triangle.display();
	this.scene.popMatrix();

	//tail
	this.scene.pushMatrix();
	this.scene.translate(1.6,0.4,0.8);
	this.scene.rotate(-0.1,0,0,1);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.scale(0.5,0.5,1);
	this.triangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(1.6,0.4,0.8);
	this.scene.rotate(-0.1,0,0,1);
	this.scene.rotate(3*Math.PI/2,0,0,1);
	this.scene.scale(0.5,0.5,1);
	this.triangle.display();
	this.scene.popMatrix();

	//Left
	//White eye
	this.scene.pushMatrix();
	this.scene.translate(-0.3,0.7,0.9);
	this.scene.scale(0.05,0.05,0.05);
	this.scene.materialD.apply();
	this.circle.display();
	this.scene.popMatrix();

	//Black eye
	this.scene.pushMatrix();
	this.scene.translate(-0.3,0.7,0.9);
	this.scene.scale(0.02,0.02,0.02);
	this.scene.black.apply();
	this.circle.display();
	this.scene.popMatrix();

	//Right
	//White eye
	this.scene.pushMatrix();
	this.scene.translate(-0.3,0.7,0.7);
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.rotate(Math.PI,1,0,0);
	this.scene.scale(0.05,0.05,0.05);
	this.scene.materialD.apply();
	this.circle.display();
	this.scene.popMatrix();

	//Black eye
	this.scene.pushMatrix();
	this.scene.translate(-0.3,0.7,0.7)
	this.scene.rotate(Math.PI,0,0,1);
	this.scene.rotate(Math.PI,1,0,0);
	this.scene.scale(0.02,0.02,0.02);
	this.scene.black.apply();
	this.circle.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};


MyRedFish.prototype.update = function(currTime) {

	this.delta = currTime - this.lastCurrTime;
	this.lastCurrTime = currTime;

	if (this.first == 0){
		this.delta = 0;
		this.first = 1;
		return;
	}

	this.framerate = 1/(this.delta/1000);
	this.temp += 1;

	if(this.temp % 2 == 0){	
		this.dy = 1/(2*this.framerate);
		this.dx = 6/(2*this.framerate);
		dang = 20/(10*this.framerate);

		if(this.wallL){
			this.reverse=1;
		}

		if(this.wallR){
			this.reverse=-1;
		}

		this.x += this.dx*this.reverse;
		this.y += this.dy*this.reverse;
		this.angx += dang*this.reverse;

		if(this.x >= 12){
			this.wallR = true;
			this.wallL=false;
		}
		if(this.x <=0){
			this.wallL=true;
			this.wallR=false;
		}
	}
};