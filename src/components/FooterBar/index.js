import React,{Component} from 'react'
import './index.less'
class FooterBar extends Component{
    render(){
        return(
            <div>
                <div data-v-23eb5d54="" className="page-footer">
                    <p>版权所有©北京神州泰岳软件股份有限公司 京ICP备06003796号</p>
                    <p><img src={require("../../assets/images/footerImg.png")} /> 京公网安备 110105002034030号</p>
                </div>
            </div>
        )
    }
}
export default FooterBar;
