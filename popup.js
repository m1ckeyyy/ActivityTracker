// let state = { counterState: null, isLoaded: false, isSaved: false };
const channel = new BroadcastChannel("CHANNEL_ONE");

let revHr = document.getElementById("reviewHours");
let revMin = document.getElementById("reviewMinutes");
let revSec = document.getElementById("reviewSeconds");
let revHrValue = 0;
let revMinValue = 0;
let revSecValue = 0;
let totalHr = document.getElementById("totalHours");
let totalMin = document.getElementById("totalMinutes");
let totalSec = document.getElementById("totalSeconds");
let totalHrValue = 0;
let totalMinValue = 0;
let totalSecValue = 0;
let time;

const btnStart = document.getElementById("button-start");
const btnStop = document.getElementById("button-stop");
const btnReset = document.getElementById("button-reset");
const btnSubmit = document.getElementById("button-submit");

btnStart.onclick = function () {
	channel.postMessage("start");
	// btnStart.disabled = true;
	// btnReset.disabled = false;
};
btnStop.onclick = function () {
	channel.postMessage("stop");
	// btnStart.disabled = false;
};
btnReset.onclick = function () {
	channel.postMessage("reset");
	// btnReset.disabled = true;
	// btnStart.disabled = false;
};
btnSubmit.onclick = function () {
	channel.postMessage("submit");

	// btnStart.disabled = false;
};

channel.onmessage = (msg) => {
	if (typeof msg.data === "number") {
		time = msg.data;
		revSecValue = (time / 1000) % 60;
		revMinValue = (time / 1000 / 60) % 60;
		revHrValue = time / 1000 / 60 / 60;

		revSec.innerHTML = format(revSecValue);
		revMin.innerHTML = format(revMinValue);
		revHr.innerHTML = format(revHrValue);
	}
	if (msg.data === "default") {
		time = 0;
		revSec.innerHTML = "00";
		revMin.innerHTML = "00";
		revHr.innerHTML = "00";
		revSecValue = 0;
		revMinValue = 0;
		revHrValue = 0;
	}
	if (msg.data === "submit") {
		totalSecValue += revSecValue;
		totalMinValue += revMinValue;
		totalHrValue += revHrValue;
		totalSec.innerHTML = format(totalSecValue);
		totalMin.innerHTML = format(totalMinValue);
		totalHr.innerHTML = format(totalHrValue);
		revSecValue = 0;
		revMinValue = 0;
		revHrValue = 0;

		revSec.innerHTML = "00";
		revMin.innerHTML = "00";
		revHr.innerHTML = "00";
	}
};

window.onload = function () {
	if (revSecValue > 0) {
		revSec.innerHTML = format(revSecValue);
		revMin.innerHTML = format(revMinValue);
		revHr.innerHTML = format(revHrValue);
	}
	if (totalSecValue > 0) {
		totalSec.innerHTML = format(totalSecValue);
		totalMin.innerHTML = format(totalMinValue);
		totalHr.innerHTML = format(totalHrValue);
	}
};
//bc.close();

function format(value) {
	return String(Math.trunc(value)).padStart(2, "0");
}
