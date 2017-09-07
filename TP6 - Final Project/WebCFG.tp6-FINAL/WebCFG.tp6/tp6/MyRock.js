/**
 * MyRock
 * @constructor
 */
function MyRock(scene) {
	CGFobject.call(this, scene);

	this.cube = new MyUnitCubeQuad(this.scene);
};

MyRock.prototype = Object.create(CGFobject.prototype);
MyRock.prototype.constructor = MyRock;

MyRock.prototype.display = function() {
	this.scene.pushMatrix();
	//this.scene.translate(0, 0, 0.5);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, -0.1, 0.5);
	this.scene.rotate(10 * degToRad, 1, 0, 0);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, -0.1, -0.5);
	this.scene.rotate(-10 * degToRad, 1, 0, 0);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.4, -0.2, 0.2);
	this.scene.rotate(-20 * degToRad, 0, 0, 1);
	this.scene.rotate(-10 * degToRad, 0, 1, 0);
	this.scene.scale(0.9,0.8,0.7);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.4, -0.1, -0.2);
	this.scene.rotate(-25 * degToRad, 0, 0, 1);
	this.scene.rotate(10 * degToRad, 0, 1, 0);
	this.scene.scale(0.9,0.8,0.7);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.4, -0.1, -0.2);
	this.scene.rotate(15 * degToRad, 0, 0, 1);
	this.scene.rotate(-14 * degToRad, 0, 1, 0);
	this.scene.scale(0.9,0.8,0.7);
	this.cube.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.translate(-0.4, -0.05, 0.2);
	this.scene.rotate(25 * degToRad, 0, 0, 1);
	this.scene.rotate(14 * degToRad, 0, 1, 0);
	this.scene.scale(0.9,0.8,0.7);
	this.cube.display();
	this.scene.popMatrix();
};