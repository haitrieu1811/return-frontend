import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import * as selectors from '~/store/selectors';
import Accounts from '../components/Accounts';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const theme = useSelector(selectors.theme);

    const isMobile = useMediaQuery({ maxWidth: 480 });

    // SET THEME
    useEffect(() => {
        if (theme === 'dark') {
            if (document.body.classList.contains('light')) {
                document.body.classList.remove('light');
            }
            document.body.classList.add('dark');
        } else {
            if (document.body.classList.contains('dark')) {
                document.body.classList.remove('dark');
            }
            document.body.classList.add('light');
        }
    }, [theme]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                {!isMobile && <Sidebar />}
                <main className={cx('main')}>{children}</main>
                {!isMobile && <Accounts />}
            </div>
            {isMobile && <MobileMenu />}
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
