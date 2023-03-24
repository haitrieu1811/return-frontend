import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { PATH } from '~/utils/constant';
import * as selectors from '~/store/selectors';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

const Dashboard = () => {
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) navigate(PATH.login);
    }, [navigate, isLoggedIn]);

    return <div className={cx('wrapper')}></div>;
};

export default Dashboard;
