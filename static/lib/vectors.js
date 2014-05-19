/*
  uberlibrary

  library for three dimensional vectors.

  by Rouan van der Ende (fluentart.com)

*/


var Point = function (optional) { 
  if (optional) {
    this.x = optional.x
    this.y = optional.y
  } else {
    this.x = 0
    this.y = 0
  }
}

Point.prototype.scale = function (factor) {
  this.x *= factor
  this.y *= factor
}

function Vector(optional) { 
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0

  if (optional) {
    if (optional.x) {this.x = optional.x}
    if (optional.y) {this.y = optional.y}
    if (optional.z) {this.z = optional.z}
    if (optional.w) {this.w = optional.w}
  }

}

Vector.prototype.x = 0.0
Vector.prototype.y = 0.0
Vector.prototype.z = 0.0
Vector.prototype.w = 0.0

Vector.prototype.length = function () {
  return Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z )
}

Vector.prototype.normalize = function() {
  //scales a vector back to a unit vector. It will have a length of 1
  var lengthval = this.length()
  if (lengthval != 0) {
    this.x /= lengthval;
    this.y /= lengthval;
    this.z /= lengthval; 
    return true 
  } else { 
    return false
  }
}

Vector.prototype.tempnormalize = function() {
  //scales a vector back to a unit vector. It will have a length of 1
  var norm = new Vector(this) 
  
  var lengthval = this.length()
  if (lengthval != 0) {
    norm.x /= lengthval;
    norm.y /= lengthval;
    norm.z /= lengthval; 
    return norm 
  } else { 
    return norm
  }
}

Vector.prototype.move = function (point) {
  var p = new Point(point)
  this.x += p.x;
  this.y += p.y;
}

 Vector.prototype.angle = function(bvector) {
  //returns the Angle between two vectors. 0-2PI
  //we create some temporary vectors so we can normalize them savely
  var anorm = new Vector(this)  
  anorm.normalize()
  var bnorm = new Vector(bvector)
  bnorm.normalize()
  var dotval = anorm.dot(bnorm);
  return Math.acos(dotval);
}

Vector.prototype.cross = function(vectorB)
{
  var tempvec = new Vector(this) 
  tempvec.x = (this.y*vectorB.z) - (this.z*vectorB.y);
  tempvec.y = (this.z*vectorB.x) - (this.x*vectorB.z);
  tempvec.z = (this.x*vectorB.y) - (this.y*vectorB.x);
  this.x = tempvec.x
  this.y = tempvec.y
  this.z = tempvec.z
  this.w = tempvec.w
}

Vector.prototype.crossNew = function(vectorB)
{
  var tempvec = new Vector(this) 
  tempvec.x = (this.y*vectorB.z) - (this.z*vectorB.y);
  tempvec.y = (this.z*vectorB.x) - (this.x*vectorB.z);
  tempvec.z = (this.x*vectorB.y) - (this.y*vectorB.x);
  return tempvec
}

Vector.prototype.dot = function (vectorB)
{
  //returns the total from multiplying two vectors together. dotproduct
  return this.x*vectorB.x+this.y*vectorB.y+this.z*vectorB.z; 
}

 Vector.prototype.QuaternionMultiply = function(vectorB) {
  var out = new Vector();
  out.w = this.w*vectorB.w - this.x*vectorB.x - this.y*vectorB.y - this.z*vectorB.z;
  out.x = this.w*vectorB.x + this.x*vectorB.w + this.y*vectorB.z - this.z*vectorB.y;
  out.y = this.w*vectorB.y - this.x*vectorB.z + this.y*vectorB.w + this.z*vectorB.x;
  out.z = this.w*vectorB.z + this.x*vectorB.y - this.y*vectorB.x + this.z*vectorB.w;
  this.x = out.x
  this.y = out.y
  this.z = out.z
  this.w = out.w
}

 Vector.prototype.rotate = function (inputaxis, inputangle) {
  
  var vector = new Vector(this)
  vector.w = 0

  var axis = new Vector({ 
    x: inputaxis.x * Math.sin(inputangle/2),     
    y: inputaxis.y * Math.sin(inputangle/2),     
    z: inputaxis.z * Math.sin(inputangle/2),     
    w: Math.cos(inputangle/2)} 
    )
  
  var axisInv = new Vector({ x: -axis.x, y: -axis.y, z: -axis.z, w: axis.w}  )
  
  axis.QuaternionMultiply(vector)
  axis.QuaternionMultiply(axisInv)

  this.x = axis.x
  this.y = axis.y
  this.z = axis.z
}

 Vector.prototype.scale = function (scale) { 
  this.x *= scale
  this.y *= scale
  this.z *= scale
 }

Vector.prototype.distance = function (vectorb) {
  //returns the distance from this xyz and vectorb's xyz.
  var distance = new Vector()
  distance.x = this.x - vectorb.x;
  distance.y = this.y - vectorb.y;
  distance.z = this.z - vectorb.z;
  return distance;
}

Vector.prototype.add2 = function (vectorb) {
  this.x += vectorb.x
  this.y += vectorb.y
  this.z += vectorb.z
}

Vector.prototype.add = function (vectorb) {
  var addedvector = new Vector()
  addedvector.x = this.x
  addedvector.y = this.y
  addedvector.z = this.z
  addedvector.x += vectorb.x
  addedvector.y += vectorb.y
  addedvector.z += vectorb.z
  return addedvector
}

Vector.prototype.minus = function (vectorb) {
  var addedvector = new Vector()
  addedvector.x = this.x
  addedvector.y = this.y
  addedvector.z = this.z
  addedvector.x -= vectorb.x
  addedvector.y -= vectorb.y
  addedvector.z -= vectorb.z
  return addedvector
}

/*
  lines.js

  library for two dimensional vectors

  by Rouan van der Ende (fluentart.com)

  2014 04 25
*/

function Line(optional) { 
  if (optional) {
    this.x1 = optional.x1
    this.y1 = optional.y1
    this.x2 = optional.x2
    this.y2 = optional.y2
  } else {
	this.x1 = 0.0
	this.y1 = 0.0
	this.x2 = 0.0
	this.y2 = 0.0
  }
}

Line.prototype.x1 = 0.0
Line.prototype.y1 = 0.0
Line.prototype.x2 = 0.0
Line.prototype.y2 = 0.0

Line.prototype.scale = function (scale) {
	var centerx = (this.x1 + this.x2)/2
	var centery = (this.y1 + this.y2)/2

	var tempx1 = this.x1 - centerx
	var tempy1 = this.y1 - centery
	var tempx2 = this.x2 - centerx
	var tempy2 = this.y2 - centery

	tempx1 *= scale
	tempy1 *= scale
	tempx2 *= scale
	tempy2 *= scale

	tempx1 = tempx1 + centerx
	tempy1 = tempy1 + centery
	tempx2 = tempx2 + centerx
	tempy2 = tempy2 + centery

	this.x1 = tempx1
	this.y1 = tempy1
	this.x2 = tempx2
	this.y2 = tempy2
}

Line.prototype.v1 = function () {
  var v1 = new Vector({x:this.x1, y:this.y1})
  return v1
}

Line.prototype.v2 = function () {
  var v2 = new Vector({x:this.x2, y:this.y2})
  return v2
}

Line.prototype.slope = function () {

	if (this.x2 == this.x1) { return Infinity }
	var slope = (this.y2 - this.y1)/(this.x2 - this.x1)
	return slope
}

Line.prototype.rotate = function (vectoraxis, angle) {
	var tempvec1 = new Vector({x:this.x1, y: this.y1, z:0})
	var tempvec2 = new Vector({x:this.x2, y: this.y2, z:0})
	tempvec1.rotate(vectoraxis,angle)
	tempvec2.rotate(vectoraxis,angle)
	this.x1 = tempvec1.x
	this.y1 = tempvec1.y
	this.x2 = tempvec2.x
	this.y2 = tempvec2.y
}

//calculates the intersection point for this line and another (b)
Line.prototype.intersect = function (b) {
  var atemp = new Line(this)
  var btemp = new Line(b)

  var status = new Vector();
  status.status = 0;
  if (this.equals(b)) {
    //the lines are the same
    status.status = 1;
    return status;
  }

  if (atemp.slope() == btemp.slope()) {
    status.status = 1;
    return status; 
  }

  //swap
  if (atemp.slope() > btemp.slope()) {
    atemp = new Line(b)
    btemp = new Line(this)
  }
  
    //move origin to center of line a    
    var center = new Point(atemp.center());
    center.scale(-1)
    atemp.move(center)
    btemp.move(center)

    ////////////////////////////////////////////
    //rotate all so a lies on y axis

    //find angle to y axis
    var anglevector = new Vector({x:atemp.x1, y:atemp.y1, z:0});
    var yvector = new Vector({x:0,y:1,z:0});
    anglevector.normalize();            
    var angle = anglevector.angle(yvector);
    var zvector = new Vector(anglevector);
    zvector.cross(yvector);
    zvector.normalize();
    //rotate to match y axis
    atemp.rotate(zvector, angle);
    btemp.rotate(zvector, angle);

    ////////////////////////////////////////////////////
    //calculate if/where b intersects with y axis
    var slope = btemp.slope();
    var c = btemp.y1 - slope*btemp.x1;
    var intersectionPoint = new Vector({x:0,y:c,z:0})

    //export for debug
    var testa = new Line(atemp);
    var testb = new Line(btemp); 
    status.testa = testa;
    status.testb = testb;
    status.testc = c

    //test if actual hit on length of atemp
    if ((status.testa.y2 <= c)&&(c <= status.testa.y1)) {
      status.status = 2;
      if ((status.testb.x1 < 0)&&(status.testb.x2 < 0)) { status.status = 1}
      if ((status.testb.x1 > 0)&&(status.testb.x2 > 0)) { status.status = 1}
    }
  
    // reverse transformations to find original position of intersection point
    intersectionPoint.rotate(zvector, -angle);              
    center.scale(-1);
    intersectionPoint.move(center);
    
    status.x = intersectionPoint.x;
    status.y = intersectionPoint.y;
    return status
}

Line.prototype.equals = function (b) {
  if ((this.x1 == b.x1)&&(this.y1 == b.y1)&&(this.x2 == b.x2)&&(this.y2 == b.y2)) {
    return 1
  } else {
    return 0
  }

}

//returns the center point of a line
Line.prototype.center = function () {
    return {x: (this.x1+this.x2)/2 , y: (this.y1+this.y2)/2}
}

//returns the center point of a line
Line.prototype.move = function (point) {
  var p = new Point(point)
  this.x1 += p.x;
  this.y1 += p.y;
  this.x2 += p.x;
  this.y2 += p.y;
}


var same_sign = function ( a,  b){
  return (( a * b) >= 0);
}

var module = {}
module.exports = {}
module.exports.Line = Line
module.exports.Vector = Vector
module.exports.Point = Point