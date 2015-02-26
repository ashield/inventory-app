var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
	name: String,
	description: String
})

var Item = mongoose.model('Item', itemSchema);

// var items = [];

var _ = require('lodash');

function findOne(req) {
	return _.find(items, {id: req.params.id});
}

exports.list = function (req, res) {
	// var items = findAll   work out later
	// res.render('index', {items: items});

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
    console.log(req.param);
    if (!req.param('item')) {
        res.send('Item not valid');
        res.statusCode = 400;
    } else {
        var item = new Item({ item: req.param('item')});
        console.log(item);
        item.save(function (err, item) {
            if (err) return console.error(err);
            res.send("adding " + item);
        });
    }
};
        // id: _.uniqueId(),
        // name: req.param,
        // description: req.body.description
//     };
// }

//     items.push(item);
//     res.redirect('/');
// });



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