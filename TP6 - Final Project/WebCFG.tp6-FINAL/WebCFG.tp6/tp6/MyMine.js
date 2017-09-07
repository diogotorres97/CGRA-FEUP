/**
 * MyMine
 * @constructor
 */

function MyMine(scene) {
	CGFobject.call(this,scene);

	this.sphere = new MyLamp(this.scene,20,10,true);
	this.cylinder = new MyCylinder(this.scene,20,4);
	this.circle = new MyCircle(this.scene,20);
};

MyMine.prototype = Object.create(CGFobject.prototype);
MyMine.prototype.constructor = MyMine;

MyMine.prototype.display = function() {

	//Sphere
	this.scene.pushMatrix();
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.scene.scale(0.5,0.5,0.5);
	this.sphere.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.scene.scale(0.5,0.5,0.5);
	this.sphere.display();
	this.scene.popMatrix();

	//Top Cylinder		
	this.scene.pushMatrix();
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.scene.translate(0,0,0.49);
	this.scene.scale(0.05,0.05,0.2);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.scene.translate(0,0,0.69);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();


	//Middle Cylinders
	angY = -45;
	angXZ = 0;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 6; j++){
			this.scene.pushMatrix();
			this.scene.rotate(angXZ*degToRad, 0, 1, 0);
			this.scene.rotate(angY*degToRad, 1, 0, 0);
			this.scene.translate(0,0,0.49);
			this.scene.scale(0.05,0.05,0.2);
			this.cylinder.display();
			this.scene.popMatrix();


			this.scene.pushMatrix();
			this.scene.rotate(angXZ*degToRad, 0, 1, 0);
			this.scene.rotate(angY*degToRad, 1, 0, 0);
			this.scene.translate(0,0,0.69);
			this.scene.scale(0.05,0.05,1);
			this.circle.display();
			this.scene.popMatrix();

			angXZ += 60;
		}
		angY += 45;
		angXZ = 0;
	}

	//Bottom Cylinder
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.scene.translate(0,0,0.49);
	this.scene.scale(0.05,0.05,0.2);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.scene.translate(0,0,0.69);
	this.scene.scale(0.05,0.05,1);
	this.circle.display();
	this.scene.popMatrix();

};