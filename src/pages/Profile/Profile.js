import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import UpdateForm from '~/components/UpdateForm';
import { emitter } from '~/emitter';
import * as postServices from '~/services/postServices';
import * as userServices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import * as actions from '~/store/actions';
import CommonUtils from '~/utils/CommonUtils';
import styles from './Profile.module.scss';
import Skeleton from '~/components/Skeleton';

const Post = React.lazy(() => import('~/components/Post'));

const cx = classNames.bind(styles);

const Profile = () => {
    const dispatch = useDispatch();

    const { userId } = useParams();

    const userLoggedIn = useSelector(selectors.userLoggedIn);
    const userProfilePage = useSelector(selectors.userProfilePage);
    const reduxPostsOfUser = useSelector(selectors.listPostsOfUser);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(DefaultAvatar);
    const [posts, setPosts] = useState([]);

    // Set user
    useEffect(() => {
        dispatch(actions.readUserProfilePageStart(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        setUser(userProfilePage);
    }, [userProfilePage]);

    // Set avatar
    useEffect(() => {
        if (user.avatar) {
            const avatar = CommonUtils.renderImage(user.avatar);
            setAvatar(avatar);
        }
    }, [user.avatar]);

    // Posts
    useEffect(() => {
        dispatch(actions.readPostsOfUserStart(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        setPosts(reduxPostsOfUser);
    }, [reduxPostsOfUser]);

    // Handle
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        emitter.emit('HANDLE_UPDATE_USER');
    };

    return (
        <>
            {user && (
                <div className={cx('wrapper')}>
                    <div className={cx('info')}>
                        <img src={avatar} alt={user.lastName} className={cx('avatar')} />
                        <div className={cx('info-list')}>
                            <h2 className={cx('firstName')}>{user.firstName}</h2>
                            <p className={cx('lastName')}>{user.lastName}</p>
                            <div className={cx('statistics')}>
                                <div className={cx('statistic')}>
                                    <div className={cx('statistic-label')}>Bài đăng</div>
                                    <div className={cx('statistic-value')}>41</div>
                                </div>
                                <div className={cx('statistic')}>
                                    <div className={cx('statistic-label')}>Lượt thích</div>
                                    <div className={cx('statistic-value')}>976</div>
                                </div>
                                <div className={cx('statistic')}>
                                    <div className={cx('statistic-label')}>Đánh giá</div>
                                    <div className={cx('statistic-value')}>8.5</div>
                                </div>
                            </div>
                            <div className={cx('actions')}>
                                <Button type="primary">Theo dõi</Button>
                            </div>
                        </div>

                        {Number(userId) === userLoggedIn.id && (
                            <div className={cx('update')} onClick={showModal}>
                                <FontAwesomeIcon icon={faPencil} />
                            </div>
                        )}
                    </div>

                    {posts &&
                        posts.length > 0 &&
                        posts.map((post) => (
                            <Suspense key={post.id} fallback={<Skeleton />}>
                                <Post postData={post} />
                            </Suspense>
                        ))}
                </div>
            )}

            {Number(userId) === userLoggedIn.id && (
                <>
                    <Modal
                        title="Cập nhật thông tin"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        width={600}
                        onOk={handleOk}
                        cancelText="Hủy"
                        okText="Cập nhật"
                    >
                        <UpdateForm userId={userId} />
                    </Modal>
                </>
            )}
        </>
    );
};

export default Profile;
