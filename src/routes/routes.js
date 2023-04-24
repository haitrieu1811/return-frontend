import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import SavedPosts from '~/pages/SavedPosts';
import CreatePost from '~/pages/CreatePost';
import Setting from '~/pages/Setting/';

import DefaultLayout from '~/layouts/DefaultLayout';
import OnlyContent from '~/layouts/OnlyContent';

const publicRoutes = [
    { path: config.routes.home, page: Home, layout: DefaultLayout },
    { path: config.routes.login, page: Login, layout: OnlyContent },
    { path: config.routes.register, page: Register, layout: OnlyContent },
    { path: config.routes.profile, page: Profile, layout: DefaultLayout },
    { path: config.routes.createPost, page: CreatePost, layout: DefaultLayout },
    { path: config.routes.savedPosts, page: SavedPosts, layout: DefaultLayout },
    { path: config.routes.setting, page: Setting, layout: DefaultLayout },
    { path: config.routes.notFound, page: NotFound, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
