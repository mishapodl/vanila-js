// Book class: represent books
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => UI.addBoolToList(book));
  }

  // Instatite book
  static addBoolToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>
        <a href="#" class="btn btn-danger btn-sm delete">X</a>
      </td>
    `;

    list.appendChild(row);
  }

  // Remove book
  static removeBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // Show message status
  static showAlert(message, className) {
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const div = document.createElement('div');

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    container.insertBefore(div, form);

    // Vanish 3 sec
    setTimeout(() => {
      document.querySelector('.alert').remove();
      if (className === 'danger') {
        document.querySelector('.btn-block').disabled = false;
      }
    }, 1500);
  }

  // Clear fields
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store classL handles storages
class Store {
  static getBooks() {
    let books = localStorage.getItem('books');

    return books !== null ? JSON.parse(books) : [];
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    let books = Store.getBooks();

    books = books.filter(book => book.isbn !== isbn);

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add book
document.querySelector('#book-form').addEventListener('submit', e => {
  // Prevent actualy submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Velidate
  if (author === '' || title === '' || isbn === '') {
    UI.showAlert('Please Fill in all fields', 'danger');
    document.querySelector('.btn-block').disabled = true;
  } else {
    // Initiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBoolToList(book);

    // Add book to storage
    Store.addBook(book);

    // Show message add success
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: remove book
document.querySelector('#book-list').addEventListener('click', e => {
  const isbn = e.target.parentElement.previousElementSibling.textContent;

  // Remove book from list
  UI.removeBook(e.target);

  // Remove book from localstorage
  Store.removeBook(isbn);

  // Show message remove success
  UI.showAlert('Book Removed', 'success');
});
