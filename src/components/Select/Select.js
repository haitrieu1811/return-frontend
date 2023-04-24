import React from 'react';
import { Select, Space } from 'antd';

const CompSelect = ({ options, onChange, className, defaultValue, size, ...props }) => {
    return (
        <Space wrap>
            <Select
                defaultValue={defaultValue}
                style={{ width: '100%' }}
                onChange={onChange}
                options={options}
                className={className}
                size={size}
                {...props}
            />
        </Space>
    );
};

export default CompSelect;
