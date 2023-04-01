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

    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [provinceId, setProvinceId] = useState(undefined);
    const [districtId, setDistrictId] = useState(undefined);
    const [wardId, setWardId] = useState(undefined);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provincesOptions, setProvincesOptions] = useState([]);
    const [districtsOptions, setDistrictsOptions] = useState([]);
    const [wardsOptions, setWardsOptions] = useState([]);

    // Get all provinces
    useEffect(() => {
        (async () => {
            const res = await locationServices.getAllProvinces();
            if (res && res.errCode === 0) setProvinces(res.data);
        })();
    }, []);

    // Set province options
    useEffect(() => {
        setProvincesOptions(
            provinces.map((province) => ({
                value: province.id,
                label: province.name,
            })),
        );
    }, [provinces]);

    // Get all districts
    useEffect(() => {
        (async () => {
            const res = await locationServices.getListDistricts(provinceId);
            if (res && res.errCode === 0) setDistricts(res.data);
        })();
    }, [provinceId]);

    // Set district options
    useEffect(() => {
        setDistrictsOptions(
            districts.map((district) => ({
                value: district.id,
                label: `${district.prefix} ${district.name}`,
            })),
        );
    }, [districts]);

    // Get all wards
    useEffect(() => {
        (async () => {
            const res = await locationServices.getListWards(provinceId, districtId);
            if (res && res.errCode === 0) setWards(res.data);
        })();
    }, [provinceId, districtId]);

    // Set ward options
    useEffect(() => {
        setWardsOptions(
            wards.map((ward) => ({
                value: ward.id,
                label: `${ward.prefix} ${ward.name}`,
            })),
        );
    }, [wards]);

    // Handle change province
    const handleChangeProvince = (value) => {
        setProvinceId(value);
    };

    // Handle change district
    const handleChangeDistrict = (value) => {
        setDistrictId(value);
    };

    // Handle change ward
    const handleChangeWard = (value) => {
        setWardId(value);
    };

    // Handle change photos
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

    // Handle create post
    const handleCreatePost = () => {
        const data = {
            address,
            content,
            provinceId,
            districtId,
            wardId,
            userId,
            status: 'pending',
            photos,
        };

        dispatch(actions.createPostStart(data));
    };

    return (
        <div className={cx('wrapper')}>
            {/* Photos */}
            <div className={cx('photos')}>
                <div className={cx('photo')}>
                    {previewImages &&
                        previewImages.length > 0 &&
                        previewImages.map((image, index) => (
                            <div key={index} className={cx('preview')}>
                                <img src={image} alt="" />
                            </div>
                        ))}

                    <label htmlFor="thumbnail">
                        <div className={cx('upload')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} className={cx('upload-icon')} />
                            <span className={cx('upload-text')}>Tải hình ảnh</span>
                        </div>
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
            </div>

            {/* Form */}
            <div className={cx('form')}>
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
