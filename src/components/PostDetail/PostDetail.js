import classNames from 'classnames/bind';

import Comment from '../Comment';
import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);

const PostDetail = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('separate')}></div>
            <Comment />
        </div>
    );
};

export default PostDetail;
