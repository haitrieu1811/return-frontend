import { DownOutlined, UpOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CommentUI from '../CommentUI';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

const CommentItem = ({ commentData, replyList }) => {
    const children = useRef();

    const [showReplies, setShowReplies] = useState(false);

    useEffect(() => {
        if (children && children.current) children.current.scrollIntoView();
    }, [showReplies]);

    // HANDLE SHOW REPLIES
    const handleToggleReplies = () => {
        setShowReplies((prevState) => !prevState);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('parent')}>
                <CommentUI commentData={commentData} />
            </div>

            {showReplies && (
                <div className={cx('children')}>
                    <div ref={children}></div>
                    {replyList.map((reply) => (
                        <CommentUI key={reply.id} commentData={reply} isReply />
                    ))}
                </div>
            )}

            {replyList && replyList.length > 0 && (
                <div className={cx('see-replies')} onClick={handleToggleReplies}>
                    {!showReplies ? <FormattedMessage id="post.see" /> : <FormattedMessage id="post.hide" />}{' '}
                    {replyList.length} <FormattedMessage id="post.replies" />
                    {!showReplies ? (
                        <DownOutlined className={cx('see-replies-icon')} />
                    ) : (
                        <UpOutlined className={cx('see-replies-icon')} />
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
