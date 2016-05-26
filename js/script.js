/* jshint node: true */
"use strict";

// Create an array of js objects to hold the data for your quotes
// Properties: quote, source, citation (optional), year (optional), tags (optional)
var quotes = [
	{
		quote: 'I don’t have to have faith, I have experience.',
		source: 'Joseph Campbell',
		citation: 'The Power of Myth',
		year: 1988,
		tags: ['spiritual', 'profound']
	},
	{
		quote: 'If you tell the truth, you don’t have to remember anything.',
		source: 'Mark Twain',
		tags: ['humor']
	},
	{
		quote: 'Never memorize something that you can look up.',
		source: 'Albert Einstein',
		tags: ['practical', 'science']
	},
	{
		quote: 'Who doesn’t drink coffee? I mean, it’s just—it’s just coffee! It’s not a drink! It’s a hug!',
		source: 'Kenzi',
		citation: 'Lost Girl, Episode 2.8, Death Didn’t Become Him',
		year: 2011,
		tags: ['televison']
	},
	{
		quote: 'Always be yourself...unless you suck.',
		source: 'Joss Whedon',
		tags: ['televison', 'writers', 'humor']
	},
	{
		quote: 'Always laugh when you can. It is cheap medicine.',
		source: 'Lord Byron',
		tags: ['humor']
	},
	{
		quote: 'I always arrive late at the office, but I make up for it by leaving early.',
		source: 'Charles Lamb',
		tags: ['humor']
	},
];

var quoteIndexHistoryArray = [];
var colorIndexHistoryArray = [];

function getRandomIndexNumber(array) {
	// return a number between 0 and the length of the array passed in
	return Math.floor(Math.random() * (array.length));
}

function getUniqueIndex(array, indexHistory) {
	var result = getRandomIndexNumber(array);
	
	// If the result is in the history, get a new number
	while(indexHistory.indexOf(result) !== -1) {
		result = getRandomIndexNumber(array);
	}
	
	// Add the result to the history
	indexHistory.push(result);
	
	// Testing the history
	//console.log(indexHistory);
	
	return result;
}

function getRandomQuote() {
	// Select a random quote object from the quotes array
	var randomIndex = getUniqueIndex(quotes, quoteIndexHistoryArray);
	
	// Return the randomly selected quote object
	return quotes[randomIndex];
}

function printQuote() {
	// If the length of the history array and quotes array is the same, clear history
	if (quoteIndexHistoryArray.length === quotes.length) {
		quoteIndexHistoryArray = [];
	}
	
	// Call getRandomQuote and store the returned quote object in a variable
	var quote = getRandomQuote();
	
	// Construct the string to output the quote
	var quoteString = '<p class="quote">' + quote.quote + '</p>';
	quoteString += '<p class="source">' + quote.source;
	
	// If the citation exists, add it to the quote string
	if (quote.citation) {
		quoteString += '<span class="citation">' + quote.citation + '</span>';
	}
	
	// If the year exists, add it to the quote string
	if (quote.year) {
		quoteString += '<span class="year">' + quote.year + '</span>';
	}
	
	quoteString += '</p>';
	
	// If the tags exist, add them to the quote string
	if (quote.tags) {
		quoteString += '<p class="tags">';
		
		for (var i = 0; i < quote.tags.length; i++) {
			quoteString += '<a href="#">' + quote.tags[i] + '</a>';
		}
		
		quoteString += '</p>';
	}
	
	// Display the final HTML string to the page
	document.getElementById('quote-box').innerHTML = quoteString;
	
	// Change the background color of the body and button
	changeBackgroundColors();	
}

function changeBackgroundColors() {
	// If the length of the history array and background colors array is the same, clear history
	if (colorIndexHistoryArray.length === quotes.length) {
		colorIndexHistoryArray = [];
	}
	
	// Create an array of color keywords
	var backgroundColorsArray = ['rosybrown', 'burlywood', 'cadetblue', 'lightcoral', 'darkseagreen', 'thistle', 'salmon'];
	
	// Set the background color to a random color from the colors array
	var randomBackgroundColor = getUniqueIndex(backgroundColorsArray, colorIndexHistoryArray);
	document.body.style.backgroundColor = backgroundColorsArray[randomBackgroundColor];
	
	// Also change the button background color
	// Setting the background color clobbers the hover state, so add a class instead
	document.getElementById('loadQuote').className = backgroundColorsArray[randomBackgroundColor];
}


// Event listener responds to clicks on the page
// When user clicks the loadQuote button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Every thirty seconds, print out a quote
window.setInterval(printQuote, 30000);