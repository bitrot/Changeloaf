load('application');

before(loadLink, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New link';
    this.link = new Link;
    render();
});

action(function create() {
    Link.create(req.body.Link, function (err, link) {
        if (err) {
            flash('error', 'Link can not be created');
            render('new', {
                link: link,
                title: 'New link'
            });
        } else {
            flash('info', 'Link created');
            redirect(path_to.links);
        }
    });
});

action(function index() {
    this.title = 'Links index';
    Link.all(function (err, links) {
        render({
            links: links
        });
    });
});

action(function show() {
    this.title = 'Link show';
    render();
});

action(function edit() {
    this.title = 'Link edit';
    render();
});

action(function update() {
    this.link.updateAttributes(body.Link, function (err) {
        if (!err) {
            flash('info', 'Link updated');
            redirect(path_to.link(this.link));
        } else {
            flash('error', 'Link can not be updated');
            this.title = 'Edit link details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.link.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy link');
        } else {
            flash('info', 'Link successfully removed');
        }
        send("'" + path_to.links + "'");
    });
});

function loadLink() {
    Link.find(params.id, function (err, link) {
        if (err) {
            redirect(path_to.links);
        } else {
            this.link = link;
            next();
        }
    }.bind(this));
}
