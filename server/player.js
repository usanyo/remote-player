var fs = require('fs');

var FIFO = "/tmp/mplayercontrol";
var PLAYER = "mplayer -slave -input file=" + FIFO;

var sys = require('sys')
var exec = require('child_process').exec;

var log = function(){}
var setStatus = function(){}
var isPaused = false;

function init(logFunction, setStatusFunction) {
	log = logFunction;
	setStatus = setStatusFunction;
}

function start(path) {
	if(exports.playingProcess == null) {
		if(!fs.existsSync(FIFO))
			exec("mkfifo " + FIFO, fifoErrorHandler);
		exports.playingProcess = exec(PLAYER + " " + path, playEnded);
		log('start playing ' + path);
	}
	setStatus(true);
	isPaused = false;
}

function stop() {
	writeToFifo("q", fifoErrorHandler);
}

function pause() {
	writeToFifo("p", fifoErrorHandler);
	setStatus(isPaused);
	isPaused = !isPaused;
}

function seekP30() {
	writeToFifo("right", fifoErrorHandler);
}

function seekM30() {
	writeToFifo("left", fifoErrorHandler);
}

function seekP600() {
	writeToFifo("up", fifoErrorHandler);
}

function seekM600() {
	writeToFifo("down", fifoErrorHandler);
}

function volumeUp() {
	writeToFifo("+", fifoErrorHandler);
}

function volumeDown() {
	writeToFifo("-", fifoErrorHandler);
}

function previousAudio() {
	writeToFifo("j", fifoErrorHandler);
}

function nextAudio() {
	writeToFifo("k", fifoErrorHandler);
}

function previousSubtitle() {
	writeToFifo("n", fifoErrorHandler);
}

function nextSubtitle() {
	writeToFifo("m", fifoErrorHandler);
}

function toggleSubtitle() {
	writeToFifo("s", fifoErrorHandler);
}

function writeToFifo(command) {
	if(isPlaying())
		exec("echo " + command + " > " + FIFO, log);
	else
		log("No media is played.");
}

function fifoErrorHandler(error, stdout, stderr) {
	if(error)
		console.log(error);
}

function playEnded(error, stdout, stderr) {
	exports.playingProcess = null;
	console.log(stdout);
	console.log(stderr);
	if (error != null) {
		console.log('exec error: ' + error);
	}
	log("vege");
	setStatus(false);
}

function isPlaying() {
	return exports.playingProcess != null;
}

exports.playEnded = playEnded;
exports.start = start;
exports.stop = stop;
exports.pause = pause;
exports.isPlaying = isPlaying;
exports.init = init;

