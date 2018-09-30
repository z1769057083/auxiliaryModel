import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import mySaga from '@/sagas'
import RootReducer from '@/reducers'
import thunkMiddleware from 'redux-thunk'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(RootReducer,applyMiddleware(sagaMiddleware,thunkMiddleware));
sagaMiddleware.run(mySaga)
export default store;