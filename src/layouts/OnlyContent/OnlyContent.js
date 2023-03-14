import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './OnlyContent.module.scss';

const cx = classNames.bind(styles);

const OnlyContent = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

OnlyContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default OnlyContent;
