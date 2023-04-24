import {
    BookOutlined,
    CheckCircleFilled,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    FlagOutlined,
} from '@ant-design/icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { Fragment, memo, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emitter } from '~/emitter';
import { FormattedMessage, useIntl } from 'react-intl';

import { PostContext } from '~/Providers';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import MenuItem from '~/components/MenuItem/MenuItem';
import Modal from '~/components/Modal';
import Popconfirm from '~/components/Popconfirm';
import Wrapper from '~/components/Wrapper/Wrapper';
import * as postServices from '~/services/postServices';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import UpdateForm from '../UpdateForm';
import styles from './PostHead.module.scss';

const cx = classNames.bind(styles);

const PostHead = () => {
    const intl = useIntl();
    const cancelTxt = intl.formatMessage({ id: 'form.cancel' });
    const updateTxt = intl.formatMessage({ id: 'form.update' });
    const yesTxt = intl.formatMessage({ id: 'form.yes' });
    const noTxt = intl.formatMessage({ id: 'form.no' });
    const updatePostTxt = intl.formatMessage({ id: 'post.updatePost' });
    const deleteConfirmText = intl.formatMessage({ id: 'post.deleteConfirm' });
    const deleteConfirmDescText = intl.formatMessage({ id: 'post.deleteConfirmDesc' });

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectors.isLoggedIn);
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const postContext = useContext(PostContext);

    const fetchPostData = postContext.fetchPostData;
    const post = postContext.post;
    const author = !_.isEmpty(post.author) ? post.author : {};

    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    console.log('>>> userLoggedIn:', userLoggedIn, post.id);

    // CHECK SAVED
    useEffect(() => {
        if (!_.isEmpty(userLoggedIn) && userLoggedIn.savedPosts) {
            if (userLoggedIn.savedPosts.includes(post.id)) setIsSaved(true);
            else setIsSaved(false);
        }
    }, [post, userLoggedIn, isLoggedIn]);

    // DELETE POST
    const handleDelete = async () => {
        await dispatch(actions.deletePostStart(post.id));
        fetchPostData();
    };

    // UPDATE POST
    const handleUpdate = () => {
        emitter.emit('HANDLE_UPDATE_POST'); // Listen on UpdateForm
    };

    // RENDER OPTIONS POST
    const handleRenderOptions = () => {
        return (
            <Wrapper>
                <MenuItem icon={<FlagOutlined />}>
                    <FormattedMessage id="post.reportPost" />
                </MenuItem>

                {post.allowSave === 1 && isLoggedIn && (
                    <Fragment>
                        {!isSaved ? (
                            <MenuItem icon={<BookOutlined />} onClick={() => handleSavePost(post.id, userLoggedIn.id)}>
                                <FormattedMessage id="post.savePost" />
                            </MenuItem>
                        ) : (
                            <MenuItem
                                icon={<CloseCircleOutlined />}
                                onClick={() => handleUnSavePost(post.id, userLoggedIn.id)}
                            >
                                <FormattedMessage id="post.unSavePost" />
                            </MenuItem>
                        )}
                    </Fragment>
                )}

                {userLoggedIn.id === author.id && (
                    <Fragment>
                        <MenuItem onClick={() => setIsOpenUpdateForm(true)} icon={<EditOutlined />}>
                            <FormattedMessage id="post.editPost" />
                        </MenuItem>
                        <MenuItem icon={<DeleteOutlined />}>
                            <Popconfirm
                                title={deleteConfirmText}
                                description={deleteConfirmDescText}
                                okText={yesTxt}
                                cancelText={noTxt}
                                onConfirm={handleDelete}
                            >
                                <span>
                                    <FormattedMessage id="post.deletePost" />
                                </span>
                            </Popconfirm>
                        </MenuItem>
                    </Fragment>
                )}
            </Wrapper>
        );
    };

    // HANDLE SAVE POST
    const handleSavePost = async (postId, userId) => {
        await postServices.savePost(postId, userId, 'resolve');
        await fetchPostData();

        const savedPosts = userLoggedIn.savedPosts;
        const newSavedPosts = [...savedPosts, postId];
        dispatch(actions.updateSavedPostsStart(newSavedPosts));
    };

    // HANDLE UNSAVE POST
    const handleUnSavePost = async (postId, userId) => {
        await postServices.unSavePost(postId, userId);
        await fetchPostData();

        const savedPosts = userLoggedIn.savedPosts;
        const newSavedPosts = savedPosts.filter((post) => post !== postId);
        dispatch(actions.updateSavedPostsStart(newSavedPosts));

        emitter.emit('RE_FETCH_SAVED_POSTS', postId);
    };

    return (
        <Fragment>
            {!_.isEmpty(post) && (
                <div className={cx('wrapper')}>
                    <div className={cx('config')}>
                        <Link to={`/profile/${post.userId}`} className={cx('avatar-link')}>
                            <img
                                src={author.avatar ? CommonUtils.renderImage(author.avatar) : DefaultAvatar}
                                alt={author.firstName}
                                className={cx('avatar')}
                            />
                        </Link>

                        <div className={cx('config-y')}>
                            {!_.isEmpty(author) && (
                                <Link to={`/profile/${post.userId}`}>
                                    <h3 className={cx('author-name')}>
                                        {`${author.firstName} ${author.lastName}`}
                                        {author.tick === 1 && <CheckCircleFilled className={cx('tick')} />}
                                    </h3>
                                </Link>
                            )}
                            <div className={cx('time')}>
                                {CommonUtils.timeSince(new Date(post.createdAt))} <FormattedMessage id="time.ago" />
                            </div>
                        </div>
                    </div>

                    <Tippy
                        interactive
                        render={handleRenderOptions}
                        trigger="click"
                        placement="bottom-end"
                        offset={[0, 0]}
                        zIndex={1}
                    >
                        <div className={cx('options')}>
                            <FontAwesomeIcon icon={faEllipsis} className={cx('options-icon')} />
                        </div>
                    </Tippy>
                </div>
            )}

            <Modal
                title={updatePostTxt}
                open={isOpenUpdateForm}
                onCancel={() => setIsOpenUpdateForm(false)}
                width={600}
                cancelText={cancelTxt}
                okText={updateTxt}
                onOk={handleUpdate}
            >
                <UpdateForm />
            </Modal>
        </Fragment>
    );
};

export default memo(PostHead);
