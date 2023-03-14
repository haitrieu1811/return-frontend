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
