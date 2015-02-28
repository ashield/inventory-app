var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
	name: String,
	description: String
})

var Item = mongoose.model('Item', itemSchema);

// var items = [];

var _ = require('lodash');

function findOne(req) {
	return _.find(Item, {id: req.params.id});
}

// exports.retrieveOne = function(req, res) {
//     Item.find({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
//         if (err) return console.error(err);
//         res.send(item);
//     });
// }

exports.retrieveAll = function (req, res) {
    Item.find(function (err, items) {
        if (err) return console.error(err);
        // res.send(items);
        res.render('index', {items: items});
	})
};

exports.show = function (req, res) {
    res.render('show', findOne(req));
};

exports.new = function (req, res) {
    res.render('new');
};

exports.create = function(req, res) {
    var item = new Item({
        name: req.body.name,
        description: req.body.description                                                   
     });
		item.save(function (err, item) {
		// LOGGING
		// if (err) return console.error(err);
		// res.send("adding " + item);
		res.redirect('/');
	});
};

exports.edit = function (req, res) {
	res.render('edit', findOne(req));
};


exports.update = function (req, res) {
	var id = req.params.id;
	var index = _.findIndex (items, {id: id});
	var item = {
		id: id,
		name: req.body.name,
		description: req.body.description
	};

	items[index] = item;
	res.redirect('/' + id);
}

exports.delete = function (req, res) {
    _.remove(items, {id: req.params.id});
    res.json({success: true});
};