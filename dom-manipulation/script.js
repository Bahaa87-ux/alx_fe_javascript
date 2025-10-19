let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.map(item => ({
    text: item.title,
    category: "Server"
  }));
}

async function postQuoteToServer(quote) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quote)
  });
  const data = await response.json();
  return data;
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotesText = quotes.map(q => q.text);
  let conflictDetected = false;
  
  serverQuotes.forEach(serverQuote => {
    if (!localQuotesText.includes(serverQuote.text)) {
      quotes.push(serverQuote);
      conflictDetected = true;
    }
  });
  
  if (conflictDetected) {
    saveQuotes();
    populateCategories();
    notifyUser('Quotes synced with server!');
  }
}

function notifyUser(message) {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
}

function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  
  const categories = quotes.map(quote => quote.category);
  const uniqueCategories = [...new Set(categories)];
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  localStorage.setItem('lastSelectedCategory', selectedCategory);
  
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
  
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
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
}

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
  
  populateCategories();
  
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  
  alert('Quote added successfully!');
  showRandomQuote();
}

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

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

window.onload = function() {
  loadQuotes();
  populateCategories();
  
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
  if (lastSelectedCategory) {
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
  } else {
    showRandomQuote();
  }
  
  setInterval(syncQuotes, 60000);
};
