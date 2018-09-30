import React,{Component} from 'react'
import {Form,Input,Select,Button} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as projectAction from '@/actions/project'
const Option = Select.Option;
const FormItem = Form.Item;
class SearchForm extends Component{
    handleSearch(){
        this.props.actions.changePagination({pageNo:1,pageSize:this.props.pageSize});
        let searchParam = this.props.form.getFieldsValue();
        this.props.actions.getUserList({...searchParam,pageNo:1,pageSize:this.props.pageSize});
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
                <Form layout="inline">
                    <FormItem
                        label="真实姓名"
                    >
                        {getFieldDecorator('realName',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="用户名"
                    >
                        {getFieldDecorator('name',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="创建人"
                    >
                        {getFieldDecorator('creator',{initialValue:''})(
                            <Select style={{"width":'200px'}} >
                                <Option value="2" key="2">进行中</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="mr10" onClick={this.handleSearch.bind(this)}>筛选</Button>
                        <Button>清空</Button>
                    </FormItem>
                </Form>
        )
    }
}
function mapStateToProps(state){
    return{
        pageSize:state.project.get("pageSize"),
        total:state.project.get("total"),
        tableData:state.project.get("tableData"),
        param:state.project.get("param")
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators({
            changePagination:projectAction.changePagination,
            getUserList: projectAction.getUserList
        },dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(SearchForm));