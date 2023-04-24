import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

import { PATH } from '~/utils/constant';

const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to={PATH.home}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
};
export default NotFound;
