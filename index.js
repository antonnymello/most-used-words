const path = require('path');
const fn = require('./functions');
const mostUsedWordsJson = require('./most-used-words.json');

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

fn.composition(
  fn.readFolder,
  fn.extensionEndsWith('.srt'),
  fn.readFiles,
  fn.joinElements,
  fn.splitWith('\n'),
  fn.removeEmpty,
  fn.removeIfHas('-->'),
  fn.removeNumbers,
  fn.removeSpecialCharacters(symbol),
  fn.joinElements,
  fn.splitWith(' '),
  fn.removeEmpty,
  fn.removeNumbers,
  fn.countWords,
  fn.sortByTimes('quantity', 'upward'),
  fn.writeResult
)(filesDir);

fn.logger(mostUsedWordsJson);
