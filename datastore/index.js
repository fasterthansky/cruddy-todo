const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
      if (err) {
        console.log(err, 'No data');
      } else {
        callback(null, { id, text });
      }
    });
  });
};
// fs.writeFile(file, data[, options], callback)

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
  fs.readdir(path.join(exports.dataDir, `${id}.txt`), (err, file) => {
    if (err) {
      console.log('Error');
    } else {
      var file = _.map(items, (text, id) => {
        return { id, text };
      });
      if (err) {
        console.log('Error');
      } else {
        callback(null, file);
      }
    }
  });

};
// fs.readdir(path[, options], callback)

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, data) => {
    if (err) {
      callback(/*new Error*/(`No item with id: ${id}`));
    } else {
      callback(null, { id, text: data });
    }
  });
};
// fs.readFile(path[, options], callback)

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  exports.readOne(id, (err, readIt) => {
    if (err) {
      callback((`No item with id: ${id}`));
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log(err, 'No data');
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }
  });

};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
