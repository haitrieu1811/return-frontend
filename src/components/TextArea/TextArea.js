import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const CompTextArea = ({ ...props }) => {
    return <TextArea style={{ fontFamily: 'var(---font-family)', fontSize: '1.5rem', lineHeight: 1.8 }} {...props} />;
};

export default CompTextArea;
