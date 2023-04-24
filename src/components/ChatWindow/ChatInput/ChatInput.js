import { SendOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChatContext } from '~/pages/Chat/Chat';
import * as chatServices from '~/services/chatServices';
import * as selectors from '~/store/selectors';
import styles from './ChatInput.module.scss';

const cx = classNames.bind(styles);

const ChatInput = () => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const chatContext = useContext(ChatContext);
    const socket = chatContext.socket;
    const receiver = chatContext.receiver;
    const chatRoomInfo = chatContext.chatRoomInfo;
    const setMessageList = chatContext.setMessageList;
    const fetchMessages = chatContext.fetchMessages;

    const [message, setMessage] = useState('');

    // HANDLE SEND MESSAGE
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (message) {
            const messageData = {
                content: message,
                senderId: userLoggedIn.id,
                receiverId: receiver.id,
                chatRoomId: chatRoomInfo.id,
                status: 'sent',
            };

            setMessage('');

            await socket.emit('SEND_MESSAGE', messageData);
            await chatServices.createMessage(messageData);
            await fetchMessages();
        }
    };

    return (
        <form className={cx('foot')} onSubmit={(e) => handleSendMessage(e)}>
            <div className={cx('foot-container')}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn"
                    className={cx('input')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button type="submit" className={cx('send-btn')}>
                <SendOutlined className={cx('send-icon')} />
            </button>
        </form>
    );
};

export default ChatInput;
