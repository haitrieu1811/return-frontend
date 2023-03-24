import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';

import styles from './Post.module.scss';
import * as userServices from '~/services/userServices';
import CommonUtils from '~/utils/CommonUtils';

const cx = classNames.bind(styles);

const Post = ({ data }) => {
    const [user, setUser] = useState({});

    const userId = data.userId;
    const thumbnail = new Buffer(data.thumbnail, 'base64').toString('binary');
    const userAvatar = user.avatar ? new Buffer(user.avatar, 'base64').toString('binary') : '';

    useEffect(() => {
        (async () => {
            const res = await userServices.getUserById(userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [userId]);

    return (
        <div className={cx('wrapper')}>
            <Link>
                <img src={thumbnail} alt={data.title} className={cx('thumb')} />
            </Link>

            <div className={cx('body')}>
                {user && userAvatar && (
                    <Link to={`/profile/${user.id}`}>
                        <img src={userAvatar} alt={user.firstName} className={cx('author-avatar')} />
                    </Link>
                )}

                <div className={cx('info')}>
                    <Link>
                        <h3 className={cx('title')}>{data.title}</h3>
                    </Link>

                    {user && (
                        <Link
                            to={`/profile/${user.id}`}
                            className={cx('author-name')}
                        >{`${user.firstName} ${user.lastName}`}</Link>
                    )}

                    <div className={cx('config')}>
                        <div className={cx('likes')}>
                            <div className={cx('like')}>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like-icon')} />
                                <span className={cx('like-count')}>{data.likeCount}</span>
                            </div>
                            <div className={cx('like')}>
                                <FontAwesomeIcon icon={faThumbsDown} className={cx('like-icon')} />
                                <span className={cx('like-count')}>{data.dislikeCount}</span>
                            </div>
                        </div>
                        <div className={cx('created-at')}>{`${CommonUtils.timeSince(
                            new Date(data.createdAt),
                        )} trước`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
