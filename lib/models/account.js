'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Message Schema
 */
var AccountSchema = new Schema({
	name: String,
	url: String
});

/**
 * Validations
 */
// AccountSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('Account', AccountSchema);
