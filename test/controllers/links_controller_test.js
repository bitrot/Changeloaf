require('../test_helper.js').controller('links', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        url: '',
        user: '',
        date: '',
        private: ''
    };
}

exports['links controller'] = {

    'GET new': function (test) {
        test.get('/links/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/links', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Link.find;
        Link.find = sinon.spy(function (id, callback) {
            callback(null, new Link);
        });
        test.get('/links/42/edit', function () {
            test.ok(Link.find.calledWith('42'));
            Link.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Link.find;
        Link.find = sinon.spy(function (id, callback) {
            callback(null, new Link);
        });
        test.get('/links/42', function (req, res) {
            test.ok(Link.find.calledWith('42'));
            Link.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var link = new ValidAttributes;
        var create = Link.create;
        Link.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, link);
            callback(null, link);
        });
        test.post('/links', {Link: link}, function () {
            test.redirect('/links');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var link = new ValidAttributes;
        var create = Link.create;
        Link.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, link);
            callback(new Error, null);
        });
        test.post('/links', {Link: link}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Link.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/links/1', new ValidAttributes, function () {
            test.redirect('/links/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Link.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/links/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

