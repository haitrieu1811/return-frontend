import { UploadOutlined } from '@ant-design/icons';
import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { emitter } from '~/emitter';
import * as userServices from '~/services/userServices';
import * as actions from '~/store/actions';
import CommonUtils from '~/utils/CommonUtils';
import styles from './UpdateForm.module.scss';

const cx = classNames.bind(styles);

const UpdateForm = ({ userId }) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        (async () => {
            const res = await userServices.getUserById(userId);

            if (res && res.errCode === 0) {
                const userData = res.data;

                setUser(userData);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setGender(userData.gender);
                setAvatar(userData.avatar);
            }
        })();
    }, [userId]);

    useEffect(() => {
        const imageBase64 = user.avatar ? new Buffer(user.avatar, 'base64').toString('binary') : DefaultAvatar;
        setPreviewImage(imageBase64);
    }, [user]);

    (() => {
        emitter.removeAllListeners();
        emitter.on('HANDLE_UPDATE_USER', () => {
            const data = {
                firstName,
                lastName,
                phoneNumber,
                address,
                gender,
                avatar,
                userId: user.id,
                email: user.email,
            };

            dispatch(actions.userUpdateStart(data, userId));
        });
    })();

    const handleChangeInput = (e, field) => {
        const value = e.target.value;

        switch (field) {
            case 'FIRSTNAME':
                setFirstName(value);
                break;

            case 'LASTNAME':
                setLastName(value);
                break;

            case 'PHONE_NUMBER':
                setPhoneNumber(value);
                break;

            case 'ADDRESS':
                setAddress(value);
                break;

            default:
                break;
        }
    };

    const handleChangeGender = (value) => {
        setGender(value);
    };

    const handleChangeAvatar = async (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        const base64 = await CommonUtils.getBase64(file);

        setPreviewImage(imageUrl);
        setAvatar(base64);
    };

    return (
        <form method="POST">
            {console.log('>>> re-render')}
            <div className={cx('wrapper')}>
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Email</label>
                        <Input placeholder="Email" value={user.email} disabled />
                    </div>
                </div>

                <div className={cx('group')} style={{ '--columns': 2 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Tên</label>
                        <Input
                            placeholder="Tên"
                            value={firstName}
                            onChange={(e) => handleChangeInput(e, 'FIRSTNAME')}
                        />
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Họ</label>
                        <Input placeholder="Họ" value={lastName} onChange={(e) => handleChangeInput(e, 'LASTNAME')} />
                    </div>
                </div>

                <div className={cx('group')} style={{ '--columns': 2 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Số điện thoại</label>
                        <Input
                            placeholder="Số điện thoại"
                            value={phoneNumber}
                            onChange={(e) => handleChangeInput(e, 'PHONE_NUMBER')}
                        />
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Giới tính</label>
                        <Select
                            defaultValue={gender}
                            onChange={handleChangeGender}
                            options={[
                                {
                                    value: 'M',
                                    label: 'Nam',
                                },
                                {
                                    value: 'F',
                                    label: 'Nữ',
                                },
                                {
                                    value: 'O',
                                    label: 'Khác',
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className={cx('group')} style={{ '--columns': 2 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>Địa chỉ</label>
                        <Input
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => handleChangeInput(e, 'ADDRESS')}
                        />
                    </div>

                    <div className={cx('item')}>
                        <label className={cx('label')}>Ảnh đại diện</label>

                        <label htmlFor="avatar">
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </label>

                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            style={{ opacity: '0' }}
                            onChange={(e) => handleChangeAvatar(e)}
                        />

                        {previewImage && (
                            <div className={cx('preview')}>
                                <img src={previewImage} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UpdateForm;
