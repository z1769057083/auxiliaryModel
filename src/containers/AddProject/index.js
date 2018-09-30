import React,{Component} from 'react'
import BreadCrumb from '@/components/BreadCrumb'
import {withRouter} from 'react-router-dom';
import TopForm from './TopForm'
import {Tabs,Button} from 'antd'
import SearchForm from './SearchForm'
import ProjectTable from './ProjectTable'
import TagInfo from './TagInfo'
const TabPane = Tabs.TabPane;
class AddProject extends Component{
    componentDidMount(){
        console.log(this.props.location.query)
    }
    render(){
        const breadList = [{text:'文本标注',url:'/text/mark'},{text:'新建项目'}]
        return(
            <div>
                <BreadCrumb breadList={breadList}></BreadCrumb>
                <TopForm></TopForm>
                <Tabs>
                    <TabPane tab="成员信息" key="1">
                        <SearchForm></SearchForm>
                        <ProjectTable></ProjectTable>
                    </TabPane>
                    <TabPane tab="标签信息" key="2">
                        <TagInfo></TagInfo>
                    </TabPane>
                </Tabs>
                <div className="mt10" style={{textAlign:'center'}}>
                    <Button className="mr10" type="primary">保存</Button>
                    <Button>取消</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddProject);
