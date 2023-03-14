import actionTypes from './actionTypes';
import * as locationServices from '~/services/locationService';

// Province
export const readProvincesStart = () => {
    return async (dispatch, setState) => {
        try {
            dispatch({ type: actionTypes.READ_PROVINCES_START });

            const res = await locationServices.getAllProvinces();

            if (res && res.errCode === 0) {
                const provinces = res.data;
                dispatch(readProvincesSuccess(provinces));
            } else {
                dispatch(readProvincesFail());
            }
        } catch (e) {
            dispatch(readProvincesFail());
            console.log(e);
        }
    };
};

export const readProvincesSuccess = (payload) => ({
    type: actionTypes.READ_PROVINCES_SUCCESS,
    payload: payload,
});

export const readProvincesFail = () => ({
    type: actionTypes.READ_PROVINCES_FAIL,
});

// District
export const readDistrictsStart = (provinceId) => {
    return async (dispatch, setState) => {
        try {
            if (provinceId) {
                const res = await locationServices.getListDistricts(provinceId);
                if (res && res.data.errCode === 0) {
                    const districts = res.data.data;
                    dispatch(readDistrictsSuccess(districts));
                } else {
                    dispatch(readDistrictsFail());
                }
            } else {
                dispatch(readDistrictsFail());
            }
        } catch (e) {
            dispatch(readDistrictsFail());
            console.log(e);
        }
    };
};

export const readDistrictsSuccess = (payload) => ({
    type: actionTypes.READ_DISTRICTS_SUCCESS,
    payload: payload,
});

export const readDistrictsFail = () => ({
    type: actionTypes.READ_DISTRICTS_FAIL,
});

// Ward
export const readWardsStart = (provinceId, districtId) => {
    return async (dispatch, setState) => {
        try {
            if (provinceId && districtId) {
                const res = await locationServices.getListWards(provinceId, districtId);

                if (res && res.data.errCode === 0) {
                    const wards = res.data.data;
                    dispatch(readWardsSuccess(wards));
                } else {
                    dispatch(readWardsFail());
                }
            } else {
                dispatch(readWardsFail());
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const readWardsSuccess = (payload) => ({
    type: actionTypes.READ_WARDS_SUCCESS,
    payload: payload,
});

export const readWardsFail = () => ({
    type: actionTypes.READ_WARDS_FAIL,
});
