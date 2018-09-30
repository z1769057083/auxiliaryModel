import React,{Component} from 'react'
import './index.less'
import {Input} from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModalActions from '@/actions/modal'
import ImportCorpus from '@/components/ImportCorpus'
import {api} from '@/api'
const Search = Input.Search;
class Home extends Component{
    state={
        corpusCount:0
    }
    componentDidMount(){
        this.getCorpusCount();
    }
    getCorpusCount(){
        api.queryCount().then(res=>{
            if(res.success){
                this.setState({corpusCount:res.data})
            }
        })
    }
    handleImportCorpus(){
        if(this.props.isLogin) {
            this.props.actions.showCorpusModal()
        }else{
            this.props.actions.showLoginModal()
        }
    }
    render(){
        return (
            <div className="home-wrap">
                <div className="center-box">
                    <div className="logo-w">
                        <img src={require("../../assets/images/logo.png")} alt="神州泰岳"/>
                        <span className="logo-text">辅助建模平台</span>
                    </div>
                    <div className="search-wrap">
                        <Search
                            style={{width:'500px'}}
                            enterButton="GO!"
                            size="large"
                            onSearch={value => console.log(value)}
                        />
                        <span className="btn ml10" onClick={ this.handleImportCorpus.bind(this) }><i className="iconfont">&#xe610;</i>导入语料</span>
                    </div>
                    <div className="tip">当前公有语料<span>{this.state.corpusCount}</span>条</div>
                </div>
                <ImportCorpus></ImportCorpus>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        corpusVisible: state.modal.get("corpusVisible"),
        isLogin: state.auth.get("isLogin")
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            showLoginModal: ModalActions.showLoginModal,
            showCorpusModal: ModalActions.showCorpusModal,
            hideCorpusModal: ModalActions.hideCorpusModal
        },dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)