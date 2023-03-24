import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import styles from './Register.module.scss';
import { PATH } from '~/utils/constant';
import Background from '~/assets/images/bg.jpg';
import Logo from '~/components/Logo';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

const Register = () => {
    const dispatch = useDispatch();

    const isRegisterSuccess = useSelector((state) => state.user.isRegisterSuccess);
    const registerMessage = useSelector((state) => state.user.registerMessage);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [registerSuccess, setRegisterSuccess] = useState('');

    useEffect(() => {
        if (isRegisterSuccess) {
            setRegisterSuccess(isRegisterSuccess);
        }
    }, [isRegisterSuccess]);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleClearForm = () => {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        dispatch(actions.userRegisterStart(email, password, passwordConfirm));

        if (registerSuccess) handleClearForm();
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('main')} style={{ backgroundImage: `url(${Background})` }}>
                    <form className={cx('form')} method="POST" onSubmit={handleSubmitRegister}>
                        <Logo />

                        <div className={cx('form-group')}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
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
                                name="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => handleChangePassword(e)}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="passwordConfirm">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder="Xác nhận mật khẩu"
                                value={passwordConfirm}
                                onChange={(e) => handleChangePasswordConfirm(e)}
                            />
                        </div>

                        <button type="submit" className={cx('submit')}>
                            Đăng kí
                        </button>

                        <div className={cx('login')}>
                            Bạn đã có tài khoản? <Link to={PATH.login}>Đăng nhập</Link>
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

export default Register;
