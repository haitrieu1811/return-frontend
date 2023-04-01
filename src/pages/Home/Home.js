import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridStyles from '~/components/GridStyles';
import { emitter } from '~/emitter';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import Skeleton from '~/components/Skeleton';

const Post = React.lazy(() => import('~/components/Post'));

const Home = () => {
    const dispatch = useDispatch();

    const reduxPosts = useSelector(selectors.listPosts);

    const [posts, setPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(8);

    // Get list posts
    useEffect(() => {
        dispatch(actions.readPostStart(postLimit));
    }, [dispatch, postLimit]);

    useEffect(() => {
        setPosts(reduxPosts);
    }, [reduxPosts]);

    // Lazy loading
    // const observer = useRef();
    // const lastBookElementRef = useCallback((node) => {
    //     if (observer.current) observer.current.disconnect();

    //     observer.current = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             // setPostLimit((prevState) => prevState + 10);
    //         }
    //     });

    //     if (node) observer.current.observe(node);
    // }, []);

    (() => {
        emitter.on('RENDER_POSTS_LIST', () => {
            console.log(123);
        });
    })();

    return (
        <GridStyles>
            {posts &&
                posts.length > 0 &&
                posts.map((post) => (
                    <Suspense key={post.id} fallback={<Skeleton />}>
                        <Post postData={post} />
                    </Suspense>
                ))}
        </GridStyles>
    );
};

export default Home;
