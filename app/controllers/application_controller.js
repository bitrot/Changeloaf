before('protect from forgery', function () {
    protectFromForgery('72efe8f762a3e95c180f61f83c6fcd90e1eeb850');
});

function requireLogin() {
    // check session inside `req.session`
    // or cookie, or post with login and password, or something else to authenticate your user
    // for example this logic defined in User.authenticate
    // if (req.session.user_id) {
    //     User.load(req.session.user_id, function (user) {
    //         req.user = user;
    //         next(); // IMPORTANT: call next filter (or action) in chain
    //     });
    // }
    // else {
    //    if (req.body.login && req.body.password) {
    //         User.authenticate(req.body, function (user) {
    //              req.user = user;
    //              next(); // IMPORTANT: call next filter (or action) in chain
    //         });
    //    }
    // }
}

//publish('requireLogin', requireLogin);
