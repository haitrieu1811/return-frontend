import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { Suspense } from 'react';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import UpdateForm from '~/components/UpdateForm';
import { emitter } from '~/emitter';
import * as userServices from '~/services/userServices';
import * as postServices from '~/services/postServices';
import * as selectors from '~/store/selectors';
import GridStyles from '~/components/GridStyles';
import styles from './Profile.module.scss';

const Post = React.lazy(() => import('~/components/Post'));

const cx = classNames.bind(styles);

const Profile = () => {
    const { userId } = useParams();

    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(DefaultAvatar);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await userServices.getUserById(userId);

            if (res && res.errCode === 0) {
                setUser(res.data);
            }
        })();
    }, [userId]);

    useEffect(() => {
        if (user.avatar) {
            const avatar = new Buffer(user.avatar, 'base64').toString('binary');
            setAvatar(avatar);
        }
    }, [user.avatar]);

    // Posts
    useEffect(() => {
        (async () => {
            const res = await postServices.getListPosts(userId);
            console.log(res);
            if (res && res.errCode === 0) setPosts(res.data);
        })();
    }, [userId]);

    emitter.on('HANDLE_UPDATE_AVATAR_PARENTS', () => {
        console.log('>>> Data from child: ');
    });

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
        <GridStyles>
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

                    {posts && posts.length > 0 && (
                        <div className="grid">
                            <div className="row">
                                {posts.map((post) => (
                                    <div key={post.id} className="col l-4 m-4 c-12">
                                        <Suspense fallback={<p>Loading</p>}>
                                            <Post data={post} />
                                        </Suspense>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
        </GridStyles>
    );
};

export default Profile;
