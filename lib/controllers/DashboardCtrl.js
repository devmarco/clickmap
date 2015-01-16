'use strict';

var mongoose = require('mongoose'),
    Account = mongoose.model('Account'),
    webshot = require('webshot'),
    fs      = require('fs');

/**
 * Get Accounts
 */
exports.getAccountDashboard = function(req, res) {
  return Account.find({_id: req.params.account_id}, null, {limit: 1}, function(err, account) {
    if (!err && account[0] != null) {
        return res.render('dashboard', {
          account: account[0].name,
          url: account[0].url,
          id: account[0].id
        });
      } else {
        return res.render(404);
      }
  });
};

