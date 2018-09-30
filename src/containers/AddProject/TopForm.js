import React,{Component} from 'react'
import {Form,Input,Select} from 'antd'
import {connect} from 'react-redux'
const Option = Select.Option;
const FormItem = Form.Item;
class TopForm extends Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <div className="title mb10">项目信息</div>
                <Form layout="inline">
                    <FormItem
                        label="项目名称"
                    >
                        {getFieldDecorator('projectName',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="项目状态"
                    >
                        {getFieldDecorator('projectStatus',{initialValue:''})(
                            <Select style={{"width":'200px'}} >
                                <Option value="2" key="2">进行中</Option>
                                <Option vlaue="1" key="1">已完成</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{

    }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(TopForm));