import React from 'react';
import { Select, Space } from 'antd';

// const handleChange = (value) => {
//     console.log(`selected ${value}`);
// };

const CompSelect = ({ options, onChange, className, defaultValue, ...props }) => {
    return (
        // [
        //     { value: 'jack', label: 'Jack' },
        //     { value: 'lucy', label: 'Lucy' },
        //     { value: 'Yiminghe', label: 'yiminghe' },
        //     { value: 'disabled', label: 'Disabled', disabled: true },
        // ]

        <Space wrap>
            <Select
                defaultValue={defaultValue}
                style={{ width: '100%' }}
                onChange={onChange}
                options={options}
                className={className}
                {...props}
            />
        </Space>
    );
};

export default CompSelect;
