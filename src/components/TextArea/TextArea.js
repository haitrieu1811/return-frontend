import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const CompTextArea = ({ ...props }) => {
    return <TextArea {...props} />;
};

export default CompTextArea;
