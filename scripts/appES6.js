class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const bookForm = document.querySelector("#book-form");

    container.insertBefore(div, bookForm);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Local Storage
class Store {
  static getBooksFromLS() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooksFromLS() {
    const books = Store.getBooksFromLS();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBookToLS(book) {
    const books = Store.getBooksFromLS();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBookFromLS(isbn) {
    const books = Store.getBooksFromLS();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooksFromLS);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill up all fields", "error");
  } else {
    ui.addBookToList(book);
    Store.addBookToLS(book);
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBookFromLS(
    e.target.parentElement.previousElementSibling.textContent
  );
  //   console.log("ISBN: ", e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Book Removed.", "success");
  e.preventDefault();
});
