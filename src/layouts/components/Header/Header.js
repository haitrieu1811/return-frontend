import { BookOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Logo from '~/components/Logo';
import MenuItem from '~/components/MenuItem';
import Wrapper from '~/components/Wrapper';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import { PATH } from '~/utils/constant';
import styles from './Header.module.scss';
import Search from './Search';

const cx = classNames.bind(styles);

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    // RENDER MENU USER
    const renderMenuUser = () => {
        return (
            <Wrapper>
                <MenuItem to={`/profile/${userLoggedIn.id}`} icon={<UserOutlined />}>
                    <FormattedMessage id="header.personalPage" />
                </MenuItem>

                <MenuItem to={PATH.savedPosts} icon={<BookOutlined />}>
                    <FormattedMessage id="header.savedPosts" />
                </MenuItem>
                <MenuItem onClick={handleLogout} icon={<LogoutOutlined />}>
                    <FormattedMessage id="header.logout" />
                </MenuItem>
            </Wrapper>
        );
    };

    // LOGOUT
    const handleLogout = () => {
        dispatch(actions.userLogoutSuccess());
        navigate(PATH.login);
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('main')}>
                <Logo />

                <Search />

                <div className={cx('actions')}>
                    <div className={cx('auth')}>
                        {!isLoggedIn ? (
                            <Link to={PATH.login} className={cx('auth-button')}>
                                <FormattedMessage id="auth.login" />
                            </Link>
                        ) : (
                            <Tippy
                                interactive
                                placement="bottom-end"
                                render={renderMenuUser}
                                trigger="click"
                                offset={[0, 4]}
                            >
                                <div className={cx('user')}>
                                    <img
                                        src={
                                            userLoggedIn.avatar
                                                ? CommonUtils.renderImage(userLoggedIn.avatar)
                                                : DefaultAvatar
                                        }
                                        alt={userLoggedIn.firstName}
                                        className={cx('avatar')}
                                    />
                                </div>
                            </Tippy>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default memo(Header);
