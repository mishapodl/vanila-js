const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('piano');
});

app.listen(5000, () => {
  console.log(`Port 5000`);
});
