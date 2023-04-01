import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

const CompCarousel = ({ data }) => {
    const item = useRef();

    const [position, setPosition] = useState(0);
    const [isShowPrev, setIsShowPrev] = useState(false);
    const [isShowNext, setIsShowNext] = useState(true);

    // const data = [
    //     'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png',
    //     'https://files.fullstack.edu.vn/f8-prod/courses/2.png',
    //     'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png',
    //     'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
    //     'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
    // ];

    const handlePrev = () => {
        const newPosition = position + item.current.offsetWidth;
        console.log(newPosition);
        if (newPosition === 0) setIsShowPrev(false);
        if (newPosition > -item.current.offsetWidth * (data.length - 1)) setIsShowNext(true);
        setPosition(newPosition);
    };

    const handleNext = () => {
        const newPosition = position - item.current.offsetWidth;
        console.log(newPosition);
        if (newPosition < 0) setIsShowPrev(true);
        if (newPosition === -item.current.offsetWidth * (data.length - 1)) setIsShowNext(false);
        setPosition(newPosition);
    };

    return (
        <>
            {data && data.length > 0 && (
                <div className={cx('wrapper')}>
                    {isShowPrev && (
                        <div className={cx('prev')} onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                    )}
                    <div className={cx('stage')}>
                        <div className={cx('stage-list')} ref={item} style={{ transform: `translateX(${position}px)` }}>
                            {data.map((item, index) => (
                                <div key={index} className={cx('stage-item')}>
                                    <img src={item} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {isShowNext && (
                        <div className={cx('next')} onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CompCarousel;
