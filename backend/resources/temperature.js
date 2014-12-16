var mongoose = require('mongoose');
var Temperature = mongoose.model('Temperature');
var logger = require('../lib/log');

// Create a document
exports.create = function(req, res) {
		var obj = new Temperature(req.body)
	obj.save(function(err, obj) {
		if (err) {
			res.send(err);
		} else {
			res.send(obj);
		}
	});
};

// Get a Document by the _id
exports.get = function(req, res){
	var id = req.params.id;
	Temperature.findOne({name: id}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send("Temperature not found with id: " + id)
			}
		}
	});
};

exports.getSpec = function(req, res){

  var house = req.params.house;
  var room = req.params.room;
  var day = req.params.day;
  var hour = req.params.hour;

  console.log(house + room + day + hour);
  var selector = {house: house, room: room};
  var projection = null;
  if(day)
  {
    projection =  { days : { $elemMatch: { name : day}}};
  }
	Temperature.findOne(selector,projection, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send("Temperature not found with id: " + id)
			}
		}
	});
};


// Update a document
exports.update = function(req, res) {
	var id = req.params.id;

	Temperature.update({house : req.body.house, room: req.body.room}, req.body, function(err) {
		if (!err) {
			logger.info("update success");
			res.send(200);
		} else {
			logger.error(err);
			res.send(err);
		}
	});
};


// Delete a document
exports.delete = function(req, res) {
	var id = req.params.id;
	Temperature.findOne({_id: id}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if (data) {
				data.remove(function(err, data) {
					if (err) {
						logger.error(err);
						res.send(err);
					} else {
						res.send(data);
					}
				});
			} else {
				res.status(404).send("Temperature not found with id: " + id)
			}
		}
	});
};


// Get all documents in a collection
exports.list = function (req, res) {
	Temperature.find({}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			res.send(data);
		}
	});
};
