import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ to, onClick, children, ...passProps }) => {
    let Comp = 'button';

    const props = { ...passProps };

    if (to) {
        Comp = Link;
        props.to = to;
    }

    return (
        <Comp className={cx('wrapper')} onClick={onClick} {...props}>
            {children}
        </Comp>
    );
};

export default MenuItem;
