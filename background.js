const channel = new BroadcastChannel("CHANNEL_ONE");
let actionType, interval;
let totalTime = 0;
const state = {
	running: false,
	time: 0,
	totalTime: 0,
	interval: null,
};

channel.onmessage = (msg) => {
	actionType = msg.data;
	switch (actionType) {
		case "start":
			interval = setInterval(startTime, 1000);
			break;
		case "reset":
			resetTime();
			break;
		case "submit":
			submitTime();
			break;
		case "onload":
			channel.postMessage({
				time: state.time,
				totalTime: state.totalTime,
				running: state.running,
			});
			break;
	}
};

function startTime() {
	state.time += 1000;
	state.running = true;
	console.log(
		state.time,
		new Date().getMinutes() + ":" + new Date().getSeconds()
	);
}
function resetTime() {
	clearInterval(interval);
	state.time = 0;
	state.running = false;
}
function submitTime() {
	clearInterval(interval);

	state.totalTime += state.time;
	state.time = 0;
	state.running = false;
}
