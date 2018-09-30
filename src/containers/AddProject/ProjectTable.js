import React,{Component} from 'react'
import {Table} from 'antd'
import {bindActionCreators} from 'redux'
import * as projectAction from '@/actions/project'
import {connect} from 'react-redux'
class ProjectTable extends Component{
    state = {

    }
    handlePageChange(pageNo){
        this.props.actions.changePagination({pageNo,pageSize:this.props.pageSize});
        let param = Object.assign({},this.props.param,{pageNo,pageSize:this.props.pageSize});
        this.props.actions.getUserList(param);
    }
    handleSizeChange(pageSize){
        this.props.actions.changePagination({pageNo:this.props.pageNo,pageSize});
        let param = Object.assign({},this.props.param,{pageNo:this.props.pageNo,pageSize});
        this.props.actions.getUserList(param);
    }
    render(){
        const rowSelection = {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange:this.props.actions.selectChange,
        }
        const {pageNo,pageSize,total,tableData} = this.props;
        const pagination={
            align:'center',
            total:total,
            showTotal:()=>`共${total}条`,
            showSizeChanger:true,
            onShowSizeChange:(current, pageSize)=>this.handleSizeChange(pageSize),
            onChange:page => this.handlePageChange(page),
            page:pageNo,
            current:pageNo,
            pageSize:pageSize
        }
        const columns = [{
            title: '编号',
            dataIndex: 'num',
            width: '100px',
            align:'center'
        }, {
            title: '用户名',
            dataIndex: 'name',
            align:'center'
        }, {
            title: '真实姓名',
            dataIndex: 'realName',
            align:'center'
        }, {
            title: '创建人',
            dataIndex: 'creator',
            align:'center'
        },{
            title: '创建时间',
            dataIndex: 'ctime',
            align:'center'
        }]
        return(
            <Table rowSelection={rowSelection} loading={this.props.loading} className="mt10" columns={columns} dataSource={tableData} pagination={pagination}/>
        )
    }
}
function mapStateToProps(state){
    return{
        loading:state.project.get("loading"),
        pageNo: state.project.get("pageNo"),
        pageSize:state.project.get("pageSize"),
        total:state.project.get("total"),
        tableData:state.project.get("tableData"),
        param:state.project.get("param"),
        selectedRowKeys:state.project.get("selectedRowKeys")
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators({
            changePagination:projectAction.changePagination,
            getUserList: projectAction.getUserList,
            selectChange: projectAction.selectChange
        },dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProjectTable);