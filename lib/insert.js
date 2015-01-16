'use strict';

var mongoose = require('mongoose'),
     Account = mongoose.model('Account');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Account.find({}).remove(function() {
  Account.create({
    name : 'Marco',
    url: 'http://www.devmarco.com.br'
  }, {
    name : 'UAI',
    url: 'http://www.uai.com.br'
  }, {
    name : 'MG30',
    url: 'http://www.mg30.com.br'
  }, {
    name : 'LUGAR CERTO',
    url: 'http://www.lugarcerto.com.br'
  }, {
    name : 'Globo',
    timer: 'http://www.globo.com'
  }, function() {
      console.log('finished populating Message');
    }
  );
});
