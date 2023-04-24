import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import Logo from '~/components/Logo';
import * as actions from '~/store/actions';
import { PATH } from '~/utils/constant';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
    const intl = useIntl();
    const firstNameTxt = intl.formatMessage({ id: 'auth.firstName' });
    const lastNameTxt = intl.formatMessage({ id: 'auth.lastName' });
    const usernameTxt = intl.formatMessage({ id: 'auth.username' });
    const passwordTxt = intl.formatMessage({ id: 'auth.password' });
    const passwordConfirmTxt = intl.formatMessage({ id: 'auth.passwordConfirm' });

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        const data = { firstName, lastName, username, password, passwordConfirm, tick: false, roleId: 2 };
        dispatch(actions.userRegisterStart(data));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <form className={cx('form')} onSubmit={handleSubmitRegister}>
                    <Logo />

                    {/* FirstName */}
                    <div className={cx('form-group')}>
                        <input
                            type="firstName"
                            id="firstName"
                            placeholder={firstNameTxt}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* LastName */}
                    <div className={cx('form-group')}>
                        <input
                            type="lastName"
                            id="lastName"
                            placeholder={lastNameTxt}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* Username */}
                    <div className={cx('form-group')}>
                        <input
                            type="username"
                            id="username"
                            placeholder={usernameTxt}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className={cx('form-group')}>
                        <input
                            type="password"
                            id="password"
                            placeholder={passwordTxt}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Password confirm */}
                    <div className={cx('form-group')}>
                        <input
                            type="password"
                            id="passwordConfirm"
                            placeholder={passwordConfirmTxt}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={cx('submit')}>
                        <FormattedMessage id="auth.register" />
                    </button>

                    <div className={cx('login')}>
                        <FormattedMessage id="auth.haveAccount" />{' '}
                        <Link to={PATH.login}>
                            <FormattedMessage id="auth.login" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
