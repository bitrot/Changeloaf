var User = describe('User', function () {
      property('login', String);
      property('password', String);
      property('firstName', String);
      property('lastName', String);
      property('email', String);
      property('activated', Boolean, {default: false});
      property('modified', Date, {default: Date.now});
      property('created', Date);
});

var Link = describe('Link', function () {
	property('title', String);
	property('url', String);
	property('userId', String);
	property('private', Boolean, {default: false});
	property('modified', Date);
	property('created', Date);
});
