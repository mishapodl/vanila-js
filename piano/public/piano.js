const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const recordBtn = document.querySelector('.record-button');
const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {});

let recordStartTime;
let songNotes;

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key));
});

recordBtn.addEventListener('click', toggleRecording);

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) {
    playNote(whiteKeys[whiteKeyIndex]);
  }
  if (blackKeyIndex > -1) {
    playNote(blackKeys[blackKeyIndex]);
  }
});

function toggleRecording() {
  recordBtn.classList.toggle('active');

  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordBtn != null && recordBtn.classList.contains('active');
}

function startRecording() {
  recordStartTime = Date.now();
  songNotes = [];
}

function stopRecording() {
  playSong();
}

function playSong() {
  if (!songNotes.length) return;

  songNotes.forEach(note => {
    setTimeout(() => {
      playNote(keyMap[note.key]);
    }, note.startTime);
  });
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note);

  const noteAudio = document.getElementById(key.dataset.note);

  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active');
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordStartTime
  });
}
