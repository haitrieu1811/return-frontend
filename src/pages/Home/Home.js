import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GridStyles from '~/components/GridStyles';
import PostList from '~/components/PostList';
import Spinner from '~/components/Spinner';
import * as postServices from '~/services/postServices';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // GET LIST POSTS
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await postServices.getListPosts(null, 1);
            if (res && res.errCode === 0) setPosts(res.data);
            setIsLoading(false);
        })();
    }, []);

    // FETCH MORE POST
    const fetchMorePost = async () => {
        const nextPage = page + 1;
        const morePost = await postServices.getListPosts(null, nextPage);
        if (morePost && morePost.errCode === 0) {
            setPosts((prevState) => [...prevState, ...morePost.data]);
            setPage(nextPage);
        } else {
            setHasMore(false);
        }
    };

    return (
        <GridStyles>
            {!isLoading ? (
                <InfiniteScroll dataLength={posts.length} next={fetchMorePost} hasMore={hasMore} loader={<Spinner />}>
                    <PostList postList={posts} />
                </InfiniteScroll>
            ) : (
                <Spinner />
            )}
        </GridStyles>
    );
};

export default Home;
