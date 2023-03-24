import { faBlog, faContactBook, faFilter, faHome, faInfoCircle, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import { PATH } from '~/utils/constant';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <NavLink to={PATH.home} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faHome} /> Trang chủ
                </NavLink>
                <NavLink to={PATH.createPost} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faBlog} /> Đăng bài
                </NavLink>
                <NavLink to={PATH.filter} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFilter} /> Lọc
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
