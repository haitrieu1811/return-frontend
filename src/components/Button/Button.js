import { Button, Space } from 'antd';

const CompButton = ({ type, icon, children, onClick, danger }) => (
    <Space wrap>
        <Button type={type} icon={icon} onClick={onClick} danger={danger}>
            {children}
        </Button>
    </Space>
);

export default CompButton;
