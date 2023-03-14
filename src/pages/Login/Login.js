import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import { PATH } from '~/utils/constant';
import Background from '~/assets/images/bg.jpg';
import Logo from '~/components/Logo';

const cx = classNames.bind(styles);

const Login = () => {
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
                    <button type="button" className={cx('submit')}>
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
