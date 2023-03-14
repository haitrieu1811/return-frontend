import { createStore, compose, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';

import rootReducer from './store/reducers/rootReducer';

const middleware = [ThunkMiddleware];

const reduxStore = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export const dispatch = reduxStore.dispatch;

export default reduxStore;
