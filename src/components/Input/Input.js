import React from 'react';
import { Input } from 'antd';

const CompInput = ({ onChange, size, style, ...props }) => {
    return <Input {...props} onChange={onChange} size={size} style={style} />;
};

export default CompInput;
