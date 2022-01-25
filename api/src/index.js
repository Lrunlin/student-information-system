require("module-alias/register");

const express = require('express')
const app = express()

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());


const cors = require('cors');
app.use(cors());


app.use(express.static('public'));

const fileUpload = require('express-fileupload');
app.use(fileUpload());





function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      files.forEach(function (filename) {
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();
            var isDir = stats.isDirectory();
            if (isFile) {
              app.use('/', require(filedir));
            }
            if (isDir) {
              fileDisplay(filedir);
            }
          }
        });
      });

    }
  });
}
const fs = require('fs');
var path = require('path');
var filePath = path.resolve('./src/routes');
fileDisplay(filePath);



app.listen(3000, () => console.log(`run`))