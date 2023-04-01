import { Popconfirm } from 'antd';

const CompPopconfirm = ({ children, title, description, onConfirm, onCancel, okText = 'Yes', cancelText = 'No' }) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        zIndex={999999}
    >
        {children}
    </Popconfirm>
);

export default CompPopconfirm;
