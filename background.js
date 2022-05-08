/*
//receiving message from content.js to highlight the icon
let welcome;
let decision;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// if (request.todo == "showPageAction") {
	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 		console.log("tested");
	// 		// console.log(tabs[0].id, tabs[0]);
	// 		// chrome.pageAction.show(tabs[0].id);
	// 	});
	// }

	console.log(request);
	decision = request.todo;
	console.log(decision);
	if (decision === "inReviewMode") {
		state.interval = setInterval(startTime, 1000);
		state.running = true;
	}
});
*/
const channelOne = new BroadcastChannel("CHANNEL_ONE");
//bg-popup
// const channelTwo = new BroadcastChannel("CHANNEL_TWO");
//bg-content
const state = {
	running: false,
	value: 0,
	totalValue: 0,
	interval: null,
	queueNamePresent: false,
};

channelOne.onmessage = (msg) => {
	switch (msg.data) {
		case "start":
			state.interval = setInterval(startTime, 1000);
			break;
		case "reset":
			state.running = false;
			resetTime();
			break;
		case "submit":
			state.running = false;
			submitTime();
			break;
		case "onload":
			channelOne.postMessage({
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
	//only if queue name is present add review time to total time
	if (state.queueNamePresent) {
	}
	state.totalValue += state.value;
	resetTime();
}

//chrome.notificantion
//chrome.browserAction.setBadgeText

chrome.runtime.onMessage.addListener(function (msg) {
	console.log(`message says: ${msg.msg}`);

	if (msg.msg === "wake") {
		//ignore
		console.log("woken");
		return;
	}
	if (msg.msg === undefined) {
		//
		console.log(`bar is not present`);
		//STOP THE CURRENT SESSION/REVIEW TIME
	}
	if (msg.msg === "Queue Name: CS - Source - 1") {
		console.log("bar is present");
		console.log("running: ", state.running);
		//START/CONTINUE COUNTING SESSION/REVIEW TIME
		if (state.running === false) {
			state.interval = setInterval(startTime, 1000);
		}
		state.queueNamePresent = true;
		console.log(state);
	}
});
//console.log(1 == true); true
