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

UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

document.querySelector("#book-form").addEventListener("submit", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();
  ui.addBookToList(book);
  ui.clearFields();

  e.preventDefault();
});
