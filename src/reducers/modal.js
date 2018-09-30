import {fromJS} from 'immutable';
import * as ActionType from '@/actions/modal'
let defaultState = fromJS({
    corpusVisible:false,  //导入语料弹框
    loginVisible: false, //登录
    isLogin: localStorage.getItem("userInfo")?true:false,
    userInfo: {}
});
const modal = (state=defaultState,action)=>{
    switch (action.type){
        case ActionType.SHOW_CORPUS_MODAL:
            return state.set("corpusVisible",true);
            break;
        case ActionType.HIDE_CORPUS_MODAL:
            return state.set("corpusVisible",false);
            break;
        case ActionType.SHOW_LOGIN_MODAL:
            return state.set("loginVisible",true);
            break;
        case ActionType.HIDE_LOGIN_MODAL:
            return state.set("loginVisible",false);
            break;
            default:
            return state;
    }
}
export default modal;