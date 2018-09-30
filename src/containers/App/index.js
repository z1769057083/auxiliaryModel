import React,{Component} from 'react'
import {Layout} from 'antd'
import HeaderBar from "@/components/HeaderBar"
import FooterBar from '@/components/FooterBar'
import {childRoutes} from '@/route'
import {Route,BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from '@/store'
import '../../styles/antd-reset.less'
import '../../styles/common.less'
import './index.less'
const {Header,Content,Footer} = Layout;
class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Header>
                            <HeaderBar />
                        </Header>
                        <Content>
                            {
                                childRoutes.map((item,index)=>{
                                  return  <Route key={index} path={item.path} component={item.component} />
                                })
                            }
                        </Content>
                        <Footer>
                            <FooterBar></FooterBar>
                        </Footer>
                    </Layout>
                </Router>
            </Provider>
        )
    }
}
export default App;