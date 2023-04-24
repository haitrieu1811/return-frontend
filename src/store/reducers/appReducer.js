import actionTypes from '../actions/actionTypes';

const initState = {
    theme: 'light',
    language: 'vi',
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        // CHANGE THEME
        case actionTypes.CHANGE_THEME_START:
            const newTheme = action.payload === true ? 'dark' : 'light';
            return {
                ...state,
                theme: newTheme,
            };

        // CHANGE LANGUAGE
        case actionTypes.CHANGE_LANGUAGUE_START:
            const newLanguague = action.payload === true ? 'en' : 'vi';
            return {
                ...state,
                language: newLanguague,
            };

        default:
            return state;
    }
};

export default appReducer;
