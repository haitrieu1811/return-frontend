import { createStore, compose, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './store/reducers/rootReducer';

const middleware = [ThunkMiddleware];

const reduxStore = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;
