const channel = new BroadcastChannel("CHANNEL_ONE");

let actionType;

let time = null;
let startTime;

let interval;
let intervalTwo;
let breakStart = 0;
let curStop = 0;
let sumStop = 0;

channel.onmessage = (msg) => {
	actionType = msg.data;

	if (actionType === "start") {
		if (breakStart !== 0) {
			curStop = new Date() - breakStart;
		}
		sumStop += curStop;

		if (time === null) {
			startTime = new Date();
		}
		counter();
		interval = setInterval(counter, 100);
		intervalTwo = setInterval(send, 100);
	}
	if (actionType === "stop") {
		breakStart = new Date();
		clearInterval(interval);
	}
	if (actionType === "reset") {
		clearInterval(interval);
		time = null;
		startTime = null;
		curStop = 0;
		sumStop = 0;
		breakStart = 0;
		channel.postMessage("default");
	}
	if (actionType === "submit") {
		clearInterval(interval);
		time = null;
		curStop = 0;
		sumStop = 0;
		breakStart = 0;
		channel.postMessage("submit");
	}
};

function counter() {
	time = new Date() - startTime - sumStop;
}
function send() {
	channel.postMessage(time);
}
//bc.close();
