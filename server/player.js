var fs = require('fs');

var FIFO = "/tmp/mplayercontrol";
var PLAYER = "mplayer -slave -input file=" + FIFO;

var sys = require('sys')
var exec = require('child_process').exec;

var playingProcess;

function start(path) {
	if(playingProcess != null)
		playingProcess.kill();
	if(!fs.existsSync(FIFO))
		exec("mkfifo " + FIFO, fifoErrorHandler);
	playingProcess = exec(PLAYER + " " + path, playEnded);
}

function stop() {
	writeToFifo("q", fifoErrorHandler);
}

function pause() {
	writeToFifo("p", fifoErrorHandler);
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

function writeToFifo(command, callback) {
	if(isPlaying())
		exec("echo " + command + " > " + FIFO, callback);
	else
		console.log('No media is played');
}

function fifoErrorHandler(error, stdout, stderr) {
	if(error)
		console.log(error);
	console.log("parancs elkuldve");
}

function playEnded(error, stdout, stderr) {
	playingProcess = null;
	console.log(stdout);
	console.log(stderr);
	console.log('vege');
	if (error != null) {
		console.log('exec error: ' + error);
	}
}

function isPlaying() {
	return playingProcess != null;
}

exports.playEnded = playEnded;
exports.start = start;
exports.stop = stop;
exports.pause = pause;
exports.isPlaying = isPlaying;

