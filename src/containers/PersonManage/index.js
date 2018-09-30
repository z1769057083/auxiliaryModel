import React,{Component} from 'react'
import {Form,Message,Input,Button} from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import {api} from '@/api'
import {connect} from 'react-redux'
const FormItem = Form.Item;
class PersonManage extends Component{
    state={
        breadList:[{text:'个人信息管理'}]
    }
    handleSave(){
        this.props.form.validateFields((err,values)=>{
            if(err){
                return;
            }
            api.updatePassword({id:this.props.userInfo.id,...values}).then(res=>{
                if(res.success){
                    Message.success("保存成功")
                }else{
                    Message.error(res.err);
                }

            })
        })
    }
    render(){
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const {getFieldDecorator} = this.props.form;
        const validateNewPass = (rule, value, callback) => {
            if (value === this.props.form.getFieldValue('oldPassword')) {
                callback(new Error('新旧密码不能一致!'));
            } else {
                callback();
            }
        };
        const validateConfirmPass = (rule, value, callback) => {
            if(value.length>=6&&value.length<=20){
                if (value !== this.props.form.getFieldValue('newPassword')) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
        };
        return(
            <div className="person-wrap">
                <BreadCrumb breadList={this.state.breadList}/>
                <Form style={{width:'460px'}}>
                    <FormItem
                        label="原密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('oldPassword',{initialValue:'',
                            rules: [
                                {  required: true, message: '请输入原密码' },
                                {min:6,max:20,message:'请输入6-20位数字字母组合'}
                            ],
                        })(
                            <Input style={{"width":'290px'}} type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        label="新密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('newPassword',{initialValue:'',
                            rules: [
                                {  required: true, message: '请输入新密码' },
                                {min:6,max:20,message:'请输入6-20位数字字母组合'},
                                {validator:validateNewPass}
                            ],
                        })(
                            <Input style={{"width":'290px'}} type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="确认密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cfmPassword',{initialValue:'',
                            rules: [
                                {  required: true, message: '请输入确认密码' },
                                {min:6,max:20,message:'请输入6-20位数字字母组合'},
                                {validator:validateConfirmPass}
                            ],
                        })(
                            <Input style={{"width":'290px'}} type="password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button style={{marginLeft:'298px'}} type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
PersonManage = Form.create()(PersonManage);
function mapStateToProps(state){
    return{
        userInfo:state.auth.get("userInfo")
    }
}
function mapDispatchToProps(dispatch){
    return{
        actions:{}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersonManage);
