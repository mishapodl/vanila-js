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
    const StoerBooks = [
      {
        title: 'Ernesto Chigivara',
        author: 'Jhon Boey',
        isbn: '849-5611-4234'
      },
      {
        title: 'Tranksiivat Carrolina',
        author: 'Boby Marlin',
        isbn: '849-5611-4234'
      }
    ];

    const books = StoerBooks;

    books.forEach(book => UI.addBoolToList(book));
  }

  static addBoolToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(param) {
    
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('isbn').value = '';
  }
}

// Store classL handles storages

// Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add book
document.querySelector('#book-form').addEventListener('submit', e => {
  // Prevent actualy submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Initiate book
  const book = new Book(title, author, isbn);

  // Add book to UI
  UI.addBoolToList(book);

  // Clear fields
  UI.clearFields();
});

// Event: remove book
