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
            flash('error', 'Session can not be created');
            render('new', {
                session: session,
                title: 'New session'
            });
        } else {
            flash('info', 'Session created');
            redirect(path_to.sessions);
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
            flash('error', 'Can not destroy session');
        } else {
            flash('info', 'Session successfully removed');
        }
        send("'" + path_to.sessions + "'");
    });
});

function loadSession() {
    Session.find(params.id, function (err, session) {
        if (err) {
            redirect(path_to.sessions);
        } else {
            this.session = session;
            next();
        }
    }.bind(this));
}
