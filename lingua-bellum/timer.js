
const timer = document.querySelector(".temps");
const phrase = document.querySelector(".phrase");
const zoneText = phrase.querySelectorAll(".phraseA")

console.log(timer, zoneText[0])
timer.textContent = "60";

function finTemps() {
	let seconde=Number(timer.textContent)
	seconde--;
	timer.textContent = seconde;
	if (seconde < 1){
		for (let c of zoneText){
			c.disabled=true;
		}
	}
}

setInterval(finTemps, 1000);

const form = document.querySelector(".phrase");
form.addEventListener("submit", function (event) {
	for (let c of zoneText){
		c.removeAttribute("disabled");
	}
});
