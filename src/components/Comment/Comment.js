import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '~/components/Input';
import { emitter } from '~/emitter';
import * as postServices from '~/services/postServices';
import * as userServices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import CommentItem from '../CommentItem';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

const Comment = ({ userId, postId }) => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');

    // Get comments
    useEffect(() => {
        (async () => {
            const res = await postServices.getCommentsByPostId(postId);
            if (res && res.errCode === 0) setComments(res.data);
        })();
    }, [postId]);

    // Get user
    useEffect(() => {
        (async () => {
            const userId = userLoggedIn.id;
            const res = await userServices.getUserById(userId);
            if (res && res.errCode === 0) setUser(res.data);
        })();
    }, [userLoggedIn.id]);

    // Set avatar
    useEffect(() => {
        if (user.avatar) {
            const avatar = CommonUtils.renderImage(user.avatar);
            setAvatar(avatar);
        }
    }, [user.avatar]);

    // Change content input
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    // Handle create comment
    const handleCreateComment = async (e) => {
        e.preventDefault();
        await postServices.handleCreateComment(userId, postId, content);
        setContent('');
        const res = await postServices.getCommentsByPostId(postId);
        if (res && res.errCode === 0) setComments(res.data);
        emitter.emit('HANDLE_INCREASE_COMMENT_COUNT');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} commentData={comment} />
                ))}
            </div>
            <form method="POST" className={cx('add')} onSubmit={(e) => handleCreateComment(e)}>
                <Link className={cx('avatar-link')}>
                    <img src={avatar} alt="" className={cx('avatar')} />
                </Link>
                <Input
                    type="text"
                    placeholder="Nhập bình luận"
                    value={content}
                    className={cx('input')}
                    onChange={(e) => handleChangeContent(e)}
                />
            </form>
        </div>
    );
};

export default Comment;
