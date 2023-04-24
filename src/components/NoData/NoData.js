import classNames from 'classnames/bind';
import { Fragment } from 'react';

import noDataImg from '~/assets/images/nodata.svg';
import styles from './NoData.module.scss';

const cx = classNames.bind(styles);

const NoData = ({ text }) => {
    return (
        <div className={cx('wrapper')}>
            {noDataImg && (
                <Fragment>
                    <img src={noDataImg} alt={text} className={cx('image')} />
                    <div className={cx('text')}>{text}</div>
                </Fragment>
            )}
        </div>
    );
};

export default NoData;
