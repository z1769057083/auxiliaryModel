export const BEGIN_LOGIN = Symbol('BEGIN_LOGIN')
export function beginLogin(param){
    return {
        type: BEGIN_LOGIN,
        param
    }
}
//登录
export const HANDLE_LOGIN = Symbol('HANDLE_LOGIN')
export function handleLogin(payload){
    return {
        type: HANDLE_LOGIN,
        payload
    }
}
//页面刷新还原state
export const REFRESH_STATE = Symbol('REFRESH_STATE')
export function refreshState(){
    return{
        type:REFRESH_STATE
    }
}
//saga异步退出
export const BEGIN_LOGIN_OUT = Symbol('BEGIN_LOGIN_OUT')
export function beginLoginOut() {
    console.log('beginloginout')
    return {
        type: BEGIN_LOGIN_OUT
    }
}
//退出
export const LOGIN_OUT = Symbol('LOGIN_OUT')
export function loginOut() {
    return {
        type: LOGIN_OUT
    }
}