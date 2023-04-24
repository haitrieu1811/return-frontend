import classNames from 'classnames/bind';
import {
    FolderAddFilled,
    FolderAddOutlined,
    HomeFilled,
    HomeOutlined,
    InfoCircleFilled,
    InfoCircleOutlined,
    MessageFilled,
    MessageOutlined,
    SettingFilled,
    SettingOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useState, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './MobileMenu.module.scss';
import { PATH } from '~/utils/constant';
import Drawer from '~/components/Drawer';
import Chats from '../Chats/Chats';

const cx = classNames.bind(styles);

const MobileMenu = () => {
    const [openChat, setOpenChat] = useState(false);

    const showChat = () => {
        setOpenChat(true);
    };

    const hideChat = () => {
        setOpenChat(false);
    };

    return (
        <Fragment>
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

                    {/* <div className={cx('item')} onClick={showChat}>
                        <MessageOutlined className={cx('icon-outline')} />
                        <MessageFilled className={cx('icon-fill')} />
                        <span>
                            <FormattedMessage id="sidebar.chat" />
                        </span>
                    </div> */}
                </div>
            </div>

            <Drawer title="Trò chuyện" open={openChat} onClose={hideChat} width="80%">
                <Chats />
            </Drawer>
        </Fragment>
    );
};

export default MobileMenu;
