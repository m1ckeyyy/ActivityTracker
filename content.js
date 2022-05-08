//send message to eventPage to highlight icon (in my case background.js)
// let welcome = document.getElementById("color-blue-darkest type--h1");
//chrome.runtime.sendMessage({ todo: "inReviewMode" });
let count = 0;

const hourglassInit = () => {
	// const startBar = document.querySelector("#start");
	const queueName = document.querySelector(".queue-info-header");

	chrome.runtime.sendMessage({ msg: queueName?.textContent });
	if (!queueName) {
		if (count > 10) return;
		window.setTimeout(hourglassInit, 500);
		count++;

		return;
	}

	// const bypass = `<div id="hourglass-overlay">
	// <button id="hourglass-button">ButtonTest</button></div>`;
	//startBar.insertAdjacentHTML("afterBegin", bypass);
};
window.setTimeout(hourglassInit, 1000);

//necessary background waking up function to avoid going inactive
var wakeup = function () {
	setTimeout(function () {
		chrome.runtime.sendMessage({ msg: "wake" });
		wakeup();
	}, 10000);
};
wakeup();
