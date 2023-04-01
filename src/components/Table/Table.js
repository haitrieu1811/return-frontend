import React from 'react';
import { Space, Table, Tag } from 'antd';
import Button from '~/components/Button';

// const columns = [
//     {
//         title: 'Tên',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Địa chỉ',
//         dataIndex: 'address',
//         key: 'address',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'loser') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: (record) => (
//             <Space size="small">
//                 {/* <a>Invite {record.name}</a> */}
//                 <Button size="small">View</Button>
//                 <Button type="primary" size="small" danger>
//                     Delete
//                 </Button>
//             </Space>
//         ),
//     },
// ];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer', 'Pending'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];

const CompTable = ({ columns, dataSource, loading, size }) => {
    return <Table columns={columns} dataSource={dataSource} loading={loading} size={size} />;
};

export default CompTable;
