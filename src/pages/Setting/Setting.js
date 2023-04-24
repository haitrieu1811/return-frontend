import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Switch from '~/components/Switch';
import styles from './Setting.module.scss';
import * as selectors from '~/store/selectors';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

const Setting = () => {
    const dispatch = useDispatch();

    const themeStore = useSelector(selectors.theme);
    const languageStore = useSelector(selectors.language);

    const [darkMode, setDarkMode] = useState(themeStore === 'dark' ? true : false);
    const [language, setLanguage] = useState(languageStore === 'en' ? true : false);

    // HANDLE CHANGE THEME
    const handleChangeTheme = (checkedValue) => {
        setDarkMode(checkedValue);
        dispatch(actions.changeThemeStart(checkedValue));
    };

    // HANDLE CHANGE LANGUAGE
    const handleChangeLanguage = (checkedValue) => {
        setLanguage(checkedValue);
        dispatch(actions.changeLanguageStart(checkedValue));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <div className={cx('item')}>
                    <h2 className={cx('head')}>
                        <FormattedMessage id="setting.general" />
                    </h2>
                    <div className={cx('body')}>
                        <div className={cx('row')}>
                            <span className={cx('label')}>
                                <FormattedMessage id="setting.darkMode" />
                            </span>
                            <Switch onChange={handleChangeTheme} checked={darkMode} />
                        </div>
                        <div className={cx('row')}>
                            <span className={cx('label')}>
                                <FormattedMessage id="setting.english" />
                            </span>
                            <Switch onChange={handleChangeLanguage} checked={language} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
