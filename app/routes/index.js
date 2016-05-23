'use strict';

var path = process.cwd();

var searchLayer = require(path + '/app/controllers/searchLayer.js');
module.exports = function (app) {
	
	app.route('/')
		.get(function (req, res) {
		res.sendFile(path + '/public/index.html');
		});


	app.route("/imagesearch/:search").get(function (req, res) {
			var search = req.params.search;
			console.log("search termp = ", search);
			console.log("query = ", req.query);
			searchLayer.getImageData(search, req.query,function(response){console.log("callback finished");
				res.send(response);
			});
	});
	app.route("/recent").get(function (req, res) {
			searchLayer.getRecentQueries(function(response){console.log("callback finished");
				res.send(response);
			});
	});
	
};
