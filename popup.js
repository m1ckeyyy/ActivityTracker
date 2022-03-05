const channel = new BroadcastChannel("CHANNEL_ONE");

const timeReview = document.getElementById("timeReview");
const timeTotal = document.getElementById("timeTotal");
const btnStart = document.getElementById("button-start");
const btnReset = document.getElementById("button-reset");
const btnSubmit = document.getElementById("button-submit");
let revHr, revMin, revSec, totHr, totMin, totSec;
let time = 0; //ms
let totalTime = 0;
let interval;
btnStart.onclick = function () {
	channel.postMessage("start");
	interval = setInterval(() => (time += 100), 100);
};
btnReset.onclick = function () {
	channel.postMessage("reset");
	resetTime();
};
btnSubmit.onclick = function () {
	channel.postMessage("submit");
	submitTime();
};
window.onload = function () {
	channel.postMessage("onload");
	channel.onmessage = (msg) => {
		time = msg.data.time;
		totalTime = msg.data.totalTime;
		if (msg.data.running) {
			interval = setInterval(() => (time += 100), 100);
		}
		update();
	};
};
setInterval(update, 300);

function update() {
	revSec = (time / 1000) % 60;
	revMin = (time / 1000 / 60) % 60;
	revHr = time / 1000 / 60 / 60;
	timeReview.innerHTML = `${format(revHr)}:${format(revMin)}:${format(revSec)}`;

	totSec = (totalTime / 1000) % 60;
	totMin = (totalTime / 1000 / 60) % 60;
	totHr = totalTime / 1000 / 60 / 60;
	timeTotal.innerHTML = `${format(totHr)}:${format(totMin)}:${format(totSec)}`;
}

function resetTime() {
	clearInterval(interval);
	time = 0;
	update();
}
function submitTime() {
	clearInterval(interval);
	interval = 0;
	totalTime += time;
	time = 0;
	timeReview.innerHTML = "00:00:00";
	update();
}

//

function format(value) {
	return String(Math.trunc(value)).padStart(2, "0");
}
