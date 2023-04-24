import React from 'react';
import { Image } from 'antd';
import { useMediaQuery } from 'react-responsive';

import CommonUtils from '~/utils/CommonUtils';

const CompPhotos = ({ data }) => {
    const isMobile = useMediaQuery({ maxWidth: 480 });

    return (
        <Image.PreviewGroup
            preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            {data.map((item) => {
                const width = !isMobile ? '25%' : '25%';
                const height = !isMobile ? 80 : 40;
                return <Image key={item.id} width={width} height={height} src={CommonUtils.renderImage(item.source)} />;
            })}
        </Image.PreviewGroup>
    );
};

export default CompPhotos;
