import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './BackToTop.module.scss';

const cx = classNames.bind(styles);

const BackToTop = () => {
    const [isShow, setIsShow] = useState(true);

    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         console.log(123);
    //     });
    // }, []);

    const handleBackToTop = () => {};

    return (
        <>
            {isShow && (
                <div className={cx('wrapper')} onClick={handleBackToTop}>
                    <FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />
                </div>
            )}
        </>
    );
};

export default BackToTop;
