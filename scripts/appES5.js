// since this is ES5, we can't use arrow functions here to create the constructors

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.querySelector("#book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const bookForm = document.querySelector("#book-form");

  container.insertBefore(div, bookForm);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

document.querySelector("#book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill up all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Removed.", "success");

  e.preventDefault();
});
