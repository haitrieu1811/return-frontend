import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';

import * as chatServices from '~/services/chatServices';
import * as selectors from '~/store/selectors';
import ChatItem from './ChatItem/ChatItem';
import styles from './Chats.module.scss';

const cx = classNames.bind(styles);

const Chats = () => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [chatRooms, setChatRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [seeMore, setSeeMore] = useState(false);

    // SET CHAT ROOMS
    useEffect(() => {
        (async () => {
            const res = await chatServices.getListChatRoom(userLoggedIn.id, 1);
            if (res && res.errCode === 0) {
                const chatRoomData = res.data;
                setChatRooms(chatRoomData);
                if (chatRoomData.length >= 3) setSeeMore(true);
            }
        })();
    }, [userLoggedIn.id]);

    // FETCH MORE CHAT ROOM
    const fetchMoreChatRoom = async () => {
        const nextPage = page + 1;
        const res = await chatServices.getListChatRoom(userLoggedIn.id, nextPage);
        if (res && res.errCode === 0) {
            setChatRooms((chatRooms) => [...chatRooms, ...res.data]);
            setPage(nextPage);
        } else {
            setSeeMore(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {chatRooms && chatRooms.length > 0 && (
                <Fragment>
                    <h3 className={cx('heading')}>Trò chuyện</h3>
                    <div className={cx('list')}>
                        {chatRooms.map((chatRoom, index) => {
                            const userId =
                                chatRoom.firstUser === userLoggedIn.id ? chatRoom.secondUser : chatRoom.firstUser;
                            return <ChatItem key={index} userId={userId} chatRoom={chatRoom} />;
                        })}
                    </div>
                    {seeMore && (
                        <div className={cx('see-more')}>
                            <div className={cx('see-more-btn')} onClick={fetchMoreChatRoom}>
                                <DownOutlined className={cx('see-more-icon')} /> Xem thêm
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default memo(Chats);
