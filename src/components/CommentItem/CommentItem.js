import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './CommentItem.module.scss';
import CommonUtils from '~/utils/CommonUtils';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

const CommentItem = ({ commentData }) => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        (async () => {
            const userId = commentData.commentBy;
            const res = await userServices.getUserById(userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [commentData.commentBy]);

    useEffect(() => {
        if (user.avatar) {
            const avatar = CommonUtils.renderImage(user.avatar);
            setAvatar(avatar);
        }
    }, [user.avatar]);

    return (
        <div className={cx('wrapper')}>
            <Link to={`/profile/${user.id}`} className={cx('avatar-link')}>
                <img src={avatar} alt={user.firstName} className={cx('avatar')} />
            </Link>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Link to={`/profile/${user.id}`} className={cx('name')}>
                        {`${user.firstName} ${user.lastName}`}
                    </Link>
                    <div className={cx('comment')}>{commentData.content}</div>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('action')}>Thich</div>
                    <div className={cx('action')}>Phản hồi</div>
                    <div className={cx('created-at')}>
                        {`${CommonUtils.timeSince(new Date(commentData.createdAt))} trước`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
