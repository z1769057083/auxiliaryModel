import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import modal from './modal'
import auth from './auth'
import project from './project'
const RootReducer = combineReducers({
    routing: routerReducer, //用于redux和react-router的链接
    modal,
    auth,
    project
});
export default RootReducer;