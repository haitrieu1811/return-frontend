import { DeleteOutlined } from '@ant-design/icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { PostContext } from '~/Providers';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Popconfirm from '~/components/Popconfirm';
import * as userServices from '~/services/userServices';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import { PATH } from '~/utils/constant';
import { CommentContext } from '../CommentList/CommentList';
import MenuItem from '../MenuItem';
import Wrapper from '../Wrapper';
import styles from './CommentUI.module.scss';

const cx = classNames.bind(styles);

const CommentUI = ({ commentData, isReply }) => {
    const intl = useIntl();
    const deleteCommentConfirmTxt = intl.formatMessage({ id: 'post.deleteCommentConfirm' });
    const deleteCommentConfirmDescTxt = intl.formatMessage({ id: 'post.deleteCommentConfirmDesc' });
    const yesTxt = intl.formatMessage({ id: 'form.yes' });
    const noTxt = intl.formatMessage({ id: 'form.no' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const postContext = useContext(PostContext);
    const commentContext = useContext(CommentContext);

    const fetchPostData = postContext.fetchPostData;

    const input = commentContext.input;
    const setReplyName = commentContext.setReplyName;
    const setAuthorReply = commentContext.setAuthorReply;
    const setCommentIdReply = commentContext.setCommentIdReply;

    const [author, setAuthor] = useState({});
    const [responseUser, setResponseUser] = useState({});

    // SET AUTHOR OF COMMENT
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(commentData.commentBy);
            if (res && res.errCode === 0) setAuthor(res.data);
        })();
    }, [commentData.commentBy]);

    // SET RESPONSE USER
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(commentData.responseId);
            if (res && res.errCode === 0) setResponseUser(res.data);
        })();
    }, [commentData.responseId]);

    // HANDLE RENDER OPTIONS
    const handleRenderOptions = () => {
        return (
            <Wrapper>
                <MenuItem icon={<DeleteOutlined />}>
                    <Popconfirm
                        title={deleteCommentConfirmTxt}
                        description={deleteCommentConfirmDescTxt}
                        cancelText={noTxt}
                        okText={yesTxt}
                        onConfirm={handleDeleteCommentById}
                    >
                        <span>
                            <FormattedMessage id="post.deleteComment" />
                        </span>
                    </Popconfirm>
                </MenuItem>
            </Wrapper>
        );
    };

    // DELETE COMMENT BY ID OF COMMENT
    const handleDeleteCommentById = async () => {
        if (!isReply) await dispatch(actions.handleDeleteCommentById(commentData.id));
        else await dispatch(actions.handleDeleteCommentReplyById(commentData.id));
        fetchPostData();
    };

    // REPLY
    const handleReply = () => {
        if (isLoggedIn) {
            const fullName = `${author.firstName} ${author.lastName}`;

            setReplyName(fullName);

            if (!isReply) setCommentIdReply(commentData.id);
            else setCommentIdReply(commentData.commentId);

            setAuthorReply(author);

            input.current.focus();
        } else {
            navigate(PATH.login);
        }
    };

    return (
        <div className={cx('wrapper', { reply: isReply })}>
            <Link to={`/profile/${author.id}`} className={cx('avatar-link')}>
                <img
                    src={author.avatar ? CommonUtils.renderImage(author.avatar) : DefaultAvatar}
                    alt={author.firstName}
                    className={cx('avatar')}
                />
            </Link>

            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Link to={`/profile/${author.id}`}>
                        <h3 className={cx('name')}>{`${author.firstName} ${author.lastName}`}</h3>
                    </Link>
                    <div className={cx('comment')}>
                        {!_.isEmpty(responseUser) && (
                            <Link to={`/profile/${responseUser.id}`} className={cx('tag-name')}>
                                {`${responseUser.firstName}${responseUser.lastName}`}
                            </Link>
                        )}
                        {commentData.content}
                    </div>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('action')} onClick={handleReply}>
                        <FormattedMessage id="post.reply" />
                    </div>
                    <div className={cx('created-at')}>
                        {CommonUtils.timeSince(new Date(commentData.createdAt))} <FormattedMessage id="time.ago" />
                    </div>
                </div>
            </div>

            {userLoggedIn.id === author.id && (
                <Tippy interactive render={handleRenderOptions} placement="bottom-end" offset={[0, 0]} trigger="click">
                    <div className={cx('options')}>
                        <FontAwesomeIcon icon={faEllipsis} className={cx('options-icon')} />
                    </div>
                </Tippy>
            )}
        </div>
    );
};

export default CommentUI;
