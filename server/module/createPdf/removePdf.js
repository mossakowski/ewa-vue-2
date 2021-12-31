const fs = require('fs');

module.exports = (fileName) => {
    fs.unlink(`${__dirname}/${fileName}`,(err) => {
        console.log(err);
    })
}