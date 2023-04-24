import _ from 'lodash';
import { createContext, useState } from 'react';

import * as postServices from '~/services/postServices';

const PostContext = createContext();

const PostProvider = ({ postData, children }) => {
    const [post, setPost] = useState(postData);

    const fetchPostData = async () => {
        const post = await postServices.getPostById(postData.id);
        if (!_.isEmpty(post)) setPost(post);
        else setPost({});
    };

    const VALUES = {
        post,
        fetchPostData,
    };

    return <PostContext.Provider value={VALUES}>{children}</PostContext.Provider>;
};

export { PostContext, PostProvider };
