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

const DashboardPost = () => {
    const dispatch = useDispatch();

    const postsRedux = useSelector(selectors.listPosts);
    const isLoadingRedux = useSelector(selectors.isLoadingListPosts);

    const [posts, setPosts] = useState(postsRedux);
    const [isLoading, setIsLoading] = useState(isLoadingRedux);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        dispatch(actions.readPostStart());
    }, [dispatch]);

    useEffect(() => {
        setPosts(postsRedux);
    }, [postsRedux]);

    useEffect(() => {
        setIsLoading(isLoadingRedux);
    }, [isLoadingRedux]);

    useEffect(() => {
        const DATA_SOURCE = posts.map((post) => ({
            key: post.id,
            name: post.title,
            status: 'resolve',
            createdAt: `${CommonUtils.timeSince(new Date(post.createdAt))} trước`,
            updatedAt: `${CommonUtils.timeSince(new Date(post.updatedAt))} trước`,
        }));

        setDataSource(DATA_SOURCE);
    }, [posts]);

    const COLUMNS = [
        {
            title: 'Tiêu đề',
            dataIndex: 'name',
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
            title: 'Xuất bản',
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
                        title="Bạn có chắc muốn xóa bài viết này"
                        description="Bài viết sẽ không được khôi phục khi xóa"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => dispatch(actions.deletePostStart(record.key))}
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

export default DashboardPost;
