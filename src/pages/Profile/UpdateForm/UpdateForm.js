import { UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Input from '~/components/Input';
import { emitter } from '~/emitter';
import * as userServices from '~/services/userServices';
import * as actions from '~/store/actions';
import CommonUtils from '~/utils/CommonUtils';
import styles from './UpdateForm.module.scss';

const cx = classNames.bind(styles);

const UpdateForm = ({ user, setUser }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const [avatar, setAvatar] = useState(user.avatar);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const imageBase64 = user.avatar ? CommonUtils.renderImage(user.avatar) : DefaultAvatar;
        setPreviewImage(imageBase64);
    }, [user]);

    // HANDLE UPDATE USER
    (() => {
        emitter.removeAllListeners('HANDLE_UPDATE_USER');
        emitter.on('HANDLE_UPDATE_USER', async () => {
            const data = {
                firstName,
                lastName,
                avatar,
                userId: user.id,
                email: user.email,
            };

            await dispatch(actions.userUpdateStart(data, user.id));

            const res = await userServices.getUser(user.id);
            if (res && res.errCode === 0) setUser(res.data);
            else setUser([]);
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

            default:
                break;
        }
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
            <div className={cx('wrapper')}>
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.username" />
                        </label>
                        <Input value={user.username} disabled />
                    </div>
                </div>

                <div className={cx('group')} style={{ '--columns': 2 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.firstName" />
                        </label>
                        <Input
                            placeholder="Tên"
                            value={firstName}
                            onChange={(e) => handleChangeInput(e, 'FIRSTNAME')}
                        />
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.lastName" />
                        </label>
                        <Input placeholder="Họ" value={lastName} onChange={(e) => handleChangeInput(e, 'LASTNAME')} />
                    </div>
                </div>

                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.avatar" />
                        </label>

                        <label htmlFor="avatar">
                            <span className={cx('upload-btn')}>
                                <UploadOutlined /> <FormattedMessage id="form.upload" />
                            </span>
                        </label>

                        <input type="file" name="avatar" id="avatar" onChange={(e) => handleChangeAvatar(e)} hidden />

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
