import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Logo from '~/components/Logo';
import Wrapper from '~/components/Wrapper';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import * as userServices from '~/services/userServices';
import { PATH } from '~/utils/constant';
import styles from './Header.module.scss';
import MenuItem from '~/components/MenuItem';
import CommonUtils from '~/utils/CommonUtils';

const cx = classNames.bind(styles);

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchBox = useRef();

    const isLoggedIn = useSelector(selectors.isLoggedIn);
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [keywordSearch, setKeywordSearch] = useState('');
    const [isShowClearIcon, setIsShowClearIcon] = useState(false);
    const [avatar, setAvatar] = useState(DefaultAvatar);

    useEffect(() => {
        (async () => {
            const res = await userServices.getUserById(userLoggedIn.id);

            if (res && res.errCode === 0) {
                const userData = res.data;

                if (userData.avatar) {
                    const avatar = CommonUtils.renderImage(userData.avatar);
                    setAvatar(avatar);
                }
            }
        })();
    }, [userLoggedIn]);

    // Search
    const handleChangeKeywordSearch = (e) => {
        const value = e.target.value.trim();
        if (value.length > 0) setIsShowClearIcon(true);
        else setIsShowClearIcon(false);
        setKeywordSearch(value);
    };

    const handleClearInput = () => {
        setKeywordSearch('');
        setIsShowClearIcon(false);
        searchBox.current.focus();
    };

    // Render menu user
    const handleRenderMenuUser = () => {
        return (
            <Wrapper>
                <MenuItem to={`/profile/${userLoggedIn.id}`}>Trang cá nhân</MenuItem>
                {userLoggedIn.roleId === 1 && <MenuItem to={PATH.dashboard}>Dashboard</MenuItem>}
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Wrapper>
        );
    };

    // Logout
    const handleLogout = () => {
        dispatch(actions.userLogoutSuccess());
        navigate(PATH.login);
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('main')}>
                <Logo />

                <div className={cx('search')}>
                    <span className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>

                    <input
                        ref={searchBox}
                        type="text"
                        className={cx('search-box')}
                        placeholder="Tìm kiếm"
                        value={keywordSearch}
                        onChange={(e) => handleChangeKeywordSearch(e)}
                    />

                    {isShowClearIcon && (
                        <span className={cx('clear-icon')}>
                            <FontAwesomeIcon icon={faTimesCircle} onClick={handleClearInput} />
                        </span>
                    )}
                </div>

                <div className={cx('actions')}>
                    <div className={cx('auth')}>
                        {!isLoggedIn ? (
                            <Link to={PATH.login} className={cx('auth-button')}>
                                Đăng nhập
                            </Link>
                        ) : (
                            <Tippy
                                interactive
                                placement="bottom-end"
                                render={handleRenderMenuUser}
                                trigger="click"
                                offset={[0, 4]}
                            >
                                <div className={cx('user')}>
                                    <img src={avatar} alt={userLoggedIn.firstName} className={cx('avatar')} />
                                </div>
                            </Tippy>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
