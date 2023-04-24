import actionTypes from './actionTypes';

// CHANGE THEME
export const changeThemeStart = (payload) => ({
    type: actionTypes.CHANGE_THEME_START,
    payload: payload,
});

// CHANGE LANGUAGE
export const changeLanguageStart = (payload) => ({
    type: actionTypes.CHANGE_LANGUAGUE_START,
    payload: payload,
});
