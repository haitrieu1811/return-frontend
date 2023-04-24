import classNames from 'classnames/bind';
import { Fragment, memo, useContext, useState } from 'react';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

import { PostContext } from '~/Providers';
import Photos from '~/components/Photos';
import styles from './PostBody.module.scss';

const cx = classNames.bind(styles);

const PostBody = () => {
    const postContext = useContext(PostContext);

    const post = postContext.post;
    const content = !_.isEmpty(post) ? post.content : '';

    const [isShowMore, setIsShowMore] = useState(content.length > 100 ? true : false);
    const [isShowLess, setIsShowLess] = useState(false);
    const [shortContent, setShortContent] = useState(`${content.substring(0, 100)}...`);

    // SEE MORE
    const handleSeeMore = () => {
        setIsShowLess(true);
        setIsShowMore(false);
        setShortContent(content);
    };

    // SEE LESS
    const handleSeeLess = () => {
        setIsShowLess(false);
        setIsShowMore(true);
        setShortContent(`${content.substring(0, 100)}...`);
    };

    return (
        <Fragment>
            {!_.isEmpty(post) && (
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        {content.length > 100 ? shortContent : content}

                        {isShowMore && (
                            <span className={cx('see-more')} onClick={handleSeeMore}>
                                <FormattedMessage id="post.seeMore" />
                            </span>
                        )}

                        {isShowLess && (
                            <span className={cx('see-more')} onClick={handleSeeLess}>
                                <FormattedMessage id="post.seeLess" />
                            </span>
                        )}
                    </div>

                    {post.photos && post.photos.length > 0 && (
                        <div className={cx('photos')}>
                            <Photos data={post.photos} />
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default memo(PostBody);
