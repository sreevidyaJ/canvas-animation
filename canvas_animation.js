/*
var img = document.getElementsByTagName('img'), j;
var canvas = document.createElement('canvas');
canvas.width= 1020;
canvas.height=320;
var ctx = canvas.getContext('2d');
for (var i = 0; i < img.length; i++)
{
   thisWidth = 250;
   thisHeight = 0;
b(i);
}


   function b(j){
      var imgSrc = img[j].src;
      var letterImg = new Image();
      letterImg.onload = function() {
        ctx.drawImage(letterImg,thisWidth*j,thisHeight);
      }
     letterImg.src = imgSrc;
   };
   */
/*http://jsfiddle.net/gamealchemist/Vn2Nt/6/  
document.getElementById('product-render').appendChild(canvas);

#estShippingDiv.estship-co-ord #estShipping{
	margin-right: -9px;
    width: auto;
    padding: 0;
    text-align: inherit;
    margin-left: -4px;
    height: auto;
    font-size: 1em;
}
*/
$(document).ready(function(){
//$ = document.getElementById.bind(document);
var cv = document.getElementById('cv');
var context = cv.getContext('2d');
var canvasWidth = cv.width,
    canvasHeight = cv.height;
    setupLoader();
    function setupLoader() {

    window.AnyFile = XMLHttpRequest;

    var rscCount = 1;
    var errorCount = 0;
    var errMsgs = '';

   /* window.addRsc = function (rscType, rscUrl) {
        var rsc = new rscType();
        rscCount++;
        rsc.addEventListener('load', loadEnded);
        rsc.addEventListener('error', errorWhileLoading);
        if (rscType !== AnyFile) rsc.src = rscUrl;
        else {
            rsc.open("GET", rscUrl, true);
            rsc.send(null);
        }
        return rsc;
    }*/
   // window.addEventListener('load', loadEnded);
    //window.addEventListener('error', errorWhileLoading);
	loadEnded();
    function loadEnded() {
       // rscCount--;
       // if (!rscCount) launchMain();
		launchMain();
    }

    function errorWhileLoading(e) {
        errorCount++;
        rscCount--;
        errMsgs += e.message + '\n';
        if (!rscCount) launchMain();
    }

    function launchMain() {
        if (errorCount){alert('errors while loading rsc : \n' + errMsgs);return;}
        setTimeout(main, 1000);
    }
}
function main() {
   alert('m in');
 //  fillTextureCoords(myBird, 182, 168, 14)
   launchAnimate();
}
var textureCoords = [];
//var myBird = addRsc(Image, document.getElementsByTagName('img'));
var myBird = document.getElementsByTagName('img');
var currentBird = "noimg";

function fillTextureCoords(img, tw, th, cnt) {
    var w = img.width,
        h = img.height;
    var hCount = Math.floor(w / tw),
        vCount = Math.floor(h / th);
    for (var vIndex = 0; vIndex < vCount; vIndex++)
    for (var hIndex = 0; hIndex < hCount; hIndex++) {
        textureCoords.push({
            u: hIndex * tw,
            v: vIndex * th,
            w: tw,
            h: th
        });
        if (!--cnt) return;
    }
}

function launchAnimate() {
    requestAnimationFrame(__launchAnimate, direction);
}
var lastTime = 0;

function __launchAnimate(now) {
    lastTime = now;
    requestAnimationFrame(animate, direction);
}
var applicationTime = 0;

function animate(now, direction) {
   
    // _______________________
    var dt = now - lastTime;
    if (dt > 200) dt = 16;
    lastTime = now;
    applicationTime += dt;
    // _______________________
    // draw everything    
    draw(direction);
  /*  handleInput(); // ...
    // update everything with this frame time step.
    update(dt);*/
}


function draw(direction) {
    context.fillStyle = '#CCC';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    drawThatFrame(direction);
}
var regularAnimation = [];
for (var i = 0; i < 14; i++) regularAnimation.push(i);

var shortAnimation = [4, 5, 6];

// we store all anims in a single array
// Rq : could be stored in an object
var birdAnimations = [regularAnimation, shortAnimation];

var currentAnimation = regularAnimation;

// duration of a single frame.
var frameDuration = 100;

// current time of the animation (ms).
var animationStartTime = 0;

// draws the current animation frame
function drawThatFrame(direction) {
    var animationStatus = applicationTime - animationStartTime;
    var whichFrame = Math.floor(animationStatus / frameDuration);
    whichFrame %= currentAnimation.length;
    //var tCoord = textureCoords[currentAnimation[whichFrame]];
	var curBird;
	if(currentBird == "noimg"){
		currentBird = parseInt(0, 10);
	}
	else if(direction == "left" && parseInt(currentBird, 10) == 0){
		currentBird = myBird.length;
	}else if(direction == "left"){
		currentBird = parseInt(currentBird, 10) - 1;
	}else if(direction == "right" && parseInt(currentBird, 10) == myBird.length){
		currentBird = parseInt(0, 10);
	}else{
		currentBird = parseInt(currentBird, 10) + 1;	
	}
	//curBird = parseInt(currentBird, 10);
    context.drawImage(myBird[currentBird], -120, -20);
}
var direction = "",
    oldx = 0;
document.getElementById('cv').addEventListener('mousemove',  function mousemovemethod(e) {
    
        if (e.pageX < oldx) {
            direction = "left"
			
        } else if (e.pageX > oldx) {
            direction = "right"
        }
        requestAnimationFrame(function(timestamp){animate(timestamp, direction)});  
        oldx = e.pageX;
        
});

});
