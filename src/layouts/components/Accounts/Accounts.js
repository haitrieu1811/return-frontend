import classNames from 'classnames/bind';
import { CheckCircleFilled } from '@ant-design/icons';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

import styles from './Accounts.module.scss';
import { Link } from 'react-router-dom';
import * as userSevices from '~/services/userServices';
import * as selectors from '~/store/selectors';
import CommonUtils from '~/utils/CommonUtils';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const Accounts = () => {
    const userLoggedIn = useSelector(selectors.userLoggedIn);
    const userLoggedInId = !_.isEmpty(userLoggedIn) ? userLoggedIn.id : 0;

    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [seeMore, setSeeMore] = useState(false);

    // SET USERS
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await userSevices.getUsers(userLoggedInId, 1);
            if (res && res.errCode === 0) {
                setAccounts(res.data);
                if (res.data.length >= 2) {
                    setSeeMore(true);
                }
            }
            setIsLoading(false);
        })();
    }, [userLoggedInId]);

    // FETCH MORE ACCOUNT
    const fetchMoreAccount = async () => {
        const nextPage = page + 1;
        const moreAccounts = await userSevices.getUsers(userLoggedIn.id, nextPage);
        if (moreAccounts && moreAccounts.errCode === 0) {
            setAccounts((prevState) => [...prevState, ...moreAccounts.data]);
            setPage(nextPage);
        } else {
            setSeeMore(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading && <Spinner />}

            {accounts && accounts.length > 0 && (
                <Fragment>
                    <h3 className={cx('heading')}>
                        <FormattedMessage id="accounts.suggest" />
                    </h3>

                    <div className={cx('list')}>
                        {accounts.map((account) => (
                            <Link key={account.id} to={`/profile/${account.id}`} className={cx('item')}>
                                <img
                                    src={account.avatar ? CommonUtils.renderImage(account.avatar) : DefaultAvatar}
                                    alt={account.username}
                                    className={cx('avatar')}
                                />
                                <div>
                                    <span className={cx('nickname')}>{account.username}</span>{' '}
                                    {account.tick === 1 && <CheckCircleFilled className={cx('tick')} />}
                                    <div className={cx('name')}>{`${account.firstName} ${account.lastName}`}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className={cx('action')}>
                        <span className={cx('see-more')} onClick={fetchMoreAccount}>
                            {seeMore && <FormattedMessage id="accounts.seeMore" />}
                        </span>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Accounts;
