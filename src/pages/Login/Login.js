import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Background from '~/assets/images/bg.jpg';
import Logo from '~/components/Logo';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import { PATH } from '~/utils/constant';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [navigate, isLoggedIn]);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(actions.userLoginStart(email, password));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')} style={{ backgroundImage: `url(${Background})` }}>
                <form className={cx('form')} method="POST" onSubmit={(e) => handleSubmitLogin(e)}>
                    <Logo />

                    <div className={cx('form-group')}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleChangeEmail(e)}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => handleChangePassword(e)}
                        />
                    </div>

                    <button type="submit" className={cx('submit')}>
                        Đăng nhập
                    </button>

                    <div className={cx('forget-pass')}>
                        <Link to={PATH.home}>Quên mật khẩu?</Link>
                    </div>

                    <div className={cx('register')}>
                        Bạn chưa có tài khoản? <Link to={PATH.register}>Đăng kí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
