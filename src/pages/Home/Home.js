import React, { Suspense, useEffect, useState } from 'react';

import GridStyles from '~/components/GridStyles';
import * as postServices from '~/services/postServices';

const Post = React.lazy(() => import('~/components/Post'));

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await postServices.getAllPosts();
            if (res && res.errCode === 0) {
                setPosts(res.data);
            }
        })();
    }, []);

    return (
        <GridStyles>
            {posts && posts.length > 0 && (
                <div className="grid">
                    <div className="row">
                        {posts.map((post) => (
                            <div key={post.id} className="col l-3 m-4 c-12">
                                <Suspense fallback={<p>Loading</p>}>
                                    <Post data={post} />
                                </Suspense>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </GridStyles>
    );
};

export default Home;
