const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const Song = require('./models/song.js');
const mongoURI = require('./default.json').mongoURI;

let getData = [];

// server
console.log('-------');
server.listen(5000, function() {
  console.log('Express server listening on port: ' + 5000);
});

io.on('connection', async socket => {
  console.log('New user connected\n -------');
  const notes = await Song.find();
  socket.emit('get data', notes);
});

// db
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// view page
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', async (req, res) => {
  const data =
  getData = () => data;
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
