class Stroke{
    constructor(brushName, strokeStyle = 'black'){
	if ( typeof brushName !== 'string')
	    throw new Error('brushName must be a string');
	this.brushName = brushName;
	this.strokeStyle = strokeStyle
	this.points = [];
    } 

}
const history = {
    strokes : [],
    push: function(el) {
	if (!(el instanceof Stroke))
	    throw new Error('Only Stroke instance can be pushed to history');
	this.last().points.push(el);
    },
    pop: function(){
	if (this.strokes.length)
	    return this.strokes.pop().points;

	return [];
    },

    addPoint: function(s){
	this.last().points.push(s);
    },

    initializeNewStrokesSet: function(s){
	if ( typeof s === 'undefined')
	    this.strokes.push(new Stroke('PenBrush'));
	else
	    this.strokes.push(s);
    },

    last: function(){
	return this.strokes[this.strokes.length - 1];
    }
}

