load('application');

before(loadSession, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New session';
    this.session = new Session;
    render();
});

action(function create() {
    Session.create(req.body.Session, function (err, session) {
        if (err) {
            flash('error', 'There was an error.  If this persists, contact support.');
            render('new');
        } else {
            flash('info', 'Welcome!');
            redirect(path_to.home);
        }
    });
});

// action(function update() {
//     this.session.updateAttributes(body.Session, function (err) {
//         if (!err) {
//             flash('info', 'Session updated');
//             redirect(path_to.session(this.session));
//         } else {
//             flash('error', 'Session can not be updated');
//             this.title = 'Edit session details';
//             render('edit');
//         }
//     }.bind(this));
// });

action(function destroy() {
    this.session.destroy(function (error) {
        if (error) {
            flash('error', 'There was an error. If this persists, contact support.');
        } else {
            flash('info', 'Goodbye!');
            render('new');
        }
        send("'" + path_to.sessions + "'");
    });
});

function loadSession() {
    Session.find(params.id, function (err, session) {
        if (err) {
            redirect(path_to.home);
        } else {
            this.session = session;
            next();
        }
    }.bind(this));
}
