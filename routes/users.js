var express = require('express');
var router = express.Router();

const formidable = require('express-formidable');


var path = require('path');
var fs = require('fs');

// Util
var inspect = require('util').inspect;

/* GET participants listing. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('participants');
  collection.find({},{},function(e,docs) {
    res.json(docs);
  });
  // res.send('Subtitute response: ' + collection);
});

// Load participants listing. 
router.get('/userload', function(req, res) {
  var restext;
  try {
    var data = fs.readFileSync('./data/json/participants.json', 'utf8');
    restext = 'JSON data was loaded!'; 
    // res.json({msg: restext});
    res.json(JSON.parse(data));  
  } catch (e) {
    restext = 'Problem loading data, Error: ' + e.message;
    res.json({msg: restext}); 
  }
});

router.post('/uploadtodb', (req, res) => {
  console.log('Content-Type: ' + req.get('Content-Type'));  
  req.fields; // contains non-file fields 
  req.files; // contains files 
  var thefile = req.files[Object.keys(req.files)[0]];
  fs.readFile(thefile.path, 'utf8', (err, data) => {
    if (err) throw err;
        console.log(data);
    console.log(data);
    // res.status(200).send('POST ->/ upload! FILE = ' + thefile.name);
    
    //res.json(data);
    res.end();
  });
});

module.exports = router;
