load('application');
//before(use('requireLogin'));

action(function index() {
    this.title = 'Changeloaf Home';
    render();
});