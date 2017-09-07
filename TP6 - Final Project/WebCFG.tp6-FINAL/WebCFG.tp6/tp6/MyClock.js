/**
 * MyClock
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
	this.stopped = false;
	this.delta = 0;
	this.lastCurrTime = 0;

	this.first = 0;

	this.cylinder = new MyCylinder(this.scene,12,1,true);
	this.circle = new MyCircle(this.scene,12);
	this.sechand = new MyClockHand(this.scene);
	this.minhand = new MyClockHand(this.scene);
	this.hourhand = new MyClockHand(this.scene);

	var currDate = new Date(); 

	this.sechand.setAngle(currDate.getSeconds() * 1.0 / 60.0 * 360.0);
	this.minhand.setAngle(currDate.getMinutes() * 1.0 / 60.0 * 360.0);
	if(currDate.getHours() > 12) {
		this.hourhand.setAngle((currDate.getHours() - 12) * 1.0 / 12.0 * 360.0);
	} else this.hourhand.setAngle(currDate.getHours() * 1.0 / 12.0 * 360.0);

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

	//Cylinder
	this.cylinder.display();

	//Top
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.scene.clockAppearance.apply();
	this.circle.display();
	this.scene.popMatrix();

	//SecHand
	this.scene.pushMatrix();
	this.scene.rotate(-this.sechand.angle * Math.PI / 180, 0, 0, 1);
	this.scene.translate(0, 0, 1.01);
	this.scene.scale(0.05,0.9,1);
	this.scene.black.apply();
	this.sechand.display();
	this.scene.popMatrix();

	//MinHand
	this.scene.pushMatrix();
	this.scene.rotate(-this.minhand.angle * Math.PI / 180, 0, 0, 1);
	this.scene.translate(0, 0, 1.02);
	this.scene.scale(0.075,0.6,1);
	this.scene.black.apply();
	this.minhand.display();
	this.scene.popMatrix();

	//HourHand
	this.scene.pushMatrix();
	this.scene.rotate(-this.hourhand.angle * Math.PI / 180, 0, 0, 1);
	this.scene.translate(0, 0, 1.03);
	this.scene.scale(0.1, 0.4,1);
	this.scene.black.apply();
	this.hourhand.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function(currTime) {

	if(this.stopped)
		return;

	this.delta = currTime - this.lastCurrTime;
	this.lastCurrTime = currTime;

	if (this.first == 0)
	{
		this.delta = 0;
		this.first = 1;
	}
	this.sechand.setAngle(this.sechand.angle + 360 / 60* (this.delta / 1000));
	this.minhand.setAngle(this.minhand.angle + 360 / (60 * 60) * (this.delta / 1000));
	this.hourhand.setAngle(this.hourhand.angle + 360 / (60 * 60 * 60) * (this.delta / 1000));
};
