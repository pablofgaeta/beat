//rectangles on canvas
var kickRect;
var snareRect;
var hihatRect;
var cowbellRect;
var congaRect;

// all button info
var snareSlider, hihatSlider, cowbellSlider, congaSlider;

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
var kbn = 4;
var dodo = true;

function preload() {

	//load all sounds
	drums.kick = loadSound('/sounds/drums/kick.mp3'); drums.snare = loadSound('/sounds/drums/snare.mp3'); drums.hihat = loadSound('/sounds/drums/hihat.mp3'); drums.cowbell = loadSound('/sounds/drums/cowbell.mp3'); drums.conga = loadSound('/sounds/drums/conga.mp3');
	drums.kick.amp(.5); drums.snare.amp(.2); drums.hihat.amp(.1); drums.cowbell.amp(.1); drums.conga.amp(.1);

	snareQ = new Inputs('Snare Multiplier: ' + snareCount, 5, 1);
	snareSlider = createSlider(0,13,snareCount,1); snareSlider.position(windowWidth/5+10,50); snareSlider.size(windowWidth/5-20, AUTO);
	hihatQ = new Inputs('Hihat Multiplier: ' + hihatCount, 5, 2);
	hihatSlider = createSlider(0,13,hihatCount,1); hihatSlider.position(2*windowWidth/5+10,50); hihatSlider.size(windowWidth/5-20, AUTO);
	cowbellQ = new Inputs('Cowbell Multiplier: ' + cowbellCount, 5, 3);
	cowbellSlider = createSlider(0,13,cowbellCount,1); cowbellSlider.position(3*windowWidth/5+10,50); cowbellSlider.size(windowWidth/5-20, AUTO);
	congaQ = new Inputs('Conga Multiplier: ' + congaCount, 5, 4);
	congaSlider = createSlider(0,13,congaCount,1); congaSlider.position(4*windowWidth/5+10,50); congaSlider.size(windowWidth/5-20, AUTO);
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
	makeText();
}

function draw() {
	snareCount = snareSlider.value();
	hihatCount = hihatSlider.value();
	cowbellCount = cowbellSlider.value();
	congaCount = congaSlider.value();
	snareQ.greeting.html('Snare Multiplier: ' + snareCount);
	hihatQ.greeting.html('Hihat Multiplier: ' + hihatCount);
	cowbellQ.greeting.html('Cowbell Multiplier: ' + cowbellCount);
	congaQ.greeting.html('Conga Multiplier: ' + congaCount);

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
}

class Inputs {
	constructor(title, titleLoc, sliderNum){
		this.greeting = createElement('h2', title);
	  this.greeting.position(30 + windowWidth/5*(sliderNum), titleLoc);

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

function makeText() {
	fill(0);
	textAlign(LEFT);
  textSize(12);
	text('This is a simple beat maker\n(and polyrhythm synthesizer).\n\n' +
	'To play each sound just use the \'ASDFG\' keys.\n' +
	'To make a polyrhythm, \nmove the sliders to the desired number \nand press enter to play all them together. \nPress esc to stop the beat.\n\n' +
	'(Note: The kick drum can\'t be edited because \nit is the base of the rhythms)', 10 , 20);
}

function keyPressed(){
	if(keyCode == 65){drums.kick.play(); fill(random(255), random(255), random(255)); makeRect('kick'); makeText();}
	if(keyCode == 83){drums.snare.play(); fill(random(255), random(255), random(255)); makeRect('snare');}
	if(keyCode == 68){drums.hihat.play(); fill(random(255), random(255), random(255)); makeRect('hihat');}
	if(keyCode == 70){drums.cowbell.play(); fill(random(255), random(255), random(255)); makeRect('cowbell');}
	if(keyCode == 71){drums.conga.play(); fill(random(255), random(255), random(255)); makeRect('conga');}
	if(keyCode == 13){goog();}
	if(keyCode == 27){location.reload();}
}

function goog() {
	var snareMult = snareCount / 4;
	var hihatMult = hihatCount / 4;
	var cowbellMult = cowbellCount / 4;
	var congaMult = congaCount / 4;
//number of kick beats
	kbn = math.lcm(snareCount,hihatCount,cowbellCount,congaCount);
	drums.kick.play();
	changeKick();
	for(var i = 0; i < kbn; i++){
		drums.kick.play(.5*(i+1));
		var dis = setTimeout(changeKick, 500*(i+1));
	}
	if(snareCount > 0) {
		drums.snare.play();
		changeSnare();
		for(var i = 0; i < kbn / snareMult; i++){
			drums.snare.play((.5 * snareMult)*(i+1));
			var sis = setTimeout(changeSnare, (500. * snareMult)*(i+1));
		}
	}
	if(hihatCount > 0){
		drums.hihat.play();
		changeHihat();
		for(var i = 0; i < kbn / hihatMult; i++){
			drums.hihat.play((.5 * hihatMult)*(i+1));
			var his = setTimeout(changeHihat, (500. * hihatMult)*(i+1));
		}
	}
	if(cowbellCount > 0){
		drums.cowbell.play();
		changeCowbell();
		for(var i = 0; i < kbn / cowbellMult; i++){
			drums.cowbell.play((.5 * cowbellMult)*(i+1));
			var cis = setTimeout(changeCowbell, (500. * cowbellMult)*(i+1));
		}
	}
	if(congaCount > 0){
		for(var i = 0; i < kbn / congaMult; i++){
			drums.conga.play((.5 * congaMult)*(i+1));
			var cis = setTimeout(changeConga, (500. * congaMult)*(i+1));
		}
	}
}

function changeKick() {
	fill(random(255), random(255), random(255)); makeRect('kick'); makeText();
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
