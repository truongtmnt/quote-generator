const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
}
// Quote Generator
async function getQuote() {
	showLoadingSpinner();
	//avoid CORS
	const quoteUrl =
		"http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
	const proxyUrl = "https://mighty-chamber-32269.herokuapp.com/";
	try {
		const response = await fetch(proxyUrl + quoteUrl);
		const data = await response.json();
		// if author is blank, add Unknown
		if (data.quoteAuthor === "") {
			authorText.innerText = "Unknown";
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		// if quote long, smaller the text size
		if (data.quoteText.length > 120) {
			quoteText.classList.add("long-quote");
		} else {
			quoteText.classList.remove("long-quote");
		}

		quoteText.innerText = data.quoteText;
	} catch (err) {
		getQuote();
	}
	removeLoadingSpinner();
}
// Twitter function
function twitterQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, "_blank");
}

// Event Listener
twitterBtn.addEventListener("click", twitterQuote);
newQuoteBtn.addEventListener("click", getQuote);

// Load
getQuote();
