const fs = require('fs');
const path = require('path');

const subtitles = (value) => value.includes('.srt'); //* Use with filter on readFolder promise

readFolder = (filesPath) => {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(filesPath);
      files = files.map((file) => path.join(filesPath, file));
      resolve(files);
    } catch (error) {
      reject(error);
    }
  });
};

extensionEndsWith = (pattern) => (array) =>
  array.filter((el) => el.endsWith(pattern));

readFile = (path) => {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(path, { encoding: 'utf8' });
      resolve(content);
    } catch (error) {
      reject(error);
    }
  });
};

// const readFiles = (paths) => {
//   return Promise.all(paths.map((path) => readFile(path)));
// };

readFiles = (paths) =>
  paths.map((file) => fs.readFileSync(file, { encoding: 'utf8' }));

removeEmpty = (array) => array.filter((el) => el.trim());

removeIfHas = (pattern) => (array) =>
  array.filter((el) => !el.includes(pattern));

removeNumbers = (array) => {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
};

removeSpecialCharacters = (symbols) => (array) =>
  array.map((el) => {
    return symbols.reduce((acc, symbol) => {
      return acc.split(symbol).join('');
    }, el);
  });

joinElements = (array) => array.join(' ');

splitWith = (symbol) => (text) => text.split(symbol);

countWords = (words) => {
  return Object.values(
    words.reduce((group, word) => {
      const wrd = word.toLowerCase();
      const quantity = group[wrd] ? group[wrd].quantity + 1 : 1;
      group[wrd] = { element: wrd, quantity };
      return group;
    }, {})
  );
};

sortByTimes = (attribute, order = 'up') => (array) => {
  const upward = (o1, o2) => o1[attribute] - o2[attribute];
  const decreasing = (o1, o2) => o2[attribute] - o1[attribute];
  return array.sort(order == 'up' ? upward : decreasing);
};

writeResult = (array) => {
  const filePath = path.resolve(__dirname, 'most-used-words.json');
  return fs.writeFileSync(filePath, JSON.stringify(array, null, '\t'));
};

module.exports = {
  readFolder,
  extensionEndsWith,
  readFile,
  readFiles,
  removeEmpty,
  removeIfHas,
  removeNumbers,
  removeSpecialCharacters,
  joinElements,
  splitWith,
  countWords,
  sortByTimes,
  writeResult,
};
