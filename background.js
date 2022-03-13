const channel = new BroadcastChannel("CHANNEL_ONE");
const state = {
	running: false,
	value: 0,
	totalValue: 0,
	interval: null,
};

channel.onmessage = (msg) => {
	switch (msg.data) {
		case "start":
			state.interval = setInterval(startTime, 1000);
			break;
		case "reset":
			resetTime();
			break;
		case "submit":
			submitTime();
			break;
		case "onload":
			channel.postMessage({
				value: state.value,
				totalValue: state.totalValue,
				running: state.running,
			});
			break;
	}
};

function startTime() {
	state.value += 1000;
	state.running = true;
	console.log("time: ", state.value, "totaltime:", state.totalValue);
}
function resetTime() {
	clearInterval(state.interval);
	state.value = 0;
	state.running = false;
}
function submitTime() {
	state.totalValue += state.value;
	resetTime();
}
