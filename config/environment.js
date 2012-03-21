var express = require('express'),
    passport = require('passport'),
    RedisStore = require('connect-redis')(express);

var redisOpts = {
    port: '6379',
    host: 'localhost'
};

app.configure(function(){
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('views', cwd + '/app/views');
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('b52cddbdbd88deb926f6d0bc01d46a69edb171b7'));
    app.use(express.session({secret: '706eaa0377f52f5a2f3e0671b6a9f96e5764f3cb', store: new RedisStore(redisOpts)}));
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});
