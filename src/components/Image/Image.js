import React from 'react';
import { Image } from 'antd';

const CompImage = ({ data }) => {
    return (
        <Image.PreviewGroup
            preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            {data.map((item, index) => (
                <Image key={index} width="25%" height={80} src={item} />
            ))}
        </Image.PreviewGroup>
    );
};

export default CompImage;
