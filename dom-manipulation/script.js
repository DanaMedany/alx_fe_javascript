// Array to hold quote objects
let quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    category: "Inspirational",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    category: "Motivational",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    category: "Life",
  },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous quote
  quoteDisplay.innerHTML = "";

  // Create elements for the quote
  const quoteText = document.createElement("p");
  quoteText.textContent = randomQuote.text;

  const quoteCategory = document.createElement("p");
  quoteCategory.innerHTML = `<em>${randomQuote.category}</em>`;

  // Append elements to the quote display
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Event listener for the 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to create the form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  // Create input for new quote text
  const newQuoteTextInput = document.createElement("input");
  newQuoteTextInput.id = "newQuoteText";
  newQuoteTextInput.type = "text";
  newQuoteTextInput.placeholder = "Enter a new quote";

  // Create input for new quote category
  const newQuoteCategoryInput = document.createElement("input");
  newQuoteCategoryInput.id = "newQuoteCategory";
  newQuoteCategoryInput.type = "text";
  newQuoteCategoryInput.placeholder = "Enter quote category";

  // Create button to add new quote
  const addQuoteButton = document.createElement("button");
  addQuoteButton.textContent = "Add Quote";
  addQuoteButton.addEventListener("click", addQuote);

  // Append elements to the form container
  formContainer.appendChild(newQuoteTextInput);
  formContainer.appendChild(newQuoteCategoryInput);
  formContainer.appendChild(addQuoteButton);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    saveQuotes();
    alert("New quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "quotes.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial call to load quotes from local storage and display a quote
loadQuotes();
showRandomQuote();
createAddQuoteForm();

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document
  .getElementById("exportQuotes")
  .addEventListener("click", exportToJsonFile);
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);
