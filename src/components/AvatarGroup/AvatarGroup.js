import { Avatar, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import CommonUtils from '~/utils/CommonUtils';

const AvatarGroup = ({ users }) => (
    <>
        {users && users.length > 0 && (
            <Avatar.Group maxCount={2} maxStyle={{ backgroundColor: '#1677ff', fontSize: '9px' }} size="small">
                {users.map((user) => {
                    const avatar = CommonUtils.renderImage(user.avatar);
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
    </>
);

export default AvatarGroup;
