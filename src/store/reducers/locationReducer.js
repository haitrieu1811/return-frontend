import actionTypes from '../actions/actionTypes';

const initState = {
    isLoadingProvinces: false,
    isLoadingDistricts: false,
    isLoadingWards: false,

    provinces: [],
    districts: [],
    wards: [],
};

const locationReducer = (state = initState, action) => {
    switch (action.type) {
        // Province
        case actionTypes.READ_PROVINCES_START:
            console.log('>>> READ_PROVINCES_START');
            return {
                ...state,
                isLoadingProvinces: true,
            };

        case actionTypes.READ_PROVINCES_SUCCESS:
            console.log('>>> READ_PROVINCES_SUCCESS');
            return {
                ...state,
                isLoadingProvinces: false,
                provinces: action.payload,
            };

        case actionTypes.READ_PROVINCES_FAIL:
            console.log('>>> READ_PROVINCES_FAIL');
            return {
                ...state,
                isLoadingProvinces: false,
                provinces: [],
            };

        // District
        case actionTypes.READ_DISTRICTS_START:
            console.log('>>> READ_DISTRICTS_START');
            return {
                ...state,
                isLoadingDistricts: true,
            };

        case actionTypes.READ_DISTRICTS_SUCCESS:
            console.log('>>> READ_DISTRICTS_SUCCESS');
            return {
                ...state,
                isLoadingDistricts: false,
                districts: action.payload,
            };

        case actionTypes.READ_DISTRICTS_FAIL:
            console.log('>>> READ_DISTRICTS_FAIL');
            return {
                ...state,
                isLoadingDistricts: false,
                districts: [],
            };

        // Ward
        case actionTypes.READ_WARDS_START:
            console.log('>>> READ_WARDS_START');
            return {
                ...state,
                isLoadingWards: true,
            };

        case actionTypes.READ_WARDS_SUCCESS:
            console.log('>>> READ_WARDS_SUCCESS');
            return {
                ...state,
                isLoadingWards: false,
                wards: action.payload,
            };

        case actionTypes.READ_WARDS_FAIL:
            console.log('>>> READ_WARDS_FAIL');
            return {
                ...state,
                isLoadingWards: false,
                wards: [],
            };

        default:
            return state;
    }
};

export default locationReducer;
