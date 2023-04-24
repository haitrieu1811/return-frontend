import classNames from 'classnames/bind';
import React, { Suspense, memo } from 'react';

import GridStyles from '../GridStyles';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

const Post = React.lazy(() => import('~/components/Post'));

const PostList = ({ postList }) => {
    return (
        <GridStyles>
            <div className={cx('wrapper')}>
                {postList.map((post, index) => (
                    <Suspense key={index}>
                        <Post postData={post} />
                    </Suspense>
                ))}
            </div>
        </GridStyles>
    );
};

export default memo(PostList);
