import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';
import * as locationServices from '~/services/locationService';
import * as selectors from '~/store/selectors';
import * as actions from '~/store/actions';
import styles from './CreatePost.module.scss';
import CommonUtils from '~/utils/CommonUtils';

const cx = classNames.bind(styles);

const CreatePost = () => {
    const dispatch = useDispatch();

    const userId = useSelector(selectors.userLoggedIn).id;
    const isSuccess = useSelector(selectors.isCreatePostSuccess);

    const [title, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [provinceId, setProvinceId] = useState(undefined);
    const [districtId, setDistrictId] = useState(undefined);
    const [wardId, setWardId] = useState(undefined);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provincesOptions, setProvincesOptions] = useState([]);
    const [districtsOptions, setDistrictsOptions] = useState([]);
    const [wardsOptions, setWardsOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await locationServices.getAllProvinces();
            if (res && res.errCode === 0) setProvinces(res.data);
        })();
    }, []);

    useEffect(() => {
        setProvincesOptions(
            provinces.map((province) => ({
                value: province.id,
                label: province.name,
            })),
        );
    }, [provinces]);

    useEffect(() => {
        (async () => {
            const res = await locationServices.getListDistricts(provinceId);
            if (res && res.errCode === 0) setDistricts(res.data);
        })();
    }, [provinceId]);

    useEffect(() => {
        setDistrictsOptions(
            districts.map((district) => ({
                value: district.id,
                label: `${district.prefix} ${district.name}`,
            })),
        );
    }, [districts]);

    useEffect(() => {
        (async () => {
            const res = await locationServices.getListWards(provinceId, districtId);
            if (res && res.errCode === 0) setWards(res.data);
        })();
    }, [provinceId, districtId]);

    useEffect(() => {
        setWardsOptions(
            wards.map((ward) => ({
                value: ward.id,
                label: `${ward.prefix} ${ward.name}`,
            })),
        );
    }, [wards]);

    // Handle
    const handleChangeProvince = (value) => {
        setProvinceId(value);
    };

    const handleChangeDistrict = (value) => {
        setDistrictId(value);
    };

    const handleChangeWard = (value) => {
        setWardId(value);
    };

    const handleChangeThumbnail = async (e) => {
        const file = e.target.files[0];
        const imageBase64 = await CommonUtils.getBase64(file);
        const urlPreviewImage = URL.createObjectURL(file);
        setPreviewImage(urlPreviewImage);
        setThumbnail(imageBase64);
    };

    const handleCreatePost = () => {
        const data = { title, description, address, content, provinceId, districtId, wardId, userId, thumbnail };
        dispatch(actions.createPostStart(data));
    };

    return (
        <div className={cx('wrapper')}>
            {/* Photos */}
            <div className={cx('photos')}>
                <div className={cx('photo')}>
                    {previewImage && (
                        <div className={cx('preview')}>
                            <img src={previewImage} alt="" />
                        </div>
                    )}

                    <label htmlFor="thumbnail">
                        <div className={cx('upload')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} className={cx('upload-icon')} />
                            <span className={cx('upload-text')}>Tải ảnh bìa</span>
                        </div>
                    </label>
                    <input
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        onChange={(e) => handleChangeThumbnail(e)}
                        hidden
                    />
                </div>
            </div>

            {/* Form */}
            <div className={cx('form')}>
                {/* Title */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')} htmlFor="title">
                            Tiêu đề
                        </label>
                        <Input name="title" id="title" value={title} onChange={(e) => setTittle(e.target.value)} />
                    </div>
                </div>

                {/* Description */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')} htmlFor="description">
                            Mô tả
                        </label>
                        <Input
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Provine, district, ward */}
                <div className={cx('group')} style={{ '--columns': 3 }}>
                    {/* Province */}
                    <div className={cx('item')}>
                        <label className={cx('label')}>Tỉnh/thành phố</label>
                        <Select name="provinceId" options={provincesOptions} onChange={handleChangeProvince} />
                    </div>
                    {/* District */}
                    <div className={cx('item')}>
                        <label className={cx('label')}>Quận/huyện</label>
                        <Select name="districtId" options={districtsOptions} onChange={handleChangeDistrict} />
                    </div>
                    {/* Ward */}
                    <div className={cx('item')}>
                        <label className={cx('label')}>Phường/xã</label>
                        <Select name="wardid" options={wardsOptions} onChange={handleChangeWard} />
                    </div>
                </div>

                {/* Address */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')} htmlFor="address">
                            Địa chỉ cụ thể
                        </label>
                        <Input
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                            rows="5"
                            name="content"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className={cx('buttons')}>
                    <Button>Hủy</Button>
                    <Button type="primary" onClick={handleCreatePost}>
                        Đăng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
