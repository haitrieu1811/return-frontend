import classNames from 'classnames/bind';

import styles from './DashboardLayout.module.scss';
import Header from '../components/Header';
import SidebarDashboard from '../components/SidebarDashboard';

const cx = classNames.bind(styles);

const Dashboard = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                <SidebarDashboard />
                <div className={cx('main')}>{children}</div>
            </div>
        </div>
    );
};

export default Dashboard;
