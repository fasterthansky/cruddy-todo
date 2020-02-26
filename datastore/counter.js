const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////
// Zero padded numbers can only be represented as strings.

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, countIt) => {
    if (err) {
      console.log('No counter to read');
    } else {
      countIt++;
      writeCounter(countIt, (err, id) => {
        if (err) {
          console.log('Nothing to count');
        } else {
          callback(null, id);
        }
      });
    }
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////
exports.counterFile = path.join(__dirname, 'counter.txt');