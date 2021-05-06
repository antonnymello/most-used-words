const path = require('path');
const fn = require('./functions');

const filesDir = path.join(__dirname, '.', 'subtitles');
const symbol = [
  '.',
  '?',
  '!',
  '-',
  ',',
  '"',
  '♪',
  '_',
  '<i>',
  '</i>',
  '\r',
  '[',
  ']',
  '(',
  ')',
];

fn.readFolder(filesDir)
  .then(fn.extensionEndsWith('.srt'))
  .then(fn.readFiles)
  .then(fn.joinElements)
  .then(fn.splitWith('\n'))
  .then(fn.removeEmpty)
  .then(fn.removeIfHas('-->'))
  .then(fn.removeNumbers)
  .then(fn.removeSpecialCharacters(symbol))
  .then(fn.joinElements)
  .then(fn.splitWith(' '))
  .then(fn.removeEmpty)
  .then(fn.removeNumbers)
  .then(fn.countWords)
  .then(fn.sortByTimes('quantity', 'upward'))
  .then(fn.writeResult);
