import classNames from 'classnames/bind';

import styles from './Chats.module.scss';

const cx = classNames.bind(styles);

const Chats = () => {
    return <div className={cx('wrapper')}></div>;
};

export default Chats;
