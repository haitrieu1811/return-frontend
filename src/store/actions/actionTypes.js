const actionTypes = Object.freeze({
    // APP
    CHANGE_THEME_START: 'CHANGE_THEME_START',
    CHANGE_THEME_SUCCESS: 'CHANGE_THEME_SUCCESS',
    CHANGE_THEME_FAIL: 'CHANGE_THEME_FAIL',

    CHANGE_LANGUAGUE_START: 'CHANGE_LANGUAGUE_START',
    CHANGE_LANGUAGUE_SUCCESS: 'CHANGE_LANGUAGUE_SUCCESS',
    CHANGE_LANGUAGUE_FAIL: 'CHANGE_LANGUAGUE_FAIL',

    // USER
    USER_REGISTER_START: 'USER_REGISTER_START',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAIL: 'USER_REGISTER_FAIL',

    USER_LOGIN_START: 'USER_LOGIN_START',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    USER_LOGOUT_START: 'USER_LOGOUT_START',
    USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
    USER_LOGOUT_FAIL: 'USER_LOGOUT_FAIL',

    USER_UPDATE_START: 'USER_UPDATE_START',
    USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
    USER_UPDATE_FAIL: 'USER_UPDATE_FAIL',

    UPDATE_LIKED_POSTS_START: 'UPDATE_LIKED_POSTS_START',
    UPDATE_LIKED_POSTS_SUCCESS: 'UPDATE_LIKED_POSTS_SUCCESS',
    UPDATE_LIKED_POSTS_FAIL: 'UPDATE_LIKED_POSTS_FAIL',

    UPDATE_SAVED_POSTS_START: 'UPDATE_SAVED_POSTS_START',
    UPDATE_SAVED_POSTS_SUCCESS: 'UPDATE_SAVED_POSTS_SUCCESS',
    UPDATE_SAVED_POSTS_FAIL: 'UPDATE_SAVED_POSTS_FAIL',

    // POST
    CREATE_POST_START: 'CREATE_POST_START',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'CREATE_POST_FAIL',

    READ_LIST_POST_START: 'READ_LIST_POST_START',
    READ_LIST_POST_SUCCESS: 'READ_LIST_POST_SUCCESS',
    READ_LIST_POST_FAIL: 'READ_LIST_POST_FAIL',

    DELETE_POST_START: 'DELETE_POST_START',
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
    DELETE_POST_FAIL: 'DELETE_POST_FAIL',

    UPDATE_POST_START: 'UPDATE_POST_START',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAIL: 'UPDATE_POST_FAIL',
});

export default actionTypes;
