import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

import locationReducer from './locationReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whiteList: ['isLoggedIn', 'userLoggedIn'],
};

export default combineReducers({
    location: locationReducer,
    user: persistReducer(userPersistConfig, userReducer),
    post: postReducer,
});
