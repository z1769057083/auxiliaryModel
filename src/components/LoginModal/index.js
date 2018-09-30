import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Modal,Form,message,Input,Icon,Button} from 'antd'
import * as modalAction from '@/actions/modal'
import * as authAction from '@/actions/auth'
import {api} from '@/api'
import _ from 'lodash'
const FormItem = Form.Item;
class LoginForm extends Component{
    state={
        code: api.captchaImage + Math.random()
    }
    changeCode(){
        this.setState({code: api.captchaImage + Math.random()})
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 0
            },
            wrapperCol: {
                span: 24,
                align: 'center'
            }
        };
        return(
            <Form style={{textAlign:'center'}}>
                <FormItem
                    {...formItemLayout}
                    label=""
                >
                    {getFieldDecorator('name')(
                        <Input addonBefore={<i className="iconfont">&#xe679;</i>} placeholder="用户名" style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label=""
                >
                    {getFieldDecorator('password')(
                        <Input addonBefore={<i className="iconfont">&#xe6d5;</i>} type="password" placeholder="密码" type="password" style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label=""
                >
                    {getFieldDecorator('verifyCode')(
                        <Input addonBefore={<i className="iconfont">&#xe60d;</i>} placeholder="验证码" style={{width:'180px'}} onPressEnter={this.props.handleLogin}/>

                    )}
                    <img src={this.state.code} onClick={this.changeCode.bind(this)} alt="" style={{width:'110px',marginLeft:'10px'}}/>
                </FormItem>
            </Form>
        )
    }
}
LoginForm = Form.create()(LoginForm);
class LoginModal extends Component{
    state = {
        loading: false
    }
    handleCancel(){
        this.refs.loginForm.resetFields();
        this.props.actions.hideLoginModal();
    }
    handleLogin(){
        this.refs.loginForm.validateFields((err,fields)=>{
            if(err){
                return;
            }
            this.props.actions.beginLogin(fields);
        })

    }
    render(){
        return(
            <Modal
                width="480px"
                style={{textAlign:'cneter'}}
                visible={this.props.loginVisible}
                title={<div style={{textAlign:'center'}}>登录</div>}
                onOk={this.handleOk}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                    <div key="odiv" style={{textAlign:'center'}}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleLogin.bind(this)} style={{width:'300px'}}>
                            登录
                        </Button>
                    </div>

                ]}
            >

                <LoginForm ref="loginForm" handleLogin={this.handleLogin.bind(this)} />
            </Modal>
        )
    }
}



function mapStateToProps(state){
    return{
        loginVisible:state.modal.get("loginVisible")
    }
}
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(
            {
                showLoginModal: modalAction.showLoginModal,
                hideLoginModal: modalAction.hideLoginModal,
                beginLogin: authAction.beginLogin
            }
            ,dispatch
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);