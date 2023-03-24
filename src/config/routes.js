const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    search: '/search/:keyword/:provinceId/:districtId/:wardId',
    dashboard: '/dashboard',
    dashboardUser: '/dashboard/user',
    dashboardPost: '/dashboard/post',
    dashboardCategory: '/dashboard/category',
    dashboardRole: '/dashboard/role',
    profile: '/profile/:userId',
    filter: '/filter',
    createPost: '/create-post',
    notFound: '*',
};

export default routes;
