/*
  uberlibrary

  library for three dimensional vectors.

  by Rouan van der Ende (fluentart.com)

  2014 04 25
*/

function Vector(optional) { 
  if (optional) {
    this.x = optional.x
    this.y = optional.y
    this.z = optional.z
    this.w = optional.w
  } else {
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0
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

Line.prototype.slope = function () {

	if (this.x2 == this.x1) { return 99999999999}
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

  var status = {status: 0, x: 0, y: 0}

  if (this.equals(b)) {
    //the lines are the same
    status.status = 1;
    return status;
  }

  if (atemp.slope() > 9999) {
    atemp = new Line(b)
    btemp = new Line(a)
  }
  
  //move origin to center of a
  
  var offsetx = (atemp.x1+atemp.x2)/2
  var offsety = (atemp.y1+atemp.y2)/2

  atemp.x1 -= offsetx;
  atemp.y1 -= offsety;
  atemp.x2 -= offsetx;
  atemp.y2 -= offsety;

  btemp.x1 -= offsetx;
  btemp.y1 -= offsety;
  btemp.x2 -= offsetx;
  btemp.y2 -= offsety;

  //rotate all so a lies on y axis

    //find angle to y axis
    var anglevector = new Vector({x:atemp.x1, y:atemp.y1, z:0})
    var yvector = new Vector({x:0,y:1,z:0})
    anglevector.normalize();            
    var angle = anglevector.angle(yvector)
    var zvector = new Vector(anglevector)
    zvector.cross(yvector)
    zvector.normalize()
    //rotate to match y axis
    atemp.rotate(zvector, angle)
    btemp.rotate(zvector, angle)

    //calculate if/where b intersects with y axis
    var slope = btemp.slope() //(btemp.y2 - btemp.y1)/(btemp.x2 - btemp.x1)
    var c = btemp.y1 - slope*btemp.x1
    var intersectionPoint = new Vector({x:0,y:c,z:0})

    //export for debug
    var testa = new Line(atemp)
    var testb = new Line(btemp)    
    status.testa = testa
    status.testb = testb
    

    status.testc = c
    //status.status = 1
    //test if actual hit on length of atemp
    if ((status.testa.y2 <= c)&&(c <= status.testa.y1)) {
      status.status = 2
      if ((status.testb.x1 < 0)&&(status.testb.x2 < 0)) { status.status = 1}
      if ((status.testb.x1 > 0)&&(status.testb.x2 > 0)) { status.status = 1}
    }
  
  // reverse transformations
    intersectionPoint.rotate(zvector, -angle)              
    atemp.rotate(zvector, -angle)
    btemp.rotate(zvector, -angle)            
    atemp.x1 += offsetx;
    atemp.y1 += offsety;
    atemp.x2 += offsetx;
    atemp.y2 += offsety;
    btemp.x1 += offsetx;
    btemp.y1 += offsety;
    btemp.x2 += offsetx;
    btemp.y2 += offsety;
    intersectionPoint.x += offsetx;           
    intersectionPoint.y += offsety;  

    //console.log(intersectionPoint)
    
    status.x = intersectionPoint.x
    status.y = intersectionPoint.y
    status.atemp = atemp
    status.btemp = btemp
    return status
}

Line.prototype.equals = function (b) {
  if ((this.x1 == b.x1)&&(this.y1 == b.y1)&&(this.x2 == b.x2)&&(this.y2 == b.y2)) {
    return 1
  } else {
    return 0
  }

}

Line.prototype.intersectold = function (lineA, lineB){
	//warning this function seems buggy
	//rather use the newer Line.intersect

	var x1 = lineA.x1
	var y1 = lineA.y1
	var x2 = lineA.x2
	var y2 = lineA.y2

	var x3 = lineB.x1
	var y3 = lineB.y1
	var x4 = lineB.x2
	var y4 = lineB.y2

	var a1, a2, b1, b2, c1, c2;
	var r1, r2 , r3, r4;
	var denom, offset, num;

	//status 
	// 0 = no intersect
	// 1 = colinear
	// 2 = intersects
	var result = {status: 0, x: 0, y: 0}

	// Compute a1, b1, c1, where line joining points 1 and 2
	// is "a1 x + b1 y + c1 = 0".
	a1 = y2 - y1;
	b1 = x1 - x2;
	c1 = (x2 * y1) - (x1 * y2);

	// Compute r3 and r4.
	r3 = ((a1 * x3) + (b1 * y3) + c1);
	r4 = ((a1 * x4) + (b1 * y4) + c1);

	// Check signs of r3 and r4. If both point 3 and point 4 lie on
	// same side of line 1, the line segments do not intersect.
	if ((r3 != 0) && (r4 != 0) && same_sign(r3, r4)){
		result.status = 0
	return result;
	}

	// Compute a2, b2, c2
	a2 = y4 - y3;
	b2 = x3 - x4;
	c2 = (x4 * y3) - (x3 * y4);

	// Compute r1 and r2
	r1 = (a2 * x1) + (b2 * y1) + c2;
	r2 = (a2 * x2) + (b2 * y2) + c2;

	// Check signs of r1 and r2. If both point 1 and point 2 lie
	// on same side of second line segment, the line segments do
	// not intersect.
	if ((r1 != 0) && (r2 != 0) && (same_sign(r1, r2))){
		result.status = 0
	return result;
	}

	//Line segments intersect: compute intersection point.
	denom = (a1 * b2) - (a2 * b1);

	if (denom == 0) {
		result.status = 1
	return result;
	}

	if (denom < 0){ 
	offset = -denom / 2; 
	} 
	else {
	offset = denom / 2 ;
	}

	// The denom/2 is to get rounding instead of truncating. It
	// is added or subtracted to the numerator, depending upon the
	// sign of the numerator.
	num = (b1 * c2) - (b2 * c1);
	if (num < 0){
	x = (num - offset) / denom;
	} 
	else {
	x = (num + offset) / denom;
	}

	num = (a2 * c1) - (a1 * c2);
	if (num < 0){
	y = ( num - offset) / denom;
	} 
	else {
	y = (num + offset) / denom;
	}

	// lines_intersect
	result.status = 2
	result.x = x;  
	result.y = y;  
	return result;
}


var same_sign = function ( a,  b){
  return (( a * b) >= 0);
}