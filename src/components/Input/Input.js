import React from 'react';
import { Input } from 'antd';

const CompInput = ({ onChange, ...props }) => {
    return <Input {...props} onChange={onChange} />;
};

export default CompInput;
