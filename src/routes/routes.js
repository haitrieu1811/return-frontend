import config from '~/config';

import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';

import DefaultLayout from '~/layouts/DefaultLayout';

const publicRoutes = [
    { path: config.routes.home, page: Home, layout: DefaultLayout },
    { path: config.routes.login, page: NotFound, layout: DefaultLayout },
    { path: config.routes.notFound, page: NotFound, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
