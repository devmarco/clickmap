'use strict';

var mongoose = require('mongoose'),
    Account = mongoose.model('Account'),
    webshot = require('webshot'),
    fs      = require('fs');

/**
 * Get Accounts
 */
exports.getAllAccounts = function(req, res) {
  return Account.find(function (err, account) {
    if (!err) {
      return res.json(account);
    } else {
      return res.send(err);
    }
  });
};

exports.createAccounts = function(req, res) {
	var user = new Account();
		user.name = req.body.name;
		user.url = req.body.url;

	return user.save(function(err, account) {
		if (err)
			res.send(err);

		res.json({ status: "ok", name: account.name, url: account.url});
	});
};

exports.getOneAccount = function(req, res, next) {
	return Account.find({_id: req.params.account_id}, null, {limit: 1}, function(err, account) {
		if (!err) {
	      return res.json(account);
	    } else {
	      return res.json({error: err});
	    }
	});
};

exports.deleteAccount = function(req, res) {
	return Account.findByIdAndRemove(req.params.account_id, function(err, account) {
		if (err)
			res.send(err);

		res.json({ account: 'Successfully deleted' });
	});
};

exports.generateAccountImage = function(req, res) {
    var url = req.body.url;
    var localPath = 'app/public/screenshot/';
    var imageName = url.split('.')[1];
    var fullImagePath = localPath+imageName+'.jpg';

    return webshot(url, {
        windowSize: {
            width: 1300,
            height: 768
        },
        shotSize: {
            width: 'all',
            height: 'all'
        },
        renderDelay: 10000,
        streamType: 'jpg'
    }, function(err, rs) {

        if (err) {
            res.json({error: err});
        } else {

            rs.on('error', function(err) {
                res.json({status: 'error', error: err});
            });

            var file = fs.createWriteStream(fullImagePath, {encoding: 'binary'});

            rs.on('data', function(data) {
                //Save image on disk
                file.write(data.toString('binary'), 'binary');
            });
            rs.on('end', function() {
                //END
                res.json({status: 'ok', image: '/screenshot/'+imageName+'.jpg'});
            });
        };
    });
};


/* GENERATE BASE64 IMAGE */

//var img = '';
// var imageBase64 = data.toString('base64');
// if (!imageBase64.match(/Error/)) {
//     img += data.toString('base64');
// };
