import {api} from '@/api'
import {Message} from 'antd'
export const GET_USER_LIST = Symbol('GET_USER_LIST');
export function getUserList(payload){
    return (dispatch)=>{
        dispatch(toggleLoading(true));
        api.projectQueryMember(payload).then(res=>{
            if(res.success){
                dispatch(refreshUserList({param:payload,data:res.data}));
            }else{
                Message.eror(res.err);
            }
            dispatch(toggleLoading(false))
        })
    }
}

export const GET_USER_LIST_SUCCESS = Symbol('GET_USER_LIST_SUCCESS');
export function refreshUserList(payload){
    return{
        type: GET_USER_LIST_SUCCESS,
        payload
    }
}
export const CHANGE_PAGINATION= Symbol('CHANGE_PAGINATION');
export function changePagination(payload){
    return{
        type:CHANGE_PAGINATION,
        payload
    }
}
export const TOGGLE_LOADING = Symbol('TOGGLE_LOADING');
export function toggleLoading(payload){
    return {
        type:TOGGLE_LOADING,
        payload
    }
}
export const SELECTION_CHANGE = Symbol('SELECTION_CHANGE')
export function selectChange(payload){
    return {
        type: SELECTION_CHANGE,
        payload
    }
}