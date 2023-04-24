import classNames from 'classnames/bind';
import { Modal } from 'antd';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const CompModal = ({ title, children, open, onCancel, width = 520, onOk, cancelText, okText, footer }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            width={width}
            onOk={onOk}
            cancelText={cancelText}
            okText={okText}
            footer={footer}
            className={cx('modal')}
            colorBgElevated="#000000"
            centered
        >
            {children}
        </Modal>
    );
};

export default CompModal;
