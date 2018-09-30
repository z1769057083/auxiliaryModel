import {fromJS} from 'immutable'
import _ from 'lodash'
import * as ActionType from '@/actions/auth'
let defaultState = fromJS({
})
const auth = (state=defaultState,action)=>{
    switch (action.type){
        case ActionType.HANDLE_LOGIN:
            let payload = action.payload;
            let userInfo = _.omit(payload,'roles');
            let permissions = payload.roles[0].permissions;
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            localStorage.setItem("permissions",JSON.stringify(permissions));
           return state.set("userInfo",userInfo)
                 .set("permissions",permissions).set("isLogin",true)
            break;
        case ActionType.REFRESH_STATE:
             userInfo = JSON.parse(localStorage.getItem("userInfo"));
             permissions = JSON.parse(localStorage.getItem("permissions"));
           var isLogin = userInfo? true : false;
            return state.set("userInfo",userInfo).
                set("permissions",permissions).set("isLogin",isLogin)
            break;
        case ActionType.LOGIN_OUT:
            localStorage.removeItem("userInfo");
            localStorage.removeItem("permissions");
            return state.set("userInfo",null).set("permissions",null).set("isLogin",false)
            break;
        default:
            return state;
    }
}

export default auth;