import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Chats from '../components/Chats/Chats';
import styles from './DefaultLayout.module.scss';
import BackToTop from '../components/BackToTop';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                <Sidebar />
                <main className={cx('main')}>{children}</main>
                <Chats />
            </div>

            <BackToTop />
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
