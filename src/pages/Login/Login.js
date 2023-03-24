import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Background from '~/assets/images/bg.jpg';
import Logo from '~/components/Logo';
import * as actions from '~/store/actions';
import { PATH } from '~/utils/constant';
import styles from './Login.module.scss';
import * as selectors from '~/store/selectors';

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);

    console.log(isLoggedIn);

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
        <>
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

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Login;
