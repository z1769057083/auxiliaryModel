 import React,{Component} from 'react'
import PropTypes from 'prop-types'
 import {Link} from 'react-router-dom'
 import {Breadcrumb } from 'antd'


 class BreadCrumb extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const list = this.props.breadList.map((item,index)=>{
            if(item.url){
                return <Breadcrumb.Item key={index}><Link to={item.url}>{item.text}</Link></Breadcrumb.Item>
            }else{
                return <Breadcrumb.Item key={index}>{item.text}</Breadcrumb.Item>
            }
        })
        return(
            <Breadcrumb style={{marginBottom:'20px'}}>
                {list}
            </Breadcrumb>
        )
    }
 }
 BreadCrumb.propTypes = {
    breadList: PropTypes.array.isRequired
 }
 export default BreadCrumb;