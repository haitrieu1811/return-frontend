import classNames from 'classnames/bind';
import { memo, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { emitter } from '~/emitter';
import { useIntl, FormattedDate, FormattedMessage } from 'react-intl';

import { PostContext } from '~/Providers';
import CheckboxGroup from '~/components/CheckboxGroup';
import Select from '~/components/Select';
import TextArea from '~/components/TextArea';
import * as actions from '~/store/actions';
import ImageGroup from '../ImageGroup';
import styles from './UpdateForm.module.scss';

const cx = classNames.bind(styles);

const UpdateForm = () => {
    const intl = useIntl();
    const globalTxt = intl.formatMessage({ id: 'form.global' });
    const privateTxt = intl.formatMessage({ id: 'form.private' });
    const commentTxt = intl.formatMessage({ id: 'form.comment' });
    const savePostTxt = intl.formatMessage({ id: 'form.savePost' });

    const dispatch = useDispatch();

    const postContext = useContext(PostContext);

    const post = postContext.post;
    const content = post.content;
    const fetchPostData = postContext.fetchPostData;

    const defaultMode =
        post.mode === 'global' ? { value: 'global', label: globalTxt } : { value: 'private', label: privateTxt };

    const [photos, setPhotos] = useState([]);
    const [formContent, setFormContent] = useState(content);
    const [mode, setMode] = useState(defaultMode.value);
    const [allows, setAllows] = useState([]);

    const allowComment = post.allowComment ? 'comment' : '';
    const allowSave = post.allowSave ? 'save' : '';

    // EMITTER LISTENER
    (() => {
        emitter.removeAllListeners('HANDLE_UPDATE_POST');
        emitter.on('HANDLE_UPDATE_POST', async () => {
            const data = { content: formContent, photos, mode, allows };
            console.log('>>> Data update: ', data);
            await dispatch(actions.updatePostStart(data, post.id));
            fetchPostData();
            emitter.emit('HANDLE_RESET_PREVIEW_IMAGES');
        });
    })();

    // HANDLE CHANGE MODE
    const handleChangeMode = (mode) => {
        setMode(mode);
    };

    // HANDLE CHANGE ALLOW
    const handleChangeAllow = (checkedValues) => {
        setAllows(checkedValues);
    };

    return (
        <div className={cx('wrapper')}>
            {/* Image group */}
            <ImageGroup postId={post.id} setPhotos={setPhotos} />

            <div className={cx('form')}>
                {/* Mode */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.mode" />
                        </label>
                        <Select
                            defaultValue={defaultMode}
                            options={[
                                { value: 'global', label: globalTxt },
                                { value: 'private', label: privateTxt },
                            ]}
                            onChange={handleChangeMode}
                        />
                    </div>
                </div>

                {/* Allows */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')}>
                            <FormattedMessage id="form.allowUsers" />
                        </label>

                        <CheckboxGroup
                            defaultValue={[allowComment, allowSave]}
                            options={[
                                { value: 'comment', label: commentTxt },
                                { value: 'save', label: savePostTxt },
                            ]}
                            onChange={handleChangeAllow}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className={cx('group')} style={{ '--columns': 1 }}>
                    <div className={cx('item')}>
                        <label className={cx('label')} htmlFor="content">
                            <FormattedMessage id="form.content" />
                        </label>

                        <TextArea
                            rows="5"
                            name="content"
                            id="content"
                            value={formContent}
                            className={cx('textarea')}
                            onChange={(e) => setFormContent(e.target.value)}
                        ></TextArea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(UpdateForm);
