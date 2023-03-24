import { faCriticalRole } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import { PATH } from '~/utils/constant';
import styles from './SidebarDashboard.module.scss';

const cx = classNames.bind(styles);

const SidebarDashboard = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <NavLink to={PATH.dashboardUser} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUserGroup} /> Người dùng
                </NavLink>
                <NavLink to={PATH.dashboardPost} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faNewspaper} /> Bài đăng
                </NavLink>
                <NavLink to={PATH.dashboardCategory} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faPaperclip} /> Danh mục
                </NavLink>
                <NavLink to={PATH.dashboardRole} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faCriticalRole} /> Quyền
                </NavLink>
            </div>
        </div>
    );
};

export default SidebarDashboard;
