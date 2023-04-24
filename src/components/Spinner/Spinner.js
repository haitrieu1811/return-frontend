import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 30,
        }}
        spin
    />
);

const CompSpinner = () => {
    return (
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Spin indicator={antIcon} />
        </div>
    );
};

export default CompSpinner;
