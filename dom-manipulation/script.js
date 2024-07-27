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

// Function to display a random quote or filtered quotes
function showQuotes(quotesToShow) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  quotesToShow.forEach((quote) => {
    const quoteText = document.createElement("p");
    quoteText.textContent = quote.text;

    const quoteCategory = document.createElement("p");
    quoteCategory.innerHTML = `<em>${quote.category}</em>`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  });
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  showQuotes([quotes[randomIndex]]);
}

// Event listener for the 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to create the form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const newQuoteTextInput = document.createElement("input");
  newQuoteTextInput.id = "newQuoteText";
  newQuoteTextInput.type = "text";
  newQuoteTextInput.placeholder = "Enter a new quote";

  const newQuoteCategoryInput = document.createElement("input");
  newQuoteCategoryInput.id = "newQuoteCategory";
  newQuoteCategoryInput.type = "text";
  newQuoteCategoryInput.placeholder = "Enter quote category";

  const addQuoteButton = document.createElement("button");
  addQuoteButton.textContent = "Add Quote";
  addQuoteButton.addEventListener("click", addQuote);

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
    updateCategoryFilter();
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

// Function to update the category filter options
function updateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map((quote) => quote.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const selectedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = selectedCategory;
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  if (selectedCategory === "all") {
    showQuotes(quotes);
  } else {
    const filteredQuotes = quotes.filter(
      (quote) => quote.category === selectedCategory
    );
    showQuotes(filteredQuotes);
  }
}

// Function to export quotes to a JSON file using Blob
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    updateCategoryFilter();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial calls to load quotes and setup the page
loadQuotes();
showQuotes(quotes);
createAddQuoteForm();
updateCategoryFilter();

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document
  .getElementById("exportQuotes")
  .addEventListener("click", exportToJsonFile);
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);
