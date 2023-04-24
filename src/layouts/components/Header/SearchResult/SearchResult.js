import { SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './SearchResult.module.scss';
import CommonUtils from '~/utils/CommonUtils';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

const SearchResult = ({ data, keyword }) => {
    return (
        <Fragment>
            {data && data.length > 0 && (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <SearchOutlined className={cx('header-icon')} />
                        <span>Kết quả cho từ khóa "{keyword}"</span>
                    </div>

                    <div className={cx('heading')}>
                        <h5>Người dùng</h5>
                    </div>

                    {data.map((result) => {
                        return (
                            <Link to={`/profile/${result.id}`} key={result.id} className={cx('item')}>
                                <img
                                    src={CommonUtils.renderImage(result.avatar)}
                                    alt={result.firstName}
                                    className={cx('thumbnail')}
                                />
                                <span>{`${result.firstName} ${result.lastName}`}</span>
                                {result.tick === 1 && <CheckCircleFilled className={cx('tick')} />}
                            </Link>
                        );
                    })}
                </div>
            )}
        </Fragment>
    );
};

export default SearchResult;
