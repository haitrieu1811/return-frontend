import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';

import Wrapper from '~/components/Wrapper';
import SearchResult from '../SearchResult';
import styles from './Search.module.scss';
import * as userServices from '~/services/userServices';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const Search = () => {
    const intl = useIntl();
    const searchText = intl.formatMessage({ id: 'header.search' });

    const searchBox = useRef();

    const [keyword, setKeyword] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [results, setResults] = useState([]);

    const keywordDebounce = useDebounce(keyword, 1000);

    // FETCH SEARCH
    useEffect(() => {
        (async () => {
            if (keywordDebounce) {
                setLoadingIcon(true);

                const res = await userServices.search(keywordDebounce);
                if (res && res.errCode === 0) setResults(res.data);
                else setResults([]);

                setLoadingIcon(false);
            }
        })();
    }, [keywordDebounce]);

    const handleChangeKeywordSearch = (e) => {
        const value = e.target.value;
        setKeyword(value);
    };

    const handleClearInput = () => {
        setKeyword('');
        searchBox.current.focus();
    };

    // RENDER SEARCH RESULT
    const renderSearchResult = () => {
        return <Wrapper>{<SearchResult data={results} keyword={keyword} />}</Wrapper>;
    };

    // HANDLE HIDE RESULTS
    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('search-icon')}>
                <SearchOutlined />
            </span>

            <Tippy
                visible={results.length > 0 && showResult}
                interactive
                placement="bottom-end"
                render={renderSearchResult}
                onClickOutside={handleHideResult}
            >
                <input
                    ref={searchBox}
                    type="text"
                    className={cx('search-box')}
                    placeholder={searchText}
                    value={keyword}
                    onChange={(e) => handleChangeKeywordSearch(e)}
                    onFocus={() => setShowResult(true)}
                />
            </Tippy>

            {keyword && !loadingIcon && (
                <span className={cx('clear-icon')}>
                    <CloseCircleFilled onClick={handleClearInput} />
                </span>
            )}

            {loadingIcon && <LoadingOutlined className={cx('loading-icon')} />}
        </div>
    );
};

export default Search;
