import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';
import { PATH } from '~/utils/constant';

const cx = classNames.bind(styles);

const Logo = () => {
    return (
        <Link to={PATH.home} className={cx('logo')}>
            return
        </Link>
    );
};

export default Logo;
