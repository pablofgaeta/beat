//rectangles on canvas
var kickRect;
var snareRect;
var hihatRect;
var cowbellRect;
var congaRect;

// all button info
let buttons = new Array();
var buttCount = 0;
var tempButtX = 30;
var tempButtY = 20;
// var checkbox;
var input, submitButton, greeting;
var kickX = [30,67];
var snareX = [130,175];
var hihatX = [230, 262];
var cowbellX = [330, 386];
var congaX = [440, 484];
var stopButton;

//all drum info
var drums = {
	kick : 'kick',
	snare : 'snare',
	hihat : 'hihat',
	cowbell : 'cowbell',
	conga : 'conga'
};
var drumTypes = ['kick', 'snare', 'hihat', 'cowbell', 'conga'];
var snareCount = parseInt(localStorage.getItem('snareCount')),
hihatCount = parseInt(localStorage.getItem('hihatCount')),
cowbellCount = parseInt(localStorage.getItem('cowbellCount')),
congaCount = parseInt(localStorage.getItem('congaCount'));
var kbn;
var dodo = true;
// var beatCheck = true;

function preload() {
	var kickQ, hihatQ, snareQ, cowbellQ, congaQ;

	//load all sounds
	drums.kick = loadSound('/sounds/drums/kick.mp3'); drums.snare = loadSound('/sounds/drums/snare.mp3'); drums.hihat = loadSound('/sounds/drums/hihat.mp3'); drums.cowbell = loadSound('/sounds/drums/cowbell.mp3'); drums.conga = loadSound('/sounds/drums/conga.mp3');
	drums.kick.amp(.5); drums.snare.amp(.2); drums.hihat.amp(.1); drums.cowbell.amp(.1); drums.conga.amp(.1);

	//load buttons
	var drumTypeIndex = 0;
	for(var r = 0; r < 4; r++){
		for(var c = 0; c < 5; c++){
			buttCount++;
			buttons[buttCount] = createButton(drumTypes[drumTypeIndex]); buttons[buttCount].position(tempButtX, tempButtY);
			buttons[buttCount].mousePressed(false);
			tempButtX += 100;
			drumTypeIndex++;
		}
		drumTypeIndex = 0;
		tempButtY += 30;
		tempButtX = 30;
	}
}

function mousePressed() {
	var xPos = mouseX;
	if(xPos > kickX[0] && xPos < kickX[1]) { drums.kick.play(); }
	else if(xPos > snareX[0] && xPos < snareX[1]) { drums.snare.play()}
	else if(xPos > hihatX[0] && xPos < hihatX[1]) { drums.hihat.play()}
	else if(xPos > cowbellX[0] && xPos < cowbellX[1]) { drums.cowbell.play()}
	else if(xPos > congaX[0] && xPos < congaX[1]) { drums.conga.play()}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	rectMode(CORNER);
	noStroke();
	fill(255,0,255);
	kickRect = rect(0,0,windowWidth/5,windowHeight);
	snareRect = rect(windowWidth/5,0,windowWidth/5,windowHeight);
	hihatRect = rect(2 * windowWidth/5,0,windowWidth/5,windowHeight);
	cowbellRect = rect(3 * windowWidth/5,0,windowWidth/5,windowHeight);
	congaRect = rect(4 * windowWidth/5,0,windowWidth/5,windowHeight);

	snareQ = new Inputs('Snare Multiplier. Previous value: ' + localStorage.getItem('snareCount'), 220);
	snareQ.submitButton.mousePressed(function() {snareCount = snareQ.input.value();
	snareQ.greeting.html('Snare Multiple is now ' + snareCount + '!');
	snareQ.input.value('');});

	hihatQ = new Inputs('Hihat Multiplier. Previous value: ' + localStorage.getItem('hihatCount'), 290);
	hihatQ.submitButton.mousePressed(function() {hihatCount = hihatQ.input.value();
	hihatQ.greeting.html('Hihat Multiple is now ' + hihatCount + '!');
	hihatQ.input.value('');});

	cowbellQ = new Inputs('Cowbell Multiplier. Previous value: ' + localStorage.getItem('cowbellCount'), 360);
	cowbellQ.submitButton.mousePressed(function() {cowbellCount = cowbellQ.input.value();
	cowbellQ.greeting.html('Cowbell Multiple is now ' + cowbellCount + '!');
	cowbellQ.input.value('');});

	congaQ = new Inputs('Conga Multiplier. Previous value: ' + localStorage.getItem('congaCount'), 430);
	congaQ.submitButton.mousePressed(function() {congaCount = congaQ.input.value();
	congaQ.greeting.html('Conga Multiple is now ' + congaCount + '!');
	congaQ.input.value('');});

  textAlign(CENTER);
  textSize(50);
}

// function draw() {
	// if(beatCheck){
	// 	beatCheck=false;
	// 	startBeat();
	// }
// }

class Inputs {
	constructor(title, titleLoc){
		this.greeting = createElement('h2', title);
	  this.greeting.position(20, titleLoc);

		this.input = createInput();
		this.input.position(20, titleLoc+60);

		this.submitButton = createButton('submit');
	  this.submitButton.position(this.input.x + this.input.width, titleLoc+60);

		this.type = title.toLowerCase().substring(0, title.indexOf(' '));
	}

}

function makeRect(type) {
	if(type == 'kick') {kickRect = rect(0,0,windowWidth/5,windowWidth);}
	if(type == 'snare') {snareRect = rect(windowWidth/5,0,windowWidth/5,windowHeight);}
	if(type == 'hihat'){hihatRect = rect(2 * windowWidth/5,0,windowWidth/5,windowHeight);}
	if(type == 'cowbell'){cowbellRect = rect(3 * windowWidth/5,0,windowWidth/5,windowHeight);}
	if(type == 'conga'){congaRect = rect(4 * windowWidth/5,0,windowWidth/5,windowHeight);}
}

function keyPressed(){
	if(keyCode == 65){drums.kick.play(); fill(random(255), random(255), random(255)); makeRect('kick');}
	if(keyCode == 83){drums.snare.play(); fill(random(255), random(255), random(255)); makeRect('snare');}
	if(keyCode == 68){drums.hihat.play(); fill(random(255), random(255), random(255)); makeRect('hihat');}
	if(keyCode == 70){drums.cowbell.play(); fill(random(255), random(255), random(255)); makeRect('cowbell');}
	if(keyCode == 71){drums.conga.play(); fill(random(255), random(255), random(255)); makeRect('conga');}
	if(keyCode == 66){goog();}
	if(keyCode == 190){
		if (typeof(Storage) !== undefined){
		localStorage.setItem("author", "Pablo Gaeta");
		localStorage.setItem("snareCount", snareCount);
		localStorage.setItem("hihatCount", hihatCount);
		localStorage.setItem("cowbellCount", cowbellCount);
		localStorage.setItem("congaCount", congaCount);
		}
		else {
			alert('NOO! u can\'t use local storage');
		}
		location.reload();
	}
}

function goog() {
	drums.kick.play();
	changeKick();
	drums.hihat.play();
	changeHihat();
	drums.cowbell.play();
	changeCowbell();

	var snareMult = snareCount / 4;
	var hihatMult = hihatCount / 4;
	var cowbellMult = cowbellCount / 4;
	var congaMult = congaCount / 4;
//number of kick beats
	kbn = math.lcm(snareCount,hihatCount,cowbellCount,congaCount);

	for(var i = 0; i < kbn; i++){
		drums.kick.play(.5*(i+1));
		var dis = setTimeout(changeKick, 500*(i+1));
	}
	for(var i = 0; i < kbn / snareMult; i++){
		drums.snare.play((.5 * snareMult)*(i+1));
		var sis = setTimeout(changeSnare, (500. * snareMult)*(i+1));
	}
	for(var i = 0; i < kbn / hihatMult; i++){
		drums.hihat.play((.5 * hihatMult)*(i+1));
		var his = setTimeout(changeHihat, (500. * hihatMult)*(i+1));
	}
	for(var i = 0; i < kbn / cowbellMult; i++){
		drums.cowbell.play((.5 * cowbellMult)*(i+1));
		var cis = setTimeout(changeCowbell, (500. * cowbellMult)*(i+1));
	}
	for(var i = 0; i < kbn / congaMult; i++){
		drums.conga.play((.5 * congaMult)*(i+1));
		var cis = setTimeout(changeConga, (500. * congaMult)*(i+1));
	}
}

function changeKick() {
	fill(random(255), random(255), random(255)); makeRect('kick');
}

function changeSnare() {
	fill(random(255), random(255), random(255)); makeRect('snare');
}

function changeHihat() {
	fill(random(255), random(255), random(255)); makeRect('hihat');
}

function changeCowbell() {
	fill(random(255), random(255), random(255)); makeRect('cowbell');
}

function changeConga() {
	fill(random(255), random(255), random(255)); makeRect('conga');
}

// function stopBeats() {
// 	drums.kick.stop();
// 	drums.snare.stop();
// 	drums.hihat.stop();
// 	stopButton = createButton('START!');
// 	stopButton.position(550, 20);
// 	stopButton.mousePressed(startBeat);
// }
//
// function startBeat() {
// 	stopButton = createButton('STOP!');
// 	stopButton.position(550, 20);
// 	stopButton.mousePressed(stopBeats);
// }
