import { Modal } from 'antd';

const CompModal = ({ title, children, open, onCancel, width = 520, onOk, cancelText, okText }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            width={width}
            onOk={onOk}
            cancelText={cancelText}
            okText={okText}
            centered
        >
            {children}
        </Modal>
    );
};

export default CompModal;
