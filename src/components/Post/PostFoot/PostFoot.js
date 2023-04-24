import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { Fragment, memo, useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PostContext } from '~/Providers';
import AvatarGroup from '~/components/AvatarGroup';
import CommentList from '~/components/CommentList';
import Modal from '~/components/Modal';
import * as postServices from '~/services/postServices';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import { PATH } from '~/utils/constant';
import styles from './PostFoot.module.scss';

const cx = classNames.bind(styles);

const PostFoot = () => {
    const intl = useIntl();
    const commentText = intl.formatMessage({ id: 'post.comment' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postContext = useContext(PostContext);

    const isLoggedIn = useSelector(selectors.isLoggedIn);
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const fetchPostData = postContext.fetchPostData;
    const post = postContext.post;
    const likeCount = post.likeCount;
    const comments = post.comments;
    const commentCount = post.commentCount;

    const [showComment, setShowComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // CHECK LIKED
    useEffect(() => {
        if (!_.isEmpty(userLoggedIn) && !_.isEmpty(userLoggedIn.likedPosts)) {
            if (userLoggedIn.likedPosts.includes(post.id)) setIsLiked(true);
        }
    }, [post.id, userLoggedIn, isLoggedIn]);

    // SHOW MODAL COMMENT
    const handleShowModalComment = () => {
        setShowComment(true);
    };

    // HIDE MODAL COMMENT
    const handleCloseModalComment = () => {
        setShowComment(false);
    };

    // HANDLE LIKE
    const handleLike = async () => {
        if (isLoggedIn) {
            await postServices.handleLike(userLoggedIn.id, post.id);

            const likedPosts = userLoggedIn.likedPosts;
            const newLikedPosts = [...likedPosts, post.id];
            dispatch(actions.updateLikedPostsStart(newLikedPosts));

            setIsLiked(true);
            fetchPostData();
        } else {
            navigate(PATH.login);
        }
    };

    // HANDLE UNLIKE
    const handleUnlike = async () => {
        await postServices.handleUnlike(userLoggedIn.id, post.id);

        const likedPosts = userLoggedIn.likedPosts;
        const newLikedPosts = likedPosts.filter((likedPost) => likedPost !== post.id);
        dispatch(actions.updateLikedPostsStart(newLikedPosts));

        setIsLiked(false);
        fetchPostData();
    };

    return (
        <Fragment>
            {!_.isEmpty(post) && (
                <Fragment>
                    <div className={cx('foot')}>
                        <div className={cx('wrapper')}>
                            <div className={cx('item')}>
                                {!isLiked ? (
                                    <HeartOutlined className={cx('icon')} onClick={handleLike} />
                                ) : (
                                    <HeartFilled className={cx('icon', 'icon-fill')} onClick={handleUnlike} />
                                )}
                                <span className={cx('count')}>{likeCount}</span>
                            </div>

                            <div className={cx('item')} onClick={handleShowModalComment}>
                                <MessageOutlined className={cx('icon')} />
                                <span className={cx('count')}>{commentCount}</span>
                            </div>
                        </div>

                        {post.usersLiked && post.usersLiked.length > 0 && <AvatarGroup users={post.usersLiked} />}
                    </div>

                    <Modal
                        title={`${commentText} (${commentCount})`}
                        open={showComment}
                        onCancel={handleCloseModalComment}
                        width={500}
                        footer={null}
                    >
                        {post.allowComment ? (
                            <CommentList postId={post.id} commentData={comments} />
                        ) : (
                            <div className={cx('closed-comment')}>
                                <span className={cx('closed-comment-text')}>
                                    <FormattedMessage id="post.disabledComments" />
                                </span>
                            </div>
                        )}
                    </Modal>
                </Fragment>
            )}
        </Fragment>
    );
};

export default memo(PostFoot);
