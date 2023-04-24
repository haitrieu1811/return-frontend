import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { emitter } from '~/emitter';

import NoData from '~/components/NoData';
import PostList from '~/components/PostList';
import Spinner from '~/components/Spinner';
import * as postServices from '~/services/postServices';
import * as selectors from '~/store/selectors';
import styles from './SavedPosts.module.scss';

const cx = classNames.bind(styles);

const SavedPosts = () => {
    const intl = useIntl();
    const noPostSavedTxt = intl.formatMessage({ id: 'post.noPostSaved' });

    const userLoggedIn = useSelector(selectors.userLoggedIn);

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // SET POSTS
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await postServices.getSavedList(userLoggedIn.id);
            if (res && res.errCode === 0) setPosts(res.data);
            setIsLoading(false);
        })();
    }, [userLoggedIn.id]);

    // EMITTER
    (() => {
        emitter.removeAllListeners('RE_FETCH_SAVED_POSTS');
        emitter.on('RE_FETCH_SAVED_POSTS', (postId) => {
            const newPosts = posts.filter((post) => post.id !== postId);
            setPosts(newPosts);
        });
    })();

    return (
        <div className={cx('wrapper')}>
            {isLoading && <Spinner />}
            {posts && posts.length > 0 && !isLoading && <PostList postList={posts} />}
            {posts && posts.length <= 0 && !isLoading && <NoData text={noPostSavedTxt} />}
        </div>
    );
};

export default SavedPosts;
