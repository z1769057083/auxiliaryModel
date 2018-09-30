import React,{Component} from 'react'
import {Table,Message,Button,Row,Col,Input,Modal,Upload,Icon} from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import './index.less'
import {api} from '@/api'
const { TextArea } = Input;
class ModelAnaly extends Component{
    state={
        breadList:[{text:'模型分析'}],
        tableData:[],
        importShow:false,
        fileList: [],
        content:'',
        contentStr:'',
        batchShow:false,
        analyArr:[],
        analyLoading:false
    }
    handleCancel(){
        this.setState({
            importShow:false,
            fileList:[]
        })
    }
    handleOk(){
        const formData = new FormData();
        if(this.state.fileList.length===0){
            Message.warning("请选择文件");
            return;
        }
        formData.append("file",this.state.fileList[0]);
        api.analysisupload(formData,{type:'file'}).then(res=>{
            if(res.success){
                Message.success("操作成功");
                this.setState({
                    importShow:false,
                    fileList:[]
                })
            }else{
                Message.error(res.err);
            }
        })
    }
    handleSingle(){
        api.single({content:this.state.content}).then(res=>{
            if(res.success){
                let lightArr = new Set();
                 res.data.forEach(item=>lightArr.add(item.normalizedValue));
                var contentStr = this.state.content;
                lightArr = Array.from(lightArr);
                lightArr.forEach((item,index)=>{
                    let reg = new RegExp(item,'igm');
                    contentStr = contentStr.replace(reg,(item2)=>{
                        return `<span style="background:yellow">${item2}</span>`
                    })
                })
                this.setState({
                    tableData:res.data.map((item,index)=>{item.key=index;return item;}),
                    contentStr:contentStr
                })
            }else{
                Message.error(res.err);
            }
        })
    }
    handleBatchCancel(){
        this.setState({
            batchShow:false,
            fileList:[],
            analyLoading:false
        })
    }
    handleBatchOk(){
        const formData = new FormData();
        if(this.state.fileList.length===0){
            Message.warning("请选择文件");
            return;
        }
        formData.append("file",this.state.fileList[0]);
        this.setState({analyLoading:true})
        api.multiple(formData,{type:'file'}).then(res=>{
            if(res.success){
                Message.success("操作成功");
                this.setState({
                    analyArr:res.data.result
                });
               this.handleBatchCancel();
            }else{
                Message.error(res.err);
            }
        })
    }
    handleDownload(item){
        window.location.href = api.downloadUrl + 'file=' + item;
    }
    render(){
        const columns = [
            {
                title:'表达式',
                dataIndex:'expression',
                align:'left'
            },{
                title:'解析值',
                dataIndex:'timeField',
                align:'left',
                width: '100px'
            },{
                title:'归一化',
                dataIndex:'normalizedValue',
                align:'left',
                width:'100px'
            },{
                title:'类型',
                dataIndex:'name',
                align:'left',
                width:'100px'
            }
        ]
        const props = {
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                console.log(file)
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        const analyHtml = this.state.analyArr.map((item,index)=>{
            return <a key={index} className="mt10" style={{display:'block'}} href="javascript:;" onClick={()=>this.handleDownload(item)}><i className="iconfont">&#xe631;</i>{item}</a>
        })
        return(
            <div className="modelAnaly">
                <BreadCrumb breadList={this.state.breadList}></BreadCrumb>
                <Row>
                    <Col xxl={{span:11}} sm={{span:10}}>
                        <Row>
                            <Col span={12}>
                                <div className="title">输入分析文本</div>
                            </Col>
                            <Col span={12} align="right">
                                <Button type="primary" onClick={()=>this.setState({importShow:true})}>导入模型</Button>
                            </Col>
                        </Row>
                        <TextArea style={{lineHeight:'22px',height:'260px'}} className="mt10" rows={11} value={this.state.content} onChange={e=>this.setState({content:e.target.value})}></TextArea>
                        <div className="mt20 mb20 title">
                            内容高亮显示
                        </div>
                        <div className="content-light" dangerouslySetInnerHTML={{__html: this.state.contentStr}}>
                        </div>
                    </Col>
                    <Col xxl={{span:2}} sm={{span:4}} align="center">
                        <div className="mt100">
                            <Button onClick={this.handleSingle.bind(this)}>单条分析</Button>
                        </div>
                        <div className="mt20">
                            <Button type="primary" onClick={()=>this.setState({batchShow:true})}>批量分析</Button>
                        </div>
                    </Col>
                    <Col xxl={{span:11}} lg={{span:10}}>
                        <div className="title mb20">单条分析结果</div>
                        <Table columns={columns} dataSource={this.state.tableData} pagination={false}></Table>
                        <div className="title mt20">批量分析结果</div>
                        {analyHtml}
                    </Col>
                </Row>
                <Modal
                    className="model-modal"
                    visible={this.state.importShow}
                    title="导入模型"
                    width="480px"
                    onCancel={this.handleCancel.bind(this)}
                    onOk={this.handleOk.bind(this)}
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                    <div className="tip">
                        <p>注意:</p>
                        <p>(1)导入模型文件为csv文件，如果是xls或者xlsx文件，请另存为csv文件</p>
                        <p>(2)请去掉模型文件中第二行，即中文汉字描述那一行</p>
                        <p>(3)请将模型文件保存为UTF-8格式文件（可以在记事本中打开再另存为）</p>
                    </div>
                </Modal>
                <Modal
                    className="batch-modal"
                    visible={this.state.batchShow}
                    title="批量分析"
                    width="480px"
                    footer={[
                        <Button key="back" onClick={this.handleBatchCancel.bind(this)}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleBatchOk.bind(this)} loading={this.state.analyLoading}>开始分析</Button>
                    ]}
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                    <div className="tip">
                        <p>注意:</p>
                        <p>请将语料文件保存为UTF-8格式文件(可以在记事本中打开再另存为)</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default ModelAnaly;
