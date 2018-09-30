import {toJS,fromJS} from 'immutable'
import * as ActionType from '@/actions/project'
let defaultState = fromJS({
    pageNo:1,
    pageSize:10,
    selectedRowKeys:[]
});
const project = (state=defaultState,action)=>{
    switch (action.type){
        case ActionType.GET_USER_LIST_SUCCESS:
            let data = action.payload.data;
            let tableData = data.data.map((item,index)=>{
                item.key = index;
                item.num = (action.payload.param.pageNo - 1) * action.payload.param.pageSize+ index + 1;
                return item;
            })
           return state.set("total",data.total).set("tableData",tableData).set("param",action.payload.param);
           break;
        case ActionType.CHANGE_PAGINATION:
            let {pageNo,pageSize} = action.payload;
            return state.set("pageNo",pageNo).set("pageSize",pageSize);
            break;
        case ActionType.TOGGLE_LOADING:
            return state.set("loading",action.payload);
            break;
        case ActionType.SELECTION_CHANGE:
            console.log(action.payload.toJS())
            return state.set("selectedRowKeys",action.payload);
    }
    return state;
}
export default project;