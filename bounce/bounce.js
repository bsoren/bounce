
var BALL_SPEED = 2;
var BALL_SIZE = 50;
var ANIMATION_INTERVAL = 5;
var goingDown = true;
var goingLeft = true;

var container = document.getElementById("myContainer");
var ball =  document.getElementById("ball_1");

var containerDim = getOffset(container);
var ballDim = getOffsetRect(ball);

function init(){

	var animateButton = document.getElementById("button_1");
	animateButton.onclick = myMove;

	var stopButton = document.getElementById("button_stop");
	stopButton.onclick = stopAnimation;


	console.log("container dimensions : top: "+ containerDim.top + " left: " + containerDim.left);
	console.log("ball dimensions : top: "+ ballDim.top + " left: " + ballDim.left);
}

function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()
    
    var body = document.body
    var docElem = document.documentElement
    
    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    // (4)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    
    return { top: Math.round(top), left: Math.round(left) }
}

function getOffset(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem)
    } else { // old browser
       // return getOffsetSum(elem)
   }
}

function stopAnimation(){
	isStopAnimation = true;
	var elem = document.getElementById("ball_1"); 
	var container = document.getElementById("myContainer");
	var ballCord = getOffset(elem);
	var containerDim = getOffset(container);

	elemTop = 0;
	elemLeft = 0;
	elem.style.top = elemTop + 'px'; 
	elem.style.left = elemLeft + 'px';
	return isStopAnimation;
}

function startAnimation(){
	isStopAnimation = false;
	return isStopAnimation;
}

function myMove(){

	startAnimation();

	var elem = document.getElementById("ball_1"); 
	var container = document.getElementById("myContainer");
	var ballCord = getOffset(elem);
	var containerDim = getOffset(container);

	var startingBallTop = containerDim.top - ballCord.top;

	console.debug("elemTop "+ ballCord.top);
	console.debug("elemLeft " + ballCord.left);

	elemTop = parseFloat(containerDim.top) - parseFloat(ballCord.top);
	elemLeft = parseFloat(containerDim.left) - parseFloat(ballCord.left);
	var id = setInterval(frame, ANIMATION_INTERVAL);

	function frame() {

		if(isStopAnimation){
			clearInterval(id);
			return;
		}

		if(goingLeft){
			if(elemLeft + BALL_SIZE >= 1000){
				goingLeft = false;
			}
			increaseElemLeft();
		}

		if(!goingLeft){
			if(elemLeft <= 0 ){
				goingLeft = true;
			}
			decreaseElemLeft();
		}

		if(!goingDown) {
			decreaseElemTop();
			if(elemTop <= startingBallTop ){
				goingDown = true;
			}
		} 

		if(goingDown){
			increaseElemTop();
			if(elemTop + BALL_SIZE >= 300){
				goingDown = false;
			}
		}

		elem.style.top = elemTop + 'px'; 
		elem.style.left = elemLeft + 'px';
	}

	function increaseElemTop() {
		elemTop = elemTop + BALL_SPEED;
	}

	function decreaseElemTop() {
		elemTop = elemTop - BALL_SPEED;
	}

	function increaseElemLeft() {
		elemLeft = elemLeft + BALL_SPEED;
	}

	function decreaseElemLeft() {
		elemLeft = elemLeft - BALL_SPEED;
	}
}

