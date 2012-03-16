define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Link = describe('Link', function () {
    property('title', String);
    property('url', String);
    property('user', Number);
    property('date', Date);
    property('private', Boolean);
});