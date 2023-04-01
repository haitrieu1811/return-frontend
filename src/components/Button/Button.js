import { Button, Space } from 'antd';

const CompButton = ({ type, icon, children, onClick, danger, size }) => (
    <Space wrap>
        <Button type={type} icon={icon} onClick={onClick} danger={danger} size={size}>
            {children}
        </Button>
    </Space>
);

export default CompButton;
