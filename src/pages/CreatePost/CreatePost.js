import { FileImageOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import CheckboxGroup from '~/components/CheckboxGroup';
import Result from '~/components/Result';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import styles from './CreatePost.module.scss';

const cx = classNames.bind(styles);

const CreatePost = () => {
    const dispatch = useDispatch();

    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [photos, setPhotos] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [mode, setMode] = useState('global');
    const [allows, setAllows] = useState(['comment', 'save']);
    const [content, setContent] = useState('');

    // HANDLE CHANGE PHOTO
    const handleChangeThumbnail = async (e) => {
        const files = e.target.files;
        const filesLength = e.target.files.length;
        const imagesBase64 = [];
        const urlPreviewImages = [];

        for (let i = 0; i < filesLength; i++) {
            const file = files[i];
            const imageBase64 = await CommonUtils.getBase64(file);
            const urlPreviewImage = URL.createObjectURL(file);

            imagesBase64.push(imageBase64);
            urlPreviewImages.push(urlPreviewImage);
        }

        setPreviewImages(urlPreviewImages);
        setPhotos(imagesBase64);
    };

    // HANDLE CREATE
    const handleCreatePost = () => {
        const userId = userLoggedIn.id;
        const data = {
            userId,
            photos,
            status: 'resolve',
            mode,
            allows,
            content,
        };

        dispatch(actions.createPostStart(data));
    };

    // HANDLE CANCEL
    const handleCancel = () => {
        setPreviewImages([]);
        setContent('');
    };

    // HANDLE CHANGE MODE
    const handleChangeMode = (mode) => {
        setMode(mode);
    };

    // HANDLE CHANGE ALLOW
    const handleChangeAllow = (checkedValues) => {
        setAllows(checkedValues);
    };

    return (
        <div className={cx('wrapper')}>
            {!_.isEmpty(userLoggedIn) ? (
                <Fragment>
                    {/* Photos */}
                    <div className={cx('photos')}>
                        {previewImages.map((image, index) => (
                            <div key={index} className={cx('photo')}>
                                <img src={image} alt="" className={cx('image')} />
                            </div>
                        ))}

                        <label htmlFor="thumbnail" className={cx('photo', 'add')}>
                            <FileImageOutlined className={cx('add-icon')} />
                        </label>

                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            onChange={(e) => handleChangeThumbnail(e)}
                            multiple
                            hidden
                        />
                    </div>

                    {/* Form */}
                    <div className={cx('form')}>
                        {/* Mode */}
                        <div className={cx('group')} style={{ '--columns': 1 }}>
                            <div className={cx('item')}>
                                <label className={cx('label')}>Chế độ</label>
                                <Select
                                    defaultValue={{ value: 'global', label: 'Công khai' }}
                                    options={[
                                        { value: 'global', label: 'Công khai' },
                                        { value: 'private', label: 'Riêng tư' },
                                    ]}
                                    onChange={handleChangeMode}
                                />
                            </div>
                        </div>

                        {/* Allows */}
                        <div className={cx('group')} style={{ '--columns': 1 }}>
                            <div className={cx('item')}>
                                <label className={cx('label')}>Cho phép người dùng</label>
                                <CheckboxGroup
                                    defaultValue={['comment', 'save']}
                                    options={[
                                        { value: 'comment', label: 'Bình luận', checked: true },
                                        { value: 'save', label: 'Lưu bài viết' },
                                    ]}
                                    onChange={handleChangeAllow}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className={cx('group')} style={{ '--columns': 1 }}>
                            <div className={cx('item')}>
                                <label className={cx('label')} htmlFor="content">
                                    Nội dung
                                </label>
                                <TextArea
                                    rows="3"
                                    name="content"
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></TextArea>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className={cx('buttons')}>
                            <Button onClick={handleCancel}>Hủy</Button>
                            <Button type="primary" onClick={handleCreatePost}>
                                Đăng
                            </Button>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Result />
            )}
        </div>
    );
};

export default CreatePost;
