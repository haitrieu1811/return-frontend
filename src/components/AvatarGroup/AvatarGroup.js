import { Avatar, Tooltip } from 'antd';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import CommonUtils from '~/utils/CommonUtils';

const AvatarGroup = ({ users }) => (
    <Fragment>
        {users && users.length > 0 && (
            <Avatar.Group
                maxCount={2}
                maxStyle={{ backgroundColor: 'var(--primary-color)', fontSize: '9px' }}
                size="small"
            >
                {users.map((user) => {
                    const avatar = user.avatar ? CommonUtils.renderImage(user.avatar) : DefaultAvatar;

                    return (
                        <Tooltip key={user.id} title={`${user.firstName} ${user.lastName}`} placement="top">
                            <Link to={`/profile/${user.id}`}>
                                <Avatar src={avatar} />
                            </Link>
                        </Tooltip>
                    );
                })}
            </Avatar.Group>
        )}
    </Fragment>
);

export default AvatarGroup;
