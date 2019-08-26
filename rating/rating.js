const ratings = {
  sony: 4.7,
  samsung: 3,
  phillips: 3.8,
  vizio: 2,
  panasonic: 3.4
};

// Total stars
const starsTotal = 5;

// Run getRatings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

// Form elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// Init product
let product;

// Product select change
productSelect.addEventListener('change', e => {
  product = e.target.value;

  // Enable rating control
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

// Rating control change
ratingControl.addEventListener('blur', e => {
  const rating = e.target.value;

  // Check rating
  if (rating > 5) {
    alert('Please set rating betwen 1 - 5');
    return;
  }

  // Change rating
  ratings[product] = rating;
  getRatings();
});

// Get ratings
function getRatings() {
  for (const rating in ratings) {
    // Get persentage of total stars
    const ratingPercentage = (ratings[rating] / starsTotal) * 100;

    // Rounded to nearest 10
    const starPercentageRounded = `${Math.round(ratingPercentage / 10) * 10}%`;

    // Asign rating
    document.querySelector(
      `.${rating} .stars-inner`
    ).style.width = starPercentageRounded;

    // Change number rating of product
    document.querySelector(`.${rating} .number-rating`).innerHTML =
      ratings[rating];
  }
}
