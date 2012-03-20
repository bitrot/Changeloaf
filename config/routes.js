exports.routes = function (map) {
    map.resources('session');
    map.resources('links');

    map.all(':controller/:action');
    map.all(':controller/:action/:id');

    map.get('/', 'home#index');
    map.get('/links', 'links#index');
    map.get('/login', 'session#new');

    // Session routes
    map.get('/auth/github/callback', 'session#create');

    map.get('/logout', 'session#destroy');
};