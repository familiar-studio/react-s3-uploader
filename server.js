'use strict';

var express = require('express');
var app = express();
var fs = require('fs')
var cors = require('express-cors')
var uuid = require('uuid');
var multiparty = require('multiparty');
var s3 = require('s3');
var s3auth = require('./s3auth.js')

app.use(cors({
  allowedOrigins: ['localhost:7000']
}))

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendfile('./index.html');
});

app.listen(5000);

var s3Client = s3.createClient({
  s3Options: {
    accessKeyId: s3auth.accessKeyId,
    secretAccessKey: s3auth.secretAccessKey
  }
});

app.post('/s3upload', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (files.file) {
      var file = files.file[0];
      var destFileName = 'test/' + uuid.v1() + '.' + file.headers['content-type'].split('/')[1];
      var bucketName = 'artmatters-application';
      var s3Params = {
        localFile: file.path,
        s3Params: {
          Bucket: bucketName,
          Key: destFileName,
          ACL: 'public-read'
        }
      };

      var uploader = s3Client.uploadFile(s3Params);

      uploader.on('error', function(err) {
        console.error(err)
        res.status(500).json({err: err})
      });


      uploader.on('progress', function() {
        console.log("progress", uploader.progressMd5Amount,uploader.progressAmount, uploader.progressTotal);
      })

      uploader.on('end', function(data) {
        res.json({
          url: 'https://' + bucketName + '.s3.amazonaws.com/' + destFileName
        });
      });
    }
  });
});
