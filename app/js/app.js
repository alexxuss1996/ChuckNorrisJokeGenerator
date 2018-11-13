// Set Event Listener 
document.querySelector(".get-jokes").addEventListener("click", getJokes)

function getJokes(e) {

	const number = document.querySelector('input[type="number"]').value;

	if (!!number === false || !!parseFloat(number) === false) {
		// Create alert div
		const div = document.createElement("div");

		div.className = "alert";

		div.appendChild(document.createTextNode("Please enter a correct value!"));

		const container = document.querySelector(".container");
		const heading = document.querySelector("h2");

		container.insertBefore(div, heading);
		// Hide alert after 2 sec
		setTimeout(function() {
			document.querySelector(".alert").remove();
		}, 2000);
	}

	const xhr = new XMLHttpRequest();
	const loading = document.querySelector("#loading");

	xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true)

	xhr.onprogress = function() {
		if (this.readyState === 3) {
			loading.style.display = "block";

		}
	}	

	xhr.onload = function() {
		if(this.status === 200 && this.readyState === 4) {
			const response = JSON.parse(this.responseText);

			let output = "";
			loading.style.display = "none";

			if (response.type === "success") {
				response.value.forEach(function(joke) {
					output += `<li class="collection-item">${joke.joke}</li>`;
				});
			} else {
				output += `<li class="collection-item">Something went wrong...</li>`
			}

			document.querySelector(".jokes").innerHTML = output;
		}
	}

	xhr.send();

	e.preventDefault();
}