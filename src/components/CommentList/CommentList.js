import classNames from 'classnames/bind';
import _ from 'lodash';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { PostContext } from '~/Providers';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import * as postServices from '~/services/postServices';
import * as userServices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import CommentItem from '../CommentItem';
import styles from './CommentList.module.scss';
import NoData from '../NoData';

export const CommentContext = createContext();

const cx = classNames.bind(styles);

const CommentList = () => {
    const intl = useIntl();
    const typeCommentTxt = intl.formatMessage({ id: 'post.typeComment' });
    const noCommentTxt = intl.formatMessage({ id: 'post.noComment' });

    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const input = useRef();
    const firstRowComment = useRef();

    const postContext = useContext(PostContext);

    const fetchPostData = postContext.fetchPostData;
    const post = postContext.post;
    const comments = post.comments;

    const [user, setUser] = useState({});
    const [isReply, setIsReply] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    const [replyName, setReplyName] = useState('');
    const [authorReply, setAuthorReply] = useState('');
    const [commentIdReply, setCommentIdReply] = useState('');

    // CHANGE WAY COMMENT
    useEffect(() => {
        if (replyName) setIsReply(true);
        else setIsReply(false);
    }, [replyName]);

    // GET CURRENT USER
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(userLoggedIn.id);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [userLoggedIn.id]);

    // SCROLL TO TOP WHEN ADD COMMENT
    useEffect(() => {
        if (firstRowComment && firstRowComment.current) {
            firstRowComment.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [comments]);

    // HANDLE CHANGE COMMENT CONTENT
    const handleChangeCommentContent = (e) => {
        const value = e.target.value;
        setCommentContent(value);
    };

    // HANDLE CREATE COMMENT
    const handleCreateComment = async (e) => {
        e.preventDefault();

        if (!isReply) await postServices.createComment(userLoggedIn.id, post.id, commentContent);
        else await postServices.createCommentReply(commentIdReply, userLoggedIn.id, authorReply.id, commentContent);

        setReplyName('');
        setCommentContent('');

        fetchPostData();
    };

    // VALUES PROVIDER
    const VALUES = {
        setReplyName,
        input,
        setAuthorReply,
        setCommentIdReply,
    };

    // HANDLE CANCEL REPLY
    const handleCancelReply = () => {
        setReplyName('');
    };

    return (
        <CommentContext.Provider value={VALUES} className={cx('wrapper')}>
            {comments && comments.length > 0 ? (
                <div className={cx('list')}>
                    <div ref={firstRowComment}></div>
                    {comments.map((comment, index) => (
                        <CommentItem key={index} commentData={comment} replyList={comment.replies} />
                    ))}
                </div>
            ) : (
                <NoData text={noCommentTxt} />
            )}

            {!_.isEmpty(userLoggedIn) && (
                <form className={cx('add')} onSubmit={(e) => handleCreateComment(e)}>
                    <Link to={`/profile/${userLoggedIn.id}`} className={cx('avatar-link')}>
                        <img
                            src={user.avatar ? CommonUtils.renderImage(user.avatar) : DefaultAvatar}
                            alt={user.firstName}
                            className={cx('avatar')}
                        />
                    </Link>

                    <div className={cx('input-container')}>
                        {replyName && (
                            <div className={cx('reply')}>
                                <FormattedMessage id="post.reply" />:{' '}
                                <strong className={cx('reply-name')}>{replyName}</strong>
                                <CloseCircleFilled className={cx('close-reply')} onClick={handleCancelReply} />
                            </div>
                        )}

                        <input
                            ref={input}
                            type="text"
                            placeholder={typeCommentTxt}
                            value={commentContent}
                            className={cx('input')}
                            onChange={(e) => handleChangeCommentContent(e)}
                        />
                    </div>
                </form>
            )}
        </CommentContext.Provider>
    );
};

export default CommentList;
