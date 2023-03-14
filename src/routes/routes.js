import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Search from '~/pages/Search';
import NotFound from '~/pages/NotFound';

import DefaultLayout from '~/layouts/DefaultLayout';
import OnlyContent from '~/layouts/OnlyContent';

const publicRoutes = [
    { path: config.routes.home, page: Home, layout: DefaultLayout },
    { path: config.routes.login, page: Login, layout: OnlyContent },
    { path: config.routes.register, page: Register, layout: OnlyContent },
    { path: config.routes.search, page: Search, layout: DefaultLayout },
    { path: config.routes.notFound, page: NotFound, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
