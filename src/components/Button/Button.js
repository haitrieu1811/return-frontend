import { Button, Space } from 'antd';

const CompButton = ({ type, icon, children, onClick, danger, size, style }) => (
    <Space wrap>
        <Button type={type} icon={icon} onClick={onClick} danger={danger} size={size} style={style}>
            {children}
        </Button>
    </Space>
);

export default CompButton;
