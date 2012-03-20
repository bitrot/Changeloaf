require('../test_helper.js').controller('sessions', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        
    };
}

exports['sessions controller'] = {

    'GET new': function (test) {
        test.get('/sessions/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/sessions', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Session.find;
        Session.find = sinon.spy(function (id, callback) {
            callback(null, new Session);
        });
        test.get('/sessions/42/edit', function () {
            test.ok(Session.find.calledWith('42'));
            Session.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Session.find;
        Session.find = sinon.spy(function (id, callback) {
            callback(null, new Session);
        });
        test.get('/sessions/42', function (req, res) {
            test.ok(Session.find.calledWith('42'));
            Session.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var session = new ValidAttributes;
        var create = Session.create;
        Session.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, session);
            callback(null, session);
        });
        test.post('/sessions', {Session: session}, function () {
            test.redirect('/sessions');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var session = new ValidAttributes;
        var create = Session.create;
        Session.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, session);
            callback(new Error, null);
        });
        test.post('/sessions', {Session: session}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Session.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/sessions/1', new ValidAttributes, function () {
            test.redirect('/sessions/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Session.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/sessions/1', new ValidAttributes, function () {
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

