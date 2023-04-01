import React from 'react';
import { Tooltip } from 'antd';

const CompTooltip = ({ children, title, placement }) => {
    return (
        <Tooltip title={title} placement={placement}>
            {children}
        </Tooltip>
    );
};

export default CompTooltip;
