var express = require('express');
var router = express.Router();

// Form parser
var formidable = require('formidable');

// Util
var inspect = require('util').inspect;

router.post('/upload', function(req, res){
  /*var bdy = req.body;
  var formid = new formidable.IncomingForm();*/
  console.log('LOG!')
  // formid.parse(req, function(err, fields, files) {
  iform.parse(req, function(err, fields, files) {    
    if(err)
      console.log('ERROR!!!')
    for(var file in files){
          console.log(file + ': ' + files[file].name);
          respText += file + ', has the name: ' + files[file].name + '<br />';          
    }  
    console.log('SERVER: Post request received');
    console.log('SERVER, Files received: ' + iform.files);
  });
  res.send('RESPONS OK');
  console.log('LOG!')
});

module.exports = router;
