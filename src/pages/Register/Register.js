import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { PATH } from '~/utils/constant';
import Background from '~/assets/images/bg.jpg';
import Logo from '~/components/Logo';

const cx = classNames.bind(styles);

const Register = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')} style={{ backgroundImage: `url(${Background})` }}>
                <form className={cx('form')}>
                    <Logo />
                    <div className={cx('form-group')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email" />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Mật khẩu" />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="passwordConfirm">Xác nhận mật khẩu</label>
                        <input type="password" id="passwordConfirm" placeholder="Xác nhận mật khẩu" />
                    </div>
                    <button type="button" className={cx('submit')}>
                        Đăng kí
                    </button>
                    <div className={cx('login')}>
                        Bạn đã có tài khoản? <Link to={PATH.login}>Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
