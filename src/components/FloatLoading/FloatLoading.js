import classNames from 'classnames/bind';

import styles from './FloatLoading.module.scss';

const cx = classNames.bind(styles);

const FloatLoading = () => {
    return (
        <div className={cx('loading-wp')}>
            <div className={cx('loading')}></div>
        </div>
    );
};

export default FloatLoading;
