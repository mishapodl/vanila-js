// Get fi
const filterInput = document.getElementById('filterInput');

filterInput.addEventListener('keyup', filterNames);

function filterNames() {
  const filterValue = document
    .getElementById('filterInput')
    .value.toUpperCase();

  // Get names ul
  const ulNames = document.getElementById('names');

  // Get lis in ulNames
  const listNames = ulNames.querySelectorAll('li.collection-item');

  // Loop for searching match in lis
  for (const name of [...listNames]) {
    // If matched
    if (
      name.textContent
        .trim()
        .toUpperCase()
        .includes(filterValue)
    ) {
      name.style.display = '';
    } else {
      name.style.display = 'none';
    }
  }
}
