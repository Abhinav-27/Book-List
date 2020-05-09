// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 sec
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener for Add Book
document.getElementById("book-form").addEventListener("submit", e => {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantite UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all details", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    // Clear fields
    ui.clearFields();
  }

  console.log(book);

  console.log(title, author, isbn);
  e.preventDefault();
});

// Event Listener for Delete
document.getElementById("book-list").addEventListener("click", e => {
  // Instantite UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
