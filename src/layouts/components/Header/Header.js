import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { PATH } from '~/utils/constant';
import styles from './Header.module.scss';
import Filter from '~/components/Filter';
import Wrapper from '~/components/Wrapper';
import Logo from '~/components/Logo';

const cx = classNames.bind(styles);

const Header = () => {
    const [keywordSearch, setKeywordSearch] = useState('');
    const [isShowClearIcon, setIsShowClearIcon] = useState(false);

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
    };

    // Render filter
    const handleRender = () => {
        return (
            <Wrapper>
                <Filter keyword={keywordSearch} />
            </Wrapper>
        );
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('main')}>
                <Logo />

                <Tippy placement="bottom-start" interactive render={handleRender} trigger="click" offset={[0, 4]}>
                    <div className={cx('search')}>
                        <span className={cx('search-icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>

                        <input
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
                </Tippy>

                <div className={cx('actions')}>
                    <div className={cx('auth')}>
                        <Link to={PATH.login} className={cx('auth-button')}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
