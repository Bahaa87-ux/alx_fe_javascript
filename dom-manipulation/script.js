// Array of quote objects with text and category
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
  // Get a random index from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Get the quote display container
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Clear previous content
  quoteDisplay.innerHTML = '';
  
  // Create paragraph element for quote text
  const quoteText = document.createElement('p');
  quoteText.textContent = quote.text;
  
  // Create paragraph element for quote category
  const quoteCategory = document.createElement('p');
  quoteCategory.textContent = 'Category: ' + quote.category;
  
  // Append elements to quote display
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function to create add quote form
function createAddQuoteForm() {
  // Get the body element
  const body = document.body;
  
  // Create container div
  const formContainer = document.createElement('div');
  
  // Create input for quote text
  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  
  // Create input for category
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  
  // Create add quote button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  
  // Append all elements to container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  
  // Append container to body
  body.appendChild(formContainer);
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Call createAddQuoteForm when page loads
window.onload = function() {
  createAddQuoteForm();
  showRandomQuote(); // Display a quote on page load
};