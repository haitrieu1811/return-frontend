import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '~/components/Table';
import { Tag } from 'antd';

import Button from '~/components/Button';
import Popconfirm from '~/components/Popconfirm';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';

const DashboardUser = () => {
    const dispatch = useDispatch();

    const usersRedux = useSelector(selectors.listUsers);
    const isLoadingRedux = useSelector(selectors.isLoadingReadUsers);

    const [users, setUsers] = useState(usersRedux);
    const [isLoading, setIsLoading] = useState(isLoadingRedux);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        dispatch(actions.readUsersStart());
    }, [dispatch]);

    useEffect(() => {
        setUsers(usersRedux);
    }, [usersRedux]);

    useEffect(() => {
        setIsLoading(isLoadingRedux);
    }, [isLoadingRedux]);

    useEffect(() => {
        const DATA_SOURCE = users.map((user) => ({
            key: user.id,
            name: user.firstName,
            email: user.email,
            status: 'resolve',
            createdAt: `${CommonUtils.timeSince(new Date(user.createdAt))} trước`,
            updatedAt: `${CommonUtils.timeSince(new Date(user.updatedAt))} trước`,
        }));

        setDataSource(DATA_SOURCE);
    }, [users]);

    const COLUMNS = [
        {
            title: 'Tiêu đề',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => {
                let color;
                let text;

                if (status === 'pending') {
                    color = 'gold';
                    text = 'Chờ duyệt';
                } else if (status === 'resolve') {
                    color = 'geekblue';
                    text = 'Đã duyệt';
                } else if (status === 'reject') {
                    color = 'red';
                    text = 'Không duyệt';
                } else {
                    color = false;
                }

                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
        },
        {
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
        },
        {
            title: 'Thao tác',
            render: (record) => (
                <Space size="small">
                    <Button size="small">Xem</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa thành viên này"
                        description="Thành viên sẽ không được khôi phục khi xóa"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => dispatch(actions.deleteUserStart(record.key))}
                    >
                        <Button size="small" type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={COLUMNS} dataSource={dataSource} loading={isLoading} size="middle" />
        </>
    );
};

export default DashboardUser;
