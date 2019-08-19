function arrayNames(array) {
  return {
    add: function(postName) {
      array.push(postName);
      return array;
    },
    removeName: function(postName) {
      array = array.filter(name => name !== postName);
      return array;
    },
    showNames: () => array
  };
}

// Empty Array
const name = arrayNames([]);
name.add('Alex');
name.add('Michael');
name.add('Eygen');
console.log(name.showNames());
name.removeName('Michael');
console.log(name.showNames());
console.log('-------');

// Full Array
const fullName = arrayNames(['Max', 'Sasha', 'Andrew']);
console.log(fullName.showNames());
fullName.add('Alex');
fullName.add('Kate');
console.log(fullName.showNames());
fullName.removeName('Sasha');
console.log(fullName.showNames());
