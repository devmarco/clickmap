'use strict';

var express = require('express');
var API = express.Router();
var apiCtrl = require('../controllers/API_AccountCtrl');

/**
 * API routes
 */

//Get all accounts
API.get('/account', apiCtrl.getAllAccounts);

//Create a new account
API.post('/account', apiCtrl.createAccounts);

//Get one account
API.get('/account/:account_id', apiCtrl.getOneAccount);

//Delete one account
API.delete('/account/:account_id', apiCtrl.deleteAccount);

//Return new image
API.post('/account/:account_id/image', apiCtrl.generateAccountImage);

// All undefined api routes should return a 404
API.get('/*', function(req, res) {
    res.json({error: "This route not exist, please consult the api docs"});
});



module.exports = API;
