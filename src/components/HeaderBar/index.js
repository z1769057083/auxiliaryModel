import React,{Component} from 'react'
import {Layout,Menu,Dropdown} from 'antd';
import "./index.less"
import {withRouter} from 'react-router'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ModalAction from '@/actions/modal'
import * as AuthAction from '@/actions/auth'
import LoginModal from '@/components/LoginModal'
import {api} from '@/api'
const {Header,Content,Footer} = Layout;

class HeaderBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeKey:''
        }
    }
    componentDidMount(){
        this.props.actions.refreshState();
    }
    handleMenuClick =({ item, key, keyPath })=>{
        this.setState({
            activeKey:key
        })
    }
    handleLogin(){
        this.props.actions.showLoginModal()
    }
    render(){
        const {activeKey} = this.state;
        const logoImg = require('../../assets/images/logo_bg.png');
        return(
            <div>
                <div className="logo" style={{background:`url(${logoImg})`}} />
                    <Menu
                        mode="horizontal"
                        selectedKeys={[activeKey]}
                        onClick={this.handleMenuClick}
                        style={{ lineHeight: '50px' }}
                    >
                        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
                        <Menu.Item key="textFilter"><Link to="/text/filter">文本筛选</Link></Menu.Item>
                        <Menu.Item key="textMark"><Link to="/text/mark">文本标注</Link></Menu.Item>
                        <Menu.Item key="modelAnaly"><Link to="/model/analy">模型分析</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/user/manage">用户管理</Link></Menu.Item>
                        <Menu.Item key="personManage"><Link to="/person/manage">个人信息管理</Link></Menu.Item>
                        {
                            this.props.userInfo ?  <Menu.SubMenu className="user-info" key="sub1" title={this.props.userInfo['name']}>
                                <Menu.Item key="logoout" onClick={this.props.actions.loginOut}>退出</Menu.Item>
                            </Menu.SubMenu> : <Menu.Item key="9" className="user-info" onClick={this.handleLogin.bind(this)}>登录</Menu.Item>
                        }

                    </Menu>
                <LoginModal/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        isLogin:state.auth.get("isLogin"),
        userInfo:state.auth.get("userInfo")
    }
}
function mapActionToDispatch(dispatch){
    return{
        actions:bindActionCreators({
            showLoginModal:ModalAction.showLoginModal,
            refreshState: AuthAction.refreshState,
            loginOut:AuthAction.beginLoginOut
        },dispatch)
    }
}
export default connect(mapStateToProps,mapActionToDispatch)(HeaderBar)
