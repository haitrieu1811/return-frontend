import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

const Filter = ({ keyword }) => {
    const dispatch = useDispatch();

    const [provinceId, setProvinceId] = useState(undefined);
    const [districtId, setDistrictId] = useState(undefined);
    const [wardId, setWardId] = useState(undefined);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const reduxProvinces = useSelector(selectors.provinceSelector);
    const reduxDistricts = useSelector(selectors.districtSelector);
    const reduxWards = useSelector(selectors.wardSelector);

    // Dispatch actions
    useEffect(() => {
        dispatch(actions.readProvincesStart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.readDistrictsStart(provinceId));
    }, [dispatch, provinceId]);

    useEffect(() => {
        dispatch(actions.readWardsStart(provinceId, districtId));
    }, [dispatch, provinceId, districtId]);

    // Set value receive from redux
    useEffect(() => {
        setProvinces(reduxProvinces);
    }, [reduxProvinces]);

    useEffect(() => {
        setDistricts(reduxDistricts);
    }, [reduxDistricts]);

    useEffect(() => {
        setWards(reduxWards);
    }, [reduxWards]);

    // Handle function
    const handleChangeProvince = (e) => {
        const provinceId = e.target.value;
        setProvinceId(provinceId);
    };

    const handleChangeDistrict = (e) => {
        const districtId = e.target.value;
        setDistrictId(districtId);
    };

    const handleChangeWard = (e) => {
        const wardId = e.target.value;
        setWardId(wardId);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <div className={cx('item')}>
                    <div className={cx('head')}>
                        <h3>Vị trí</h3>
                    </div>
                    <div className={cx('body')}>
                        {provinces && provinces.length > 0 && (
                            <select
                                name="province"
                                className={cx('body-item')}
                                onChange={(e) => handleChangeProvince(e)}
                            >
                                <option value="" defaultValue>
                                    Tỉnh/thành phố
                                </option>
                                {provinces.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <select name="district" className={cx('body-item')} onChange={(e) => handleChangeDistrict(e)}>
                            {districts && districts.length > 0 ? (
                                districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.prefix} {district.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" defaultValue>
                                    Quận/huyện
                                </option>
                            )}
                        </select>

                        <select name="ward" className={cx('body-item')} onChange={(e) => handleChangeWard(e)}>
                            {wards && wards.length > 0 ? (
                                wards.map((ward) => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.prefix} {ward.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" defaultValue>
                                    Phường xã
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            </div>

            <div className={cx('foot')}>
                <Link to={`/search/${keyword}/${provinceId}/${districtId}/${wardId}`} className={cx('submit')}>
                    Tìm
                </Link>
            </div>
        </div>
    );
};

export default Filter;
