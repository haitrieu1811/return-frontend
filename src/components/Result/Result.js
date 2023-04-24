import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { PATH } from '~/utils/constant';

const App = () => (
    <Result
        title="Bạn chưa đăng nhập"
        extra={
            <Link to={PATH.login}>
                <Button type="primary" key="console">
                    Đăng nhập
                </Button>
            </Link>
        }
    />
);
export default App;
