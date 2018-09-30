import { take,put,call,fork,select,all} from 'redux-saga/effects'
import {message} from 'antd'
import * as actions from '@/actions/auth'
import * as modalAction from '@/actions/modal'
import {api} from '@/api'
function* startLogin(param) {
    const response = yield call(() => api.login(param))
    if(response.status === 200){
        yield put({type:actions.HANDLE_LOGIN,payload:response.data})
        message.success('登录成功');
        yield put({type:modalAction.HIDE_LOGIN_MODAL});
    }else{
        message.error(response.err);
    }
}
function* watchLogin(){
    while (true){
       let request = yield take(actions.BEGIN_LOGIN,startLogin)
        yield call(startLogin,request.param)
    }
}
function* beginLoginout(){
   const response = yield call(()=>api.logout())
    if(response.status === 200){
        yield put({type:actions.LOGIN_OUT});
    }
}
function* watchLoginOut(){
    while (true){
        yield take(actions.BEGIN_LOGIN_OUT);
        yield call(beginLoginout)
    }
}
export default function* root(){
    yield fork(watchLogin)
    yield fork(watchLoginOut)
}