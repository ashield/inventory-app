var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    name: String,
    description: String
})

var Item = mongoose.model('Item', itemSchema);

exports.retrieveAll = function (req, res) {
    Item.find(function (err, items) {
        if (err) return console.error(err);
        res.render('index', {items: items});
    })
};

exports.show = function (req, res) {
    Item.findOne({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
    	if (err) return console.error(err); // change to 404 page
        res.render('show', item)
    });
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
        if (err) return console.error(err);
        res.redirect('/');
    });
};

exports.edit = function (req, res) {
    Item.findOne({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
        if (err) return console.error(err); // change to 404 page
        res.render('edit', item)
    });
};

exports.update = function (req, res) {
    Item.findOne({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
        if (err) return console.error(err); // change to 404 page
        item['name'] = req.body.name;
        item['description'] = req.body.description;
        item.save()
        res.render('show', item)
    });
}


exports.delete = function (req, res) {
    Item.remove({'_id':mongoose.Types.ObjectId(req.param('id'))}, function (err, item) {
	    if (err) return console.error(err); // change to 404 page
	    res.json({success: true});
	});
}


