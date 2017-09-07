/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks, interior) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.interior = interior | false;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
	ang = 0;
	angnorm = Math.PI/this.slices;
	z = 1;
	zdelta = z/this.stacks; // Stack Height

	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords=[];

	var stepS=0;
	var stepT=0;

	for(i = 0; i<this.stacks; i++){
		ad_index = i*(this.slices+1);

		if(i == 0){
			for(j = 0; j <= this.slices; j++){
				ang = j*2*Math.PI/this.slices;

				x1 = Math.cos(ang);
				y1 = Math.sin(ang);

				this.vertices.push(x1,y1, i*zdelta);
				this.normals.push(x1, y1, 0);
				this.texCoords.push(stepS, stepT);

				stepS+=1/this.slices;
			}
			stepS = 0;
			stepT+= 1/this.stacks;
		}

		for(h = 0; h <= this.slices; h++){
			ang = h*2*Math.PI/this.slices;

			x1 = Math.cos(ang);
			y1 = Math.sin(ang);

			this.vertices.push(x1,y1, (i+1)*zdelta);
			this.normals.push(x1, y1, 0);
			this.texCoords.push(stepS, stepT);
			stepS+=1/this.slices;
		}

		stepS = 0;
		stepT+= 1/this.stacks;

		for(k = 0; k < this.slices; k++){
			this.indices.push(k+ad_index, k+1+ad_index, k+(this.slices+1)+ad_index);
			this.indices.push(k+1+ad_index, k+(this.slices+1)+1+ad_index, k+(this.slices+1)+ad_index);

			if(this.interior){
				this.indices.push(k+(this.slices+1)+ad_index, k+1+ad_index, k+ad_index);
				this.indices.push(k+(this.slices+1)+ad_index, k+(this.slices+1)+1+ad_index, k+1+ad_index);
			}
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
