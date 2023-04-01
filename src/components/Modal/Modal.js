import { Modal } from 'antd';

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
            centered
        >
            {children}
        </Modal>
    );
};

export default CompModal;
