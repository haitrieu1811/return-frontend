import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Search from '~/pages/Search';
import Dashboard from '~/pages/Dashboard';
import DashboardUser from '~/pages/DashboardUser';
import DashboardPost from '~/pages/DashboardPost';
import DashboardCategory from '~/pages/DashboardCategory';
import DashboardRole from '~/pages/DashboardRole';
import Profile from '~/pages/Profile';
import Filter from '~/pages/Filter';
import CreatePost from '~/pages/CreatePost';
import NotFound from '~/pages/NotFound';

import DefaultLayout from '~/layouts/DefaultLayout';
import OnlyContent from '~/layouts/OnlyContent';
import DashboardLayout from '~/layouts/DashboardLayout';
import NoSidebar from '~/layouts/NoSidebar';

const publicRoutes = [
    { path: config.routes.home, page: Home, layout: DefaultLayout },
    { path: config.routes.login, page: Login, layout: OnlyContent },
    { path: config.routes.register, page: Register, layout: OnlyContent },
    { path: config.routes.search, page: Search, layout: DefaultLayout },
    { path: config.routes.dashboard, page: Dashboard, layout: DashboardLayout },
    { path: config.routes.dashboardUser, page: DashboardUser, layout: DashboardLayout },
    { path: config.routes.dashboardPost, page: DashboardPost, layout: DashboardLayout },
    { path: config.routes.dashboardCategory, page: DashboardCategory, layout: DashboardLayout },
    { path: config.routes.dashboardRole, page: DashboardRole, layout: DashboardLayout },
    { path: config.routes.profile, page: Profile, layout: DefaultLayout },
    { path: config.routes.filter, page: Filter, layout: DefaultLayout },
    { path: config.routes.createPost, page: CreatePost, layout: NoSidebar },
    { path: config.routes.notFound, page: NotFound, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
