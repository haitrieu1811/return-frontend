import { faContactBook, faHome, faInfoCircle, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import { PATH } from '~/utils/constant';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <NavLink to={PATH.home} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faHome} /> Trang chủ
                </NavLink>
                <NavLink to="/intro" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Giới thiệu
                </NavLink>
                <NavLink to="/contact" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faContactBook} /> Liên hệ
                </NavLink>
                <NavLink to="/news" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faNewspaper} /> Tin tức
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
