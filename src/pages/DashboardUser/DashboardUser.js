import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './DashboardUser.module.scss';
import * as userServices from '~/services/userServices';
import CommonUtils from '~/utils/CommonUtils';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const DashboardUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await userServices.getAllUsers();
            if (res && res.errCode === 0) setUsers(res.data);
        })();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {users && users.length > 0 && (
                <table className={cx('table')} cellSpacing="0">
                    <thead>
                        <tr>
                            <td>Họ tên</td>
                            <td>Email</td>
                            <td>Cập nhật gần nhất</td>
                            <td>Thao tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                                <td>{user.email}</td>
                                <td>{`${CommonUtils.timeSince(new Date(user.updatedAt))} trước`}</td>
                                <td>
                                    <Button>Xem</Button>
                                    <div className={cx('button-separate')}></div>
                                    <Button type="primary" danger>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DashboardUser;
