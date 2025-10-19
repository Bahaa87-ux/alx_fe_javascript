// Array of quote objects with text and category
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" }
];

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  
  const quoteText = document.createElement('p');
  quoteText.textContent = quote.text;
  
  const quoteCategory = document.createElement('p');
  quoteCategory.textContent = 'Category: ' + quote.category;
  
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
  
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  if (newQuoteText === '' || newQuoteCategory === '') {
    alert('Please fill in both fields!');
    return;
  }
  
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };
  
  quotes.push(newQuote);
  saveQuotes();
  
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  
  alert('Quote added successfully!');
  showRandomQuote();
}

// Function to create add quote form
function createAddQuoteForm() {
  const body = document.body;
  
  const formContainer = document.createElement('div');
  
  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  
  body.appendChild(formContainer);
  
  createImportExportSection();
}

// Function to create import/export section
function createImportExportSection() {
  const body = document.body;
  
  const importExportContainer = document.createElement('div');
  
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes to JSON';
  exportButton.onclick = exportToJsonFile;
  
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'importFile';
  importInput.accept = '.json';
  importInput.onchange = importFromJsonFile;
  
  importExportContainer.appendChild(exportButton);
  importExportContainer.appendChild(document.createElement('br'));
  importExportContainer.appendChild(document.createElement('br'));
  importExportContainer.appendChild(importInput);
  
  body.appendChild(importExportContainer);
}

// Function to export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
  
  URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize on page load
window.onload = function() {
  loadQuotes();
  createAddQuoteForm();
  showRandomQuote();
};