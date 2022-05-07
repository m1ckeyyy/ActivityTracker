const channelOne = new BroadcastChannel("CHANNEL_ONE");
const timeReview = document.getElementById("timeReview");
const timeTotal = document.getElementById("timeTotal");
const btnStart = document.getElementById("button-start");
const btnReset = document.getElementById("button-reset");
const btnSubmit = document.getElementById("button-submit");
let revHr, revMin, revSec, totHr, totMin, totSec;
let value = 0; //ms
let totalValue = 0;
let interval;

btnStart.onclick = function () {
	channelOne.postMessage("start");
	interval = setInterval(() => (value += 100), 100);
};
btnReset.onclick = function () {
	channelOne.postMessage("reset");
	resetTime();
};
btnSubmit.onclick = function () {
	channelOne.postMessage("submit");
	submitTime();
};

setInterval(update, 300);

function update() {
	revSec = (value / 1000) % 60;
	revMin = (value / 1000 / 60) % 60;
	revHr = value / 1000 / 60 / 60;
	timeReview.innerHTML = `${format(revHr)}:${format(revMin)}:${format(revSec)}`;

	totSec = (totalValue / 1000) % 60;
	totMin = (totalValue / 1000 / 60) % 60;
	totHr = totalValue / 1000 / 60 / 60;
	timeTotal.innerHTML = `${format(totHr)}:${format(totMin)}:${format(totSec)}`;
}

function resetTime() {
	clearInterval(interval);
	value = 0;
	update();
}
function submitTime() {
	totalValue += value;
	resetTime();

	timeReview.innerHTML = "00:00:00";
}

//

function format(val) {
	return val < 10 ? "0" + Math.trunc(val) : Math.trunc(val);
}
window.onload = function () {
	channelOne.postMessage("onload");
	channelOne.onmessage = (msg) => {
		value = msg.data.value;
		totalValue = msg.data.totalValue;
		if (msg.data.running) {
			interval = setInterval(() => (value += 100), 100);
		}
		update();
	};
};
