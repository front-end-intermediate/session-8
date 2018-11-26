var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/pirates', function(req, res){
  Pirate.find({}, function(err, results) {
    return res.send(results);
  });
});

module.exports = app;
