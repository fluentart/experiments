require('./static/lib/vectors.js')


//Intersect test

var LineHorizontal = new Line({x1:-10,y1:0,x2:10,y2:0})
var LineVertical = new Line({x1:0,y1:10,x2:0,y2:-10})

console.log(LineHorizontal.Intersect(LineVertical))