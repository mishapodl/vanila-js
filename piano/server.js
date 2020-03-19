const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song.js');
const app = express();

mongoose
  .connect('mongodb+srv://mishapod:milka132@cluster0-fgj6y.mongodb.net/Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('piano');
});

app.post('/songs', async (req, res) => {
  const song = new Song({
    notes: req.body.songNotes
  });

  await song.save();

  res.json(song);
});

app.get('/songs/:id', async (req, res) => {
  let song;
  try {
    song = await Song.findById(req.params.id);
  } catch (e) {
    song = undefined;
  }
  res.render('piano', { song: song });
});

app.listen(5000, function() {
  console.log('Express server listening on port' + 5000);
}); 
