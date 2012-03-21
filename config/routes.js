exports.routes = function (map) {
    // Resources
    map.resources('session');
    map.resources('links');

    // Generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');

    // Core routes
    map.get('/', 'home#index');
    map.get('/links', 'links#index');

    // Session routes
    map.get('/login', 'session#create');
    map.get('/logout', 'session#destroy');
};
