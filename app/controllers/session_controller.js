load('application');

before(loadSession, {only: ['show', 'edit', 'destroy']});
// Removed 'update' - ryan

action(function create() {
    Session.create(req.body, function (err, session) {
        if (err) {
            flash('error', 'There was an error.  If this persists, contact support.');
            render('login');
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
            redirect(path_to.home);
        } else {
            flash('info', 'Goodbye!');
            render('login');
        }
    });
});

function loadSession() {
    Session.find(params.id, function (err, session) {
        if (err) {
            flash('error', 'There was an error. If this persists, contact support.');
            render('home');
        } else {
            this.session = session;
            next();

            flash('info', 'Session loaded.');
            render('home');
        }
    }.bind(this));
}
