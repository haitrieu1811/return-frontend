import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { Fragment, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ChatContext } from '~/pages/Chat/Chat';
import * as chatServices from '~/services/chatServices';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import ChatInput from './ChatInput';
import styles from './ChatWindow.module.scss';

const cx = classNames.bind(styles);

const Chat = () => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const chatContext = useContext(ChatContext);
    const socket = chatContext.socket;
    const sender = chatContext.sender;
    const receiver = chatContext.receiver;
    const chatRoomInfo = chatContext.chatRoomInfo;
    const messageList = chatContext.messageList;
    const setMessageList = chatContext.setMessageList;
    const fetchMessages = chatContext.fetchMessages;

    const messagesEndRef = useRef();

    console.log('>>> Re-render');

    // SCROLL TO BOTTOM WHEN HAS NEW MESSAGE
    useEffect(() => {
        if (messagesEndRef && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    // SEEN MESSAGES
    useEffect(() => {
        (async () => {
            await chatServices.seenMessages(chatRoomInfo.id, userLoggedIn.id);
        })();
    }, [chatRoomInfo.id, userLoggedIn.id]);

    // RECEIVE MESSAGE BY SOCKET
    useEffect(() => {
        socket.on('RECEIVE_MESSAGE', (messageData) => {
            console.log('>>> RECEIVE_MESSAGE');
            fetchMessages();
        });

        return () => {
            socket.off('RECEIVE_MESSAGE');
        };
    }, [socket, fetchMessages]);

    return (
        <Fragment>
            {!_.isEmpty(receiver) && (
                <div className={cx('wrapper')}>
                    <div className={cx('head')}>
                        <div className={cx('receiver')}>
                            <Link to={`/profile/${receiver.id}`}>
                                <img
                                    src={CommonUtils.renderImage(receiver.avatar)}
                                    alt={receiver.firstName}
                                    className={cx('receiver-avatar')}
                                />
                            </Link>

                            <div className={cx('receiver-info')}>
                                <Link to={`/profile/${receiver.id}`}>
                                    <h3 className={cx('receiver-firstName')}>{receiver.firstName}</h3>
                                    <div className={cx('receiver-lastName')}>{receiver.lastName}</div>
                                </Link>
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <FontAwesomeIcon icon={faEllipsis} className={cx('options-icon')} />
                        </div>
                    </div>

                    <div className={cx('message-container')}>
                        {messageList.map((messageData, index) => {
                            const classname =
                                userLoggedIn.id === messageData.senderId ? 'message-sent' : 'message-received';

                            return (
                                <div key={index} className={cx(classname)}>
                                    <Link to={`/profile/${receiver.id}`}>
                                        <img
                                            src={CommonUtils.renderImage(receiver.avatar)}
                                            alt={receiver.firstName}
                                            className={cx('message-avatar', 'message-avatar-user')}
                                        />
                                    </Link>

                                    <div className={cx('message-content')}>{messageData.content}</div>

                                    <Link to={`/profile/${userLoggedIn.id}`}>
                                        <img
                                            src={CommonUtils.renderImage(sender.avatar)}
                                            alt={userLoggedIn.firstName}
                                            className={cx('message-avatar', 'message-avatar-me')}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <ChatInput />
                </div>
            )}
        </Fragment>
    );
};

export default Chat;
