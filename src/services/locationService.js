import * as httpRequest from '~/utils/httpRequest';

export const getAllProvinces = async () => {
    try {
        const res = await httpRequest.get('province/get-all');
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getListDistricts = async (provinceId) => {
    try {
        const res = await httpRequest.get('district/get-list', {
            params: {
                provinceId,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getListWards = async (provinceId, districtId) => {
    try {
        const res = await httpRequest.get('ward/get-list', {
            params: {
                provinceId,
                districtId,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getProvinceById = async (provinceId) => {
    try {
        const res = await httpRequest.get('province/get-by-id', {
            params: {
                provinceId,
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getDistrictById = async (districtId) => {
    try {
        const res = await httpRequest.get('district/get-by-id', {
            params: {
                districtId,
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getWardById = async (wardId) => {
    try {
        const res = await httpRequest.get('ward/get-by-id', {
            params: {
                wardId,
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};
