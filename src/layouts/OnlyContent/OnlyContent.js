import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './OnlyContent.module.scss';

const cx = classNames.bind(styles);

const OnlyContent = ({ children }) => {
    return <main className={cx('wrapper')}>{children}</main>;
};

OnlyContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default OnlyContent;
