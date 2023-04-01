import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as selectors from '~/store/selectors';
import { PATH } from '~/utils/constant';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

const Dashboard = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectors.isLoggedIn);
    if (!isLoggedIn) navigate(PATH.login);

    return <div className={cx('wrapper')}></div>;
};

export default Dashboard;
