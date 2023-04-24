import classNames from 'classnames/bind';
import { memo } from 'react';

import { PostProvider } from '~/Providers';
import styles from './Post.module.scss';
import PostBody from './PostBody';
import PostFoot from './PostFoot';
import PostHead from './PostHead';

const cx = classNames.bind(styles);

const Post = ({ postData }) => {
    return (
        <PostProvider postData={postData}>
            <div className={cx('wrapper')}>
                <PostHead />
                <PostBody />
                <PostFoot />
            </div>
        </PostProvider>
    );
};

export default memo(Post);
