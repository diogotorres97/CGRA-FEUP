/**
 * MyInterface
 * @constructor
 */

var angTurn = Math.PI/10;
var flagN = 0;
var flagL = -1;
var flagR = 1;

function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

	this.gui.add(this.scene, 'Options');

	// add a group of controls (and open/expand by defult)

	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	group.add(this.scene, 'Light0');
	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	group.add(this.scene, 'Light4');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'Clock');
	this.gui.add(this.scene, 'Fish');
	this.gui.add(this.scene, 'Speed', -5, 5);

	// Choose from named values
	this.gui.add(this.scene, 'Textures', this.scene.submarineAppearanceList);

	this.gui.add(this.scene, 'Music');
	this.gui.add(this.scene, 'SoundFX');

	return true;
};


/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	var test = event.keycode | event.which;

	switch (test)	{

	case (65):
	case (97):
		console.log("Key 'A' pressed"); //turn left
	this.scene.sub.setRotate(angTurn);
	this.scene.sub.setWingV(flagL);
	break;

	case (68):
	case (100):
		console.log("Key 'D' pressed"); //turn right
	this.scene.sub.setRotate(-angTurn);
	this.scene.sub.setWingV(flagR);
	break;

	case (83):
	case (115):
		console.log("Key 'S' pressed"); // turn back
	this.scene.sub.setTravel(-this.scene.Speed);
	break;

	case (87):
	case (119):
		console.log("Key 'W' pressed"); // turn forward
	this.scene.sub.setTravel(this.scene.Speed);
	break;

	case (113):
	case (81):
		console.log("Key 'Q' pressed"); //turn upward
	this.scene.sub.setHeight(angTurn);
	this.scene.sub.setWingH(flagL);
	break;

	case (69):
	case (101):
		console.log("Key 'E' pressed"); //turn downward
	this.scene.sub.setHeight(-angTurn);
	this.scene.sub.setWingH(flagR);
	break;

	case (80):
	case (112):
		console.log("Key 'P' pressed"); //turn periscope upward
	this.scene.sub.setPeriscope(1);
	break;

	case (76):
	case (108):
		console.log("Key 'L' pressed"); //turn periscope downward
	this.scene.sub.setPeriscope(-1);
	break;

	case (70):
	case (102):
		console.log("Key 'F' pressed"); //Fire torpedo
	this.setTarget();
	break;

	case(82):
	case(114):
		console.log("Key 'R' pressed"); //Create new targets
	this.scene.targets.push(new MyTarget(this.scene, Math.floor(Math.random()*16), Math.floor(Math.random()*11), Math.floor(Math.random()*16)));
	break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	this.scene.sub.setWingH(flagN);
	this.scene.sub.setWingV(flagN);
};

MyInterface.prototype.setTarget = function() {
	target = this.scene.getNextTarget();
	if(target == null)
		return;
	torpedo = this.scene.getTorpedo();
	torpedo.setTarget(target, this.scene.sub.getPos(), this.scene.sub.getAngleXZ(), this.scene.sub.getAngleY());
	this.scene.torpedos.push(torpedo);
};


