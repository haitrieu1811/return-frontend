import { CheckCircleFilled, EditOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Modal from '~/components/Modal';
import NoData from '~/components/NoData';
import PostList from '~/components/PostList';
import Spinner from '~/components/Spinner';
import Tooltip from '~/components/Tooltip';
import { emitter } from '~/emitter';
import * as postServices from '~/services/postServices';
import * as userServices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import styles from './Profile.module.scss';
import UpdateForm from './UpdateForm';

const cx = classNames.bind(styles);

const Profile = () => {
    const intl = useIntl();
    const updateInfoTxt = intl.formatMessage({ id: 'profile.updateInfo' });
    const cancelTxt = intl.formatMessage({ id: 'form.cancel' });
    const updateTxt = intl.formatMessage({ id: 'form.update' });
    const noPostCreateTxt = intl.formatMessage({ id: 'post.noPostCreate' });

    const navigate = useNavigate();

    const { userId } = useParams();

    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // SET USER
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [navigate, userId]);

    // SET POSTS
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await postServices.getListPosts(userId, 1);
            if (res && res.errCode === 0) setPosts(res.data);
            else setPosts([]);
            setIsLoading(false);
        })();
    }, [userId]);

    // SHOW MODAL
    const showModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // UPDATE
    const handleOk = () => {
        emitter.emit('HANDLE_UPDATE_USER');
    };

    // FETCH MORE POST
    const fetchMorePost = async () => {
        const nextPage = page + 1;
        const morePost = await postServices.getListPosts(userId, nextPage);
        if (morePost && morePost.errCode === 0) {
            setPosts((prevState) => [...prevState, ...morePost.data]);
            setPage(nextPage);
        } else {
            setHasMore(false);
        }
    };

    return (
        <Fragment>
            {!_.isEmpty(user) && (
                <div className={cx('wrapper')}>
                    <div className={cx('info')}>
                        <img
                            src={user.avatar ? CommonUtils.renderImage(user.avatar) : DefaultAvatar}
                            alt={user.lastName}
                            className={cx('avatar')}
                        />

                        <div className={cx('info-list')}>
                            <div className={cx('head')}>
                                <div className={cx('fullName')}>
                                    <h2 className={cx('firstName')}>{user.firstName}</h2>
                                    <p className={cx('lastName')}>{user.lastName}</p>
                                </div>
                                {user.tick === 1 && <CheckCircleFilled className={cx('tick')} />}
                            </div>

                            <div className={cx('statistics')}>
                                <div className={cx('statistic')}>
                                    <div className={cx('statistic-label')}>
                                        <FormattedMessage id="profile.post" />
                                    </div>
                                    <div className={cx('statistic-value')}>{user.postCount}</div>
                                </div>
                                <div className={cx('statistic')}>
                                    <div className={cx('statistic-label')}>
                                        <FormattedMessage id="profile.likes" />
                                    </div>
                                    <div className={cx('statistic-value')}>{user.likeCount}</div>
                                </div>
                            </div>
                        </div>

                        {Number(userId) === userLoggedIn.id && (
                            <div className={cx('update')} onClick={showModal}>
                                <Tooltip title="Cập nhật thông tin">
                                    <EditOutlined className={cx('update-icon')} />
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    {isLoading && <Spinner />}
                    {posts && posts.length > 0 && !isLoading && (
                        <InfiniteScroll
                            dataLength={posts.length}
                            hasMore={hasMore}
                            next={fetchMorePost}
                            loader={<Spinner />}
                        >
                            <PostList postList={posts} />
                        </InfiniteScroll>
                    )}
                    {posts && posts.length <= 0 && !isLoading && <NoData text={noPostCreateTxt} />}
                </div>
            )}

            {Number(userId) === userLoggedIn.id && (
                <Modal
                    title={updateInfoTxt}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    width={500}
                    onOk={handleOk}
                    cancelText={cancelTxt}
                    okText={updateTxt}
                >
                    <UpdateForm userId={userId} user={user} setUser={setUser} />
                </Modal>
            )}
        </Fragment>
    );
};

export default Profile;
