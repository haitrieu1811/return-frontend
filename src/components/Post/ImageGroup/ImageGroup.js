import { PlusCircleFilled } from '@ant-design/icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { emitter } from '~/emitter';

import { PostContext } from '~/Providers';
import * as actions from '~/store/actions';
import CommonUtils from '~/utils/CommonUtils';
import styles from './ImageGroup.module.scss';

const cx = classNames.bind(styles);

const ImageGroup = ({ postId, setPhotos }) => {
    const dispatch = useDispatch();

    const postContext = useContext(PostContext);

    const post = postContext.post;

    const [previewImages, setPreviewImages] = useState([]);

    // HANDLE CHANGE INPUT IMAGES
    const handleChangeInputImages = async (e) => {
        const files = e.target.files;
        const PREVIEW_IMAGES = [];
        const PHOTOS = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const previewImage = URL.createObjectURL(file);
            const imageBase64 = await CommonUtils.getBase64(file);

            PREVIEW_IMAGES.push(previewImage);
            PHOTOS.push(imageBase64);
        }

        setPreviewImages(PREVIEW_IMAGES);
        setPhotos(PHOTOS);
    };

    // HANLDE DELETE PHOTO
    const handleDeletePhoto = async (photoId) => {
        await dispatch(actions.deletePhotoStart(photoId));
        postContext.fetchPostData();
    };

    (() => {
        emitter.removeAllListeners('HANDLE_RESET_PREVIEW_IMAGES');
        emitter.on('HANDLE_RESET_PREVIEW_IMAGES', () => {
            setPreviewImages([]);
        });
    })();

    return (
        <div className={cx('wrapper')}>
            {post.photos.map((image, index) => (
                <div key={index} className={cx('item')}>
                    <img src={CommonUtils.renderImage(image.source)} alt="" className={cx('image')} />
                    <span className={cx('delete')} onClick={() => handleDeletePhoto(image.id)}>
                        <FontAwesomeIcon icon={faTimes} className={cx('delete-icon')} />
                    </span>
                </div>
            ))}

            {previewImages.map((image, index) => (
                <div key={index} className={cx('item')}>
                    <img src={image} alt="" className={cx('image')} />
                </div>
            ))}

            <label htmlFor={`photos-${postId}`} className={cx('item', 'add')}>
                <PlusCircleFilled className={cx('add-icon')} />
            </label>

            <input
                type="file"
                name="photos"
                id={`photos-${postId}`}
                onChange={(e) => handleChangeInputImages(e)}
                multiple
                hidden
            />
        </div>
    );
};

export default memo(ImageGroup);
