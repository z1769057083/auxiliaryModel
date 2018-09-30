import React,{Component} from 'react'
import {Form,Button,Table ,Input,Select,Message,Modal,Row,Col,Popconfirm } from 'antd'
import {api} from '@/api'
import PropTypes from 'prop-types'
import BreadCrumb from '@/components/BreadCrumb'
import {withRouter} from 'react-router-dom';
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option;
class TextForm extends Component {
    state = {
        pageNo:this.props.pageNo,
        pageSize:this.props.pageSize
    }
    componentDidMount(){
        this.getData();
    }
    componentWillReceiveProps(nextProps,old){
        if(nextProps.pageNo!==this.props.pageNo||nextProps.pageSize!==this.props.pageSize){
            this.setState({pageNo:nextProps.pageNo,pageSize:nextProps.pageSize},this.getData)
        }
    }
    getData(){
        const param = this.props.form.getFieldsValue()
        api.queryProject({...param,pageNo:this.state.pageNo,pageSize:this.state.pageSize}).then(res=>{
            if(res.success){
                const tableData = res.data.data.map((item,index)=>{
                    item.num = (this.state.pageNo - 1) * this.state.pageSize + index +1;
                    return item;
                })
                const data = {data:tableData,total:res.data.total}
                this.props.getData(data);
            }else{
                Message.error(res.err);
            }
        })
    }
    handleSearch(){
    this.props.handlePageChange(1);
    this.getData();
    }
    clearVal(){
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="mb15 text-comment" ref="form" onSubmit={this.handleSubmit}>
                        <FormItem
                            label="项目名称"
                        >
                            {getFieldDecorator('projectName',{initialValue:''})(
                                <Input style={{"width":'200px'}} />
                            )}
                        </FormItem>
                <FormItem
                    label="创建人"
                >
                    {getFieldDecorator('creator',{initialValue:''})(
                        <Input style={{"width":'200px'}} />
                    )}
                </FormItem>
                <FormItem
                    label="项目状态"
                >
                    {getFieldDecorator('projectStatus',{initialValue:''})(
                        <Select style={{"width":'200px'}}>
                            <Option value="">全部</Option>
                            <Option value="2">进行中</Option>
                            <Option value="1">已完成</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" className="mr10" onClick={this.handleSearch.bind(this)}>筛选</Button>
                    <Button onClick={this.clearVal.bind(this)}>清空</Button>
                </FormItem>
                <FormItem className="fr">
                    <Button type="dashed" onClick={()=>this.props.history.push('/add/project')}><i className="iconfont mr3">&#xe607;</i>新建项目</Button>
                </FormItem>
            </Form>
        )

    }
}
TextForm = withRouter(Form.create()(TextForm))
class ExportModal extends Component{
    handleOk(){
       let url = api.projectExport;
       window.location.href= url + this.props.id+'/'+this.state.exportForm.nerMarkType + '/'+this.state.exportForm.entityRelationType + '/' + this.state.exportForm.corpusStatus;
       this.handleCancel();
    }
    handleCancel(){
        this.props.handleCancel()
    }
    state ={
        exportForm: {
            entityRelationType:'0',
            nerMarkType:'1',
            corpusStatus:'0'
        }
    }
    render(){
        return(
            <Modal
                visible={this.props.exportVisible}
                title="导出设置"
                width="500px"
                footer={[
                    <Button key="back" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                        导出
                    </Button>,
                ]}
            >
                <Row className="form-item" type="flex" justify="center" align="middle">
                    <Col align="right" span={7} className="form-label">导出内容</Col>
                    <Col span={16} offset={1}>
                        <Select value={this.state.exportForm.entityRelationType} style={{width:'230px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">实体标注结果</Option>
                            <Option value="2">关系标注结果</Option>
                        </Select>
                    </Col>

                </Row>
                <Row className="form-item" type="flex" justify="center" align="middle">
                    <Col align="right" span={7} className="form-label">体标注导出格式</Col>
                    <Col span={16} offset={1}>
                        <Select value={this.state.exportForm.nerMarkType} style={{width:'230px'}}>
                            <Option value="1">NER标注格式</Option>
                            <Option value="2">分词、词性标注格式</Option>
                        </Select>
                    </Col>
                </Row>
                <Row className="form-item" type="flex" justify="center" align="middle">
                    <Col align="right" span={7} className="form-label">导出内容</Col>
                    <Col span={16} offset={1}>
                        <Select value={this.state.exportForm.corpusStatus} style={{width:'230px'}}>
                            <Option value="0">全部语料</Option>
                            <Option value="1">已标注语料</Option>
                            <Option value="2">未标注语料</Option>
                        </Select>
                    </Col>
                </Row>

            </Modal>
        )
    }
}

class TextTable extends Component{
    state = {
        tableData:[]
    }

    handleDel(id){
        api.delProject({id}).then(res=>{
            if(res.success){
                Message.success(res.data);
                this.props.getNewData();
            }else{
                Message.error(res.err);
            }
        })
    }
    render(){
        const account = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo'))['name']:'';
        const columns = [{
            title: '编号',
            dataIndex: 'num',
            width: '100px',
            align:'center'
        }, {
            title: '项目名称',
            dataIndex: 'projectName',
            align:'center'
        }, {
            title: '项目状态',
            dataIndex: 'projectStatus',
            align:'center',
            render:(text=>text===2?<span className="blue">进行中</span>: <span className="green">已完成</span>)
        }, {
            title: '创建人',
            dataIndex: 'creator',
            align:'center'
        },{
            title: '创建日期',
            dataIndex: 'ctime',
            align: 'center'
        },{
            title: '操作',
            dataIndex: 'aaa',
            align:'center',
            width: '265px',
            render:((text,props)=>{
                if(props.creator === account){
                    return (
                        <div>
                            <span className="btn-red"><i className="iconfont">&#xe68a;</i>查看</span>
                            <span className="btn-red"><i className="iconfont">&#xe63a;</i>编辑</span>
                            <span className="btn-green" onClick={()=>this.props.handleExportShow(props.id)}><i className="iconfont">&#xe632;</i>导出</span>
                            <Popconfirm placement="left"  title="确认删除该项目吗?" onConfirm={()=>this.handleDel(props.id)}>
                                <span className="btn"><i className="iconfont">&#xe653;</i>删除</span>
                            </Popconfirm>

                        </div>
                    )
                }else{
                    return(
                        <span className="btn-red"><i className="iconfont">&#xe68a;</i>查看</span>
                    )
                }
            })
        }];
        const tableData = this.props.tableData.map((item,index)=>{
            item.key = index;
            return item;
        })
        let that = this;
        const pagination={
            align:'center',
            total:this.props.total,
            showTotal:()=>`共${this.props.total}条`,
            showSizeChanger:true,
            onShowSizeChange:(current, pageSize)=>this.props.handleSizeChange(pageSize),
            onChange:page => this.props.handlePageChange(page),
            page:this.props.pageNo,
            current:this.props.pageNo,
            pageSize:this.props.pageSize
        }
        return(
            <Table columns={columns} dataSource={this.props.tableData} pagination={pagination}/>
        )
    }
}
TextTable.propTypes={
    tableData:PropTypes.array.isRequired
}
class TextMarkIndex extends Component{
    constructor(props){
        super(props)
        this.state={
            breadList:[{
                text:'文本标注'
            }],
            tableData:[],
            total:0,
            pageNo:1,
            pageSize:10,
            exportVisible:false,
            id:''
        }


    }
    getData(data){
        this.setState({tableData:data.data,total:data.total})
    }
    handleExportShow(id){
        this.setState({
            exportVisible:true,
            id
        })
    }
    handlePageChange(page){
        this.setState({
            pageNo: page
        })
    }
    handleSizeChange(size){
        this.setState({
            pageSize:size,
            pageNo:1
        })
    }
    getNewData(){
        this.formRef.getData()
    }
    handleCancel(){
        this.setState({
            exportVisible:false
        })
    }
    render() {
        return (
            <div>
                <BreadCrumb breadList={this.state.breadList}/>
                <TextForm  handlePageChange={this.handlePageChange.bind(this)} wrappedComponentRef={(inst) => this.formRef = inst} getData={this.getData.bind(this)} pageNo={this.state.pageNo} pageSize={this.state.pageSize}/>
                <TextTable getNewData={this.getNewData.bind(this)} handleExportShow={this.handleExportShow.bind(this)} handlePageChange={this.handlePageChange.bind(this)} handleSizeChange={this.handleSizeChange.bind(this)} tableData={this.state.tableData} total={this.state.total} pageNo={this.state.pageNo} pageSize={this.state.pageSize}/>
                <ExportModal handleCancel={this.handleCancel.bind(this)} id={this.state.id} exportVisible={this.state.exportVisible}/>
            </div>
        )
    }
}

export default TextMarkIndex;


