import React from 'react';
import { Input } from 'antd';

const CompInput = ({ onChange, ...props }) => <Input {...props} onChange={onChange} />;

export default CompInput;
