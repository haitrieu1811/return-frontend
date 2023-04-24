import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ to, icon, onClick, children, ...passProps }) => {
    let Comp = 'button';

    const props = { ...passProps };

    if (to) {
        Comp = Link;
        props.to = to;
    }

    return (
        <Comp className={cx('wrapper')} onClick={onClick} {...props}>
            <Space>
                {icon} {children}
            </Space>
        </Comp>
    );
};

export default MenuItem;
