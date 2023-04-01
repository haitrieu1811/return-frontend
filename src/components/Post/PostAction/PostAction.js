import classNames from 'classnames/bind';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { emitter } from '~/emitter';
import styles from './PostAction.module.scss';
import Modal from '~/components/Modal';
import Comment from '~/components/Comment';
import Tooltip from '~/components/Tooltip';
import * as postServices from '~/services/postServices';
import * as selectors from '~/store/selectors';

const cx = classNames.bind(styles);

const PostAction = ({ data, renderUsersLiked }) => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [isShowComment, setIsShowComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isLikedArr, setIsLikedArr] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    // Liked posts (array)
    useEffect(() => {
        (async () => {
            const res = await postServices.getLikedPostsIdOfUser(userLoggedIn.id);
            if (res && res.errCode === 0) setIsLikedArr(res.data);
        })();
    }, [userLoggedIn.id]);

    // Check liked
    useEffect(() => {
        if (isLikedArr.includes(data.id)) setIsLiked(true);
    }, [data.id, isLikedArr]);

    // Get like count
    useEffect(() => {
        (async () => {
            const postId = data.id;
            const res = await postServices.getLikeCount(postId);
            if (res && res.errCode === 0) setLikeCount(res.data);
        })();
    }, [data.id]);

    // Get comment count
    useEffect(() => {
        (async () => {
            const postId = data.id;
            const res = await postServices.getCommentCount(postId);
            if (res && res.errCode === 0) setCommentCount(res.data);
        })();
    }, [data.id]);

    // Show modal comment
    const handleShowModalComment = () => {
        setIsShowComment(true);
    };

    // Hide modal comment
    const handleCloseModalComment = () => {
        setIsShowComment(false);
    };

    // Handle like
    const handleLike = async () => {
        const userId = userLoggedIn.id;
        const postId = data.id;
        await postServices.handleLike(userId, postId);
        setIsLiked(true);
        setLikeCount((prevState) => prevState + 1);
        renderUsersLiked();
    };

    // Handle unlike
    const handleUnlike = async () => {
        const userId = userLoggedIn.id;
        const postId = data.id;
        await postServices.handleUnlike(userId, postId);
        setIsLiked(false);
        setLikeCount((prevState) => prevState - 1);
        renderUsersLiked();
    };

    // Increase comment count
    (() => {
        emitter.removeAllListeners();
        emitter.on('HANDLE_INCREASE_COMMENT_COUNT', () => {
            setCommentCount((prevState) => prevState + 1);
        });
    })();

    return (
        <>
            <div className={cx('wrapper')}>
                <Tooltip title="Lượt thích">
                    <div className={cx('item')}>
                        {!isLiked ? (
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} onClick={handleLike} />
                        ) : (
                            <FontAwesomeIcon
                                icon={faHeartFill}
                                className={cx('icon', 'icon-fill')}
                                onClick={handleUnlike}
                            />
                        )}
                        <span className={cx('count')}>{likeCount}</span>
                    </div>
                </Tooltip>

                <Tooltip title="Bình luận">
                    <div className={cx('item')} onClick={handleShowModalComment}>
                        <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                        <span className={cx('count')}>{commentCount}</span>
                    </div>
                </Tooltip>
            </div>

            <Modal
                title={`Bình luận (${commentCount})`}
                open={isShowComment}
                onCancel={handleCloseModalComment}
                width={500}
                footer={null}
            >
                <Comment userId={userLoggedIn.id} postId={data.id} />
            </Modal>
        </>
    );
};

export default PostAction;
