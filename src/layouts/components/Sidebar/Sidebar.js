import {
    FolderAddFilled,
    FolderAddOutlined,
    HomeFilled,
    HomeOutlined,
    LeftOutlined,
    RightOutlined,
    SettingFilled,
    SettingOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/utils/constant';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const navigate = useNavigate();

    // HANDLE NEXT
    const next = () => {
        navigate(+1);
    };

    // HANDLE PREV
    const prev = () => {
        navigate(-1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <NavLink to={PATH.home} className={(nav) => cx('item', { active: nav.isActive })}>
                    <HomeOutlined className={cx('icon-outline')} />
                    <HomeFilled className={cx('icon-fill')} />
                    <span>
                        <FormattedMessage id="sidebar.home" />
                    </span>
                </NavLink>
                <NavLink to={PATH.createPost} className={(nav) => cx('item', { active: nav.isActive })}>
                    <FolderAddOutlined className={cx('icon-outline')} />
                    <FolderAddFilled className={cx('icon-fill')} />
                    <span>
                        <FormattedMessage id="sidebar.createPost" />
                    </span>
                </NavLink>
                <NavLink to={PATH.setting} className={(nav) => cx('item', { active: nav.isActive })}>
                    <SettingOutlined className={cx('icon-outline')} />
                    <SettingFilled className={cx('icon-fill')} />
                    <span>
                        <FormattedMessage id="sidebar.setting" />
                    </span>
                </NavLink>
            </div>
        </div>
    );
};

export default memo(Sidebar);
