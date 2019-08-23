// Context
const obj = { sum: 'Sum' };

function ctxClouser(a, b) {
  console.log(`${this.sum} - ${a + b}`);
}

ctxClouser.call(obj, 10, 10);

//ES5 'OOP' 
function Book(title, auth, year) {
  this.title = title;
  this.auth = auth;
  this.year = year;
}

Book.prototype.getSummery = function() {
  return `Title - ${this.title}, Auth - ${this.auth}, Year - ${
    this.year
  }, Month - ${this.month}, Day - ${this.day}`;
};

function Magazine(title, auth, year, month) {
  Book.call(this, title, auth, year);

  this.month = month;
}

Magazine.prototype = Object.create(Book.prototype);

const book = new Magazine('451', 'Oruel', '1975', 'Jun');
Magazine.prototype.constructor = Magazine;

console.log(book);
