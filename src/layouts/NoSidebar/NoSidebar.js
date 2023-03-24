import classNames from 'classnames/bind';

import styles from './NoSidebar.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

const NoSidebar = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default NoSidebar;
