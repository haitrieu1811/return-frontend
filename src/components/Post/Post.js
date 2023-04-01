import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import Popconfirm from '~/components/Popconfirm';
import * as locationServices from '~/services/locationService';
import * as postServices from '~/services/postServices';
import * as userServices from '~/services/userServices';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import AvatarGroup from '../AvatarGroup';
import MenuItem from '../MenuItem/MenuItem';
import Wrapper from '../Wrapper/Wrapper';
import styles from './Post.module.scss';
import PostAction from './PostAction';
import Spinner from '../Spinner/Spinner';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';

const cx = classNames.bind(styles);

const Post = ({ postData }) => {
    const dispatch = useDispatch();

    const usersLoggedIn = useSelector(selectors.userLoggedIn);

    const [user, setUser] = useState({});
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [photos, setPhotos] = useState([]);
    const [userAvatar, setUserAvatar] = useState(DefaultAvatar);
    const [isShowMore, setIsShowMore] = useState(postData.content.length > 100 ? true : false);
    const [isShowLess, setIsShowLess] = useState(false);
    const [shortContent, setShortContent] = useState(`${postData.content.substring(0, 100)}...`);
    const [usersLiked, setUsersLiked] = useState([]);
    const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

    // Set user
    useEffect(() => {
        (async () => {
            const res = await userServices.getUserById(postData.userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [postData.userId]);

    // Set user avatar
    useEffect(() => {
        if (user.avatar) {
            const avatar = CommonUtils.renderImage(user.avatar);
            setUserAvatar(avatar);
        }
    }, [user.avatar]);

    // Set provinces
    useEffect(() => {
        (async () => {
            const res = await locationServices.getProvinceById(postData.provinceId);
            if (res && res.errCode === 0) setProvince(res.data.name);
        })();
    }, [postData.provinceId]);

    // Set districts
    useEffect(() => {
        (async () => {
            const res = await locationServices.getDistrictById(postData.districtId);
            if (res && res.errCode === 0) setDistrict(res.data.name);
        })();
    }, [postData.districtId]);

    // Set photos
    useEffect(() => {
        (async () => {
            setIsLoadingPhotos(true);
            const res = await postServices.getPhotosByPostId(postData.id);
            if (res && res.errCode === 0) {
                const photosData = res.data;
                const photos = photosData.map((photo) => CommonUtils.renderImage(photo.source));
                setPhotos(photos);
            }
            setIsLoadingPhotos(false);
        })();
    }, [postData.id]);

    // Set users liked
    useEffect(() => {
        (async () => {
            const res = await postServices.getUsersLikedPost(postData.id);
            if (res && res.errCode === 0) setUsersLiked(res.data);
        })();
    }, [postData.id]);

    // Handle see more
    const handleSeeMore = () => {
        setIsShowLess(true);
        setIsShowMore(false);
        setShortContent(postData.content);
    };

    // Handle see less
    const handleSeeLess = () => {
        setIsShowLess(false);
        setIsShowMore(true);
        setShortContent(`${postData.content.substring(0, 100)}...`);
    };

    // HANDLE_RENDER_USERS_LIKED
    const handleRenderUsersLiked = async () => {
        const res = await postServices.getUsersLikedPost(postData.id);
        if (res && res.errCode === 0) setUsersLiked(res.data);
    };

    // Handle render options
    const handleRenderOptions = () => {
        return (
            <Wrapper>
                <MenuItem>Báo cáo bài viết</MenuItem>
                {usersLoggedIn.id === user.id && (
                    <>
                        <MenuItem>Chỉnh sửa bài viết</MenuItem>
                        <MenuItem>
                            <Popconfirm
                                title="Bạn có chắc muốn xóa bài viết này"
                                description="Bài viết sẽ không được khôi phục khi xóa"
                                okText="Có"
                                cancelText="Không"
                                onConfirm={handleDelete}
                            >
                                Xóa bài viết
                            </Popconfirm>
                        </MenuItem>
                    </>
                )}
            </Wrapper>
        );
    };

    // Handle delete
    const handleDelete = () => {
        dispatch(actions.deletePostStart(postData.id, usersLoggedIn.id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <div className={cx('config')}>
                    <Link to={`/profile/${postData.userId}`} className={cx('avatar-link')}>
                        <img src={userAvatar} alt={user.firstName} className={cx('avatar')} />
                    </Link>
                    <div className={cx('config-y')}>
                        <Link to={`/profile/${postData.userId}`}>
                            <h3 className={cx('author-name')}>{`${user.firstName} ${user.lastName}`}</h3>
                        </Link>
                        <Link className={cx('location')}>{`${district} - ${province}`}</Link>
                    </div>
                    <div className={cx('time')}>{`${CommonUtils.timeSince(new Date(postData.createdAt))} trước`}</div>
                </div>
                <Tippy interactive render={handleRenderOptions} trigger="click" placement="bottom-end" offset={[0, 0]}>
                    <div className={cx('options')}>
                        <FontAwesomeIcon icon={faEllipsis} className={cx('options-icon')} />
                    </div>
                </Tippy>
            </div>

            <div className={cx('body')}>
                <div className={cx('content')}>
                    {postData.content.length > 100 ? shortContent : postData.content}
                    {isShowMore && (
                        <span className={cx('see-more')} onClick={handleSeeMore}>
                            Xem thêm
                        </span>
                    )}
                    {isShowLess && (
                        <span className={cx('see-more')} onClick={handleSeeLess}>
                            Rút gọn
                        </span>
                    )}
                </div>
                <div className={cx('photos')}>
                    {!isLoadingPhotos ? (
                        <Image data={photos} />
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('foot')}>
                <PostAction data={postData} renderUsersLiked={handleRenderUsersLiked} />
                {usersLiked && usersLiked.length > 0 && <AvatarGroup users={usersLiked} />}
            </div>
        </div>
    );
};

export default Post;
