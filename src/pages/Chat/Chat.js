import classNames from 'classnames/bind';
import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import ChatWindow from '~/components/ChatWindow';
import * as chatServices from '~/services/chatServices';
import * as userServices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import styles from './Chat.module.scss';
import Spinner from '~/components/Spinner';

export const ChatContext = createContext();

const cx = classNames.bind(styles);

const socket = io.connect('http://localhost:8080');

const Chat = () => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const { firstUserId, secondUserId } = useParams();

    const [chatRoomInfo, setChatRoomInfo] = useState({});
    const [sender, setSender] = useState({});
    const [receiver, setReceiver] = useState({});
    const [page, setPage] = useState(1);
    const [messageList, setMessageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMessages = async () => {
        console.log('>>> fetchMessages');
        const chatRoomId = chatRoomInfo.id;
        const res = await chatServices.getMessageList(chatRoomId, null);
        if (res && res.errCode === 0) setMessageList(res.data);
        else setMessageList([]);
    };

    // CREATE NEW CHAT ROOM IF CHAT ROOM NOT EXIST
    useEffect(() => {
        (async () => {
            await chatServices.createChatRoom(firstUserId, secondUserId);
        })();
    }, [firstUserId, secondUserId]);

    // SET RECEIVER
    useEffect(() => {
        (async () => {
            const receiverId = userLoggedIn.id === Number(firstUserId) ? secondUserId : firstUserId;
            const res = await userServices.getUser(receiverId);
            if (res && res.errCode === 0) setReceiver(res.data);
        })();
    }, [userLoggedIn.id, firstUserId, secondUserId]);

    // SET SENDER
    useEffect(() => {
        (async () => {
            const res = await userServices.getUser(userLoggedIn.id);
            if (res && res.errCode === 0) setSender(res.data);
        })();
    }, [userLoggedIn.id]);

    // SET CHAT ROOM INFO AND JOIN ROOM
    useEffect(() => {
        (async () => {
            const res = await chatServices.getChatRoom(firstUserId, secondUserId);
            if (res && res.errCode === 0) {
                const roomChatData = res.data;
                setChatRoomInfo(roomChatData);
                socket.emit('JOIN_ROOM_CHAT', roomChatData.id);
            }
        })();
    }, [firstUserId, secondUserId]);

    // SET MESSAGE LIST
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const chatRoomId = chatRoomInfo.id;
            if (chatRoomId) {
                const res = await chatServices.getMessageList(chatRoomId, null);
                if (res && res.errCode === 0) setMessageList(res.data);
                else setMessageList([]);
            }
            setIsLoading(false);
        })();
    }, [chatRoomInfo.id]);

    // FETCH MORE MESSAGES
    const fetchMoreMessages = async () => {
        console.log('>>> fetchMoreMessages');

        const nextPage = page + 1;
        const chatRoomId = chatRoomInfo.id;
        const res = await chatServices.getMessageList(chatRoomId, nextPage);

        console.log(res);

        if (res && res.errCode === 0) {
            setMessageList((messageList) => [...res.data, ...messageList]);
            setPage(nextPage);
        }
    };

    // VALUE OF
    const VALUES_PROVICE = {
        socket,
        receiver,
        sender,
        chatRoomInfo,
        messageList,
        setMessageList,
        fetchMoreMessages,
        fetchMessages,
    };

    return (
        <ChatContext.Provider value={VALUES_PROVICE} className={cx('wrapper')}>
            {!isLoading ? <ChatWindow /> : <Spinner />}
        </ChatContext.Provider>
    );
};

export default Chat;
