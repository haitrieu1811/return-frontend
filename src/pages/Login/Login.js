import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '~/components/Logo';
import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import { PATH } from '~/utils/constant';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
    const intl = useIntl();
    const usernameTxt = intl.formatMessage({ id: 'auth.username' });
    const passwordTxt = intl.formatMessage({ id: 'auth.password' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectors.isLoggedIn);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [navigate, isLoggedIn]);

    const handleChangeEmail = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(actions.userLoginStart(username, password));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <form className={cx('form')} method="POST" onSubmit={(e) => handleSubmitLogin(e)}>
                    <Logo />

                    {/* Username */}
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            id="username"
                            placeholder={usernameTxt}
                            value={username}
                            onChange={(e) => handleChangeEmail(e)}
                        />
                    </div>

                    {/* Password */}
                    <div className={cx('form-group')}>
                        <input
                            type="password"
                            id="password"
                            placeholder={passwordTxt}
                            value={password}
                            onChange={(e) => handleChangePassword(e)}
                        />
                    </div>

                    <button type="submit" className={cx('submit')}>
                        <FormattedMessage id="auth.login" />
                    </button>

                    <div className={cx('register')}>
                        <FormattedMessage id="auth.noAccount" />{' '}
                        <Link to={PATH.register}>
                            <FormattedMessage id="auth.register" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
