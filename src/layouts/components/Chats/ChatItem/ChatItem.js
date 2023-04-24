import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { io } from 'socket.io-client';

import styles from './ChatItem.module.scss';
import * as selectors from '~/store/selectors';
import * as userServices from '~/services/userServices';
import * as chatServices from '~/services/chatServices';
import CommonUtils from '~/utils/CommonUtils';

const socket = io.connect('http://localhost:8080');

const cx = classNames.bind(styles);

const ChatItem = ({ userId, chatRoom }) => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [user, setUser] = useState({});
    const [unreadCount, setUnreadCount] = useState('');

    // SET USER
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [userId]);

    // SET UNREAD MESSAGE COUNT
    useEffect(() => {
        (async () => {
            const res = await chatServices.getUnreadMessages(chatRoom.id, userLoggedIn.id);
            if (res && res.errCode === 0) setUnreadCount(res.data);
        })();
    }, [chatRoom.id, userLoggedIn.id]);

    // RECEIVE MESSAGE BY SOCKET
    useEffect(() => {
        socket.on('RECEIVE_MESSAGE', () => {
            console.log('>>> RECEIVE_MESSAGE from CHATITEM');
            setUnreadCount((unreadCount) => unreadCount + 1);
        });
    }, []);

    return (
        <Fragment>
            {!_.isEmpty(user) && (
                <Link to={`/chat/${userLoggedIn.id}/${userId}`} className={cx('wrapper')}>
                    <img src={CommonUtils.renderImage(user.avatar)} alt={user.firstName} className={cx('avatar')} />
                    <span className={cx('name')}>{`${user.firstName} ${user.lastName}`}</span>
                    {unreadCount > 0 && <span className={cx('message-qty')}>{unreadCount}</span>}
                </Link>
            )}
        </Fragment>
    );
};

export default ChatItem;
