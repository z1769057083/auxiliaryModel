import React,{Component} from 'react'
import {Modal,Message,Table,Button,Form,Input,Select,Row,Col,Tabs,Radio,Popconfirm } from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import {api} from '@/api'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ModalAction from '@/actions/modal'
import ImportCorpus from '@/components/ImportCorpus'
import { CSSTransition } from 'react-transition-group';
import './index.less'
const Search = Input.Search;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
class TextFilter extends Component{
    state={
        showDeal:false,
        showCompare:false,
        breadList:[{text:'文本筛选'}],
        addCorpusShow:false,
        corpusTitle:'',
        classify:'',
        hightSearchShow:false,
        classifyRelation:'all',
        wenben:'',
        fenlei:'',
        fhppNumArr:[{
            prefixCompareType:'AND',
            name: 'content',
            compareType:'LIKE',
            value:'',
        }],
        cacheValue:'',
        cacheSearchParam:[''],
        pageNo:1,
        pageSize:10,
        activeKey:'1',
        activeIndex:'',
        classifyVal:'',
        cacheClassify:'',
        cacheId:'',
        cacheContent:'',
        cmplxOptions: [
            //复合匹配的匹配方式
            {
                label: "包含",
                value: "LIKE"
            },
            {
                label: "全匹配",
                value: "="
            },
            {
                label: "开头是",
                value: "PREFIX"
            },
            {
                label: "结尾是",
                value: "SUFFIX"
            },
            {
                label: "开头不是",
                value: "NOT PREFIX"
            },
            {
                label: "结尾不是",
                value: "NOT SUFFIX"
            },
            {
                label: "等于（仅限数字）",
                value: "="
            },
            {
                label: "大于（仅限数字）",
                value: ">"
            },
            {
                label: "小于（仅限数字）",
                value: "<"
            },
            {
                label: "正则匹配",
                value: "REGEXP"
            }
        ]
    }
    componentDidMount(){
        this.handleSearch('1111');
    }
    handleExportCorpus(){
        window.location.href = api.exportCorpus
    }
    handleImportCorpus(){
        this.props.actions.showCorpusModal();
    }
    handleAddCorpus(){
        this.setState({
            corpusTitle:'添加语料',
            addCorpusShow:true
        })
    }
    handleDetailCorpus(classify,content,id){
        this.setState({
            cacheContent:content,
            classify:classify,
            cacheId:id,
            corpusTitle:'查看全文',
            addCorpusShow:true
        })
    }
    //添加语料
    handleAddCorpusSubmit(){
        api.saveCorpus({id:this.state.cacheId,content:this.refs.content.innerText,classify:this.state.classify}).then(res=>{
            if(res.success){
                this.handleSearch();
                Message.success(res.data);
                this.handleAddCorpusCancel();
            }else{
                Message.error(res.err);
            }
        })
    }
    handleAddCorpusCancel(){
        this.setState({
            addCorpusShow:false,
            classify:''
        });
        this.refs.content.innerText = '';
    }
    handleSearch(value){
        let param = null;
        if(typeof value!=='object'){
            param = this.state.cacheSearchParam.map((item,index)=>{
                let obj = {
                    prefixCompareType: 'AND',
                    name: "content",
                    compareType: "like",
                    value: item
                }
                return obj;
            })
        }else{
            if(this.state.activeKey === '1') {
                param = [{
                    prefixCompareType: 'AND',
                    name: "content",
                    compareType: "like",
                    value: this.state.wenben
                },{
                    prefixCompareType: "AND",
                    name: "classify",
                    compareType: "like",
                    value: this.state.fenlei,
                    classifyRelation: this.state.classifyRelation
                }]
            }else{
                param = this.state.fhppNumArr
            }
        }
        api.queryCorpusUrl(param,{type:'json',params:{pageNo:this.state.pageNo,pageSize:this.state.pageSize}}).then(res=>{
            if(res.success){
                this.setState({
                    total: res.data.total,
                    tableData:res.data.data.map((item,index)=>{
                        item.num = (this.state.pageNo-1)*this.state.pageSize + index + 1;
                        item.key = index;
                        return item;
                    }),
                    hightSearchShow:false
                })
            }else{
                Message.error(res.err);
            }
        })
    }
    handleSearchCancel(){
        this.setState({
            hightSearchShow:false
        })
    }
    handleTabChange(key){
        this.setState({
            activeKey:key
        })
    }
    handleRadioChange(e){
        let index = e.target.sindex;
        let fhppNumArr = JSON.parse(JSON.stringify(this.state.fhppNumArr));
        fhppNumArr[index].prefixCompareType = e.target.value;
        this.setState({fhppNumArr})
    }
    handleInputChange(e){
        let index = e.target.getAttribute("sindex")
        let fhppNumArr = JSON.parse(JSON.stringify(this.state.fhppNumArr));
        fhppNumArr[index].value = e.target.value;
        this.setState({fhppNumArr})
    }
    handleResultSearch(){
        let arr = this.state.cacheSearchParam;
        if(this.state.cacheValue.length!==0){
            arr.push(this.state.cacheValue);
            this.setState({cacheSearchParam:arr,classifyVal:this.state.cacheValue},this.handleSearch('11'));
        }
    }
    makeHtml(){

        return this.state.fhppNumArr.map((item,index)=>{
            return(
                <div key={'div'+index}>
                    {index!==0?  (
                        <Row className="form-row" sindex={index}>
                            <Col>
                                <RadioGroup sindex={index} onChange={this.handleRadioChange.bind(this)} value={item.prefixCompareType}>
                                    <Radio sindex={index} value='AND'>与(A)</Radio>
                                    <Radio sindex={index} value='OR'>或(O)</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    ):null}
                    <Row key={'row'+index} className="form-row">
                        <Col span={6}>
                            <Select key={'select'+index} style={{width:'120px'}} sindex={index} value={item.compareType} onChange={(e)=>{this.state.fhppNumArr[index].compareType=e;this.setState({'fhppNumArr':this.state.fhppNumArr})}}>
                                {this.state.cmplxOptions.map((item2,index2)=>{
                                    return (
                                        <Option key={index2} sindex={index} value={item2.value}>{item2.label}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col span={16}>
                            <Input sindex={index} value={item.value} onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col span={2}>
                            {index===this.state.fhppNumArr.length-1?(
                                <i className="iconfont btn addIcon" onClick={this.handleAdd.bind(this,index)}>&#xe752;</i>
                            ):(
                                <i className="iconfont btn removeIcon" onClick={this.handleReduce.bind(this,index)}>&#xe712;</i>
                            )}
                        </Col>
                    </Row>
                </div>

                )
        });
    }
    handleAdd(index){
        const fhppNumArr = this.state.fhppNumArr.concat({
            prefixCompareType:'AND',
            name: 'content',
            compareType:'LIKE',
            value:'',
            id: this.state.fhppNumArr.length
        });
        this.setState({
            fhppNumArr
        })
    }
    handleReduce(index){
        const fhppNumArr = JSON.parse(JSON.stringify(this.state.fhppNumArr));
         fhppNumArr.splice(index,1);
        this.setState({
            fhppNumArr
        })
    }
    handleSearchReduce(index){
        var arr = this.state.cacheSearchParam;
        arr.splice(index,1);
        this.setState({
            cacheValue:'',
            cacheSearchParam:arr
        },this.handleSearch('111'))
    }
    handleChangeClassify(type){
        let param = this.getParam();
        api.updateClassifyUrl(param,{params:{classify:this.state.classifyVal,type:type},type:'json'}).then(res=>{
            if(res.success){
                Message.success(res.data);
                this.setState({classifyVal:''})
                this.handleSearch('111')
            }else{
                Message.error(res.err);
            }
        })
    }
    dealContent(str,flag){
        let content = str;
        this.state.cacheSearchParam.forEach((item,index)=>{
            let reg = new RegExp(item,'gm');
            content = content.replace(reg,data=>{
                return `<span style="color:red">${data}</span>`
            })
        });
        if(flag){
            return <div dangerouslySetInnerHTML={{__html:content+'...'}}></div>
        }else{
            return <div dangerouslySetInnerHTML={{__html:content}}></div>
        }

    }
    handleDelOne(id){
        api.delOne({id}).then(res=>{
            if(res.success){
                Message.success(res.data);
                this.setState({pageNo:1},this.handleSearch);
            }else{
                Message.error(res.err);
            }
        })
    }
    handleDelMore(){
        let param = this.getParam();
        api.delMore(param,{type:'json'}).then(res=>{
            if(res.success){
                Message.success(res.data);
                this.setState({pageNo:1},this.handleSearch);
            }else{
                Message.error(res.err);
            }
        })
    }
    getParam(){
       return this.state.cacheSearchParam.map((item,index)=>{
            let obj = {
                prefixCompareType: 'AND',
                name: "content",
                compareType: "like",
                value: item
            }
            return obj;
        })
    }
    handleExport(){
        let param = this.getParam();
        api.exportCorpus(param,{type:'json',notToJson:true}).then(res=>{
            window.location.href = api.exportUrl;
        })
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(!nextProps.istoGet){
            this.handleSearch('1111');
        }
    }
    hanelBackTop(){
        clearInterval(timer);
       var timer = setInterval(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
            }else{
                clearInterval(timer);
            }
        },50);
    }
    render(){
        const columns = [{
            title:'序号',
            dataIndex:'num',
            align:'center',
            width: '100px',
        },{
            title:'文本',
            dataIndex:'content',
            align:'center',
            width: '200px',
            render:text=>{
                return text.length>100?this.dealContent(text.substr(0,100),true):this.dealContent(text,false);
            }
        },{
            title:'分类',
            dataIndex:'classify',
            align:'center',
            width: '100px',
            render:(text)=>{
                return text.length>60?text.substr(0,100)+'...':text;
            }
        },{
            title:'操作',
            dataIndex:'',
            align:'center',
            width: '200px',
            render:(text,row)=>{
                return(
                    <div>
                        <span className="btn-red" onClick={this.handleDetailCorpus.bind(this,row.classify,row.content,row.id)}><i className="iconfont">&#xe68a;</i>查看全文</span>
                        <Popconfirm placement="left"  title="确认删除该条语料吗?" onConfirm={()=>this.handleDelOne(row.id)}>
                        <span className="btn"><i className="iconfont">&#xe653;</i>删除</span>
                        </Popconfirm>
                    </div>
                )
            }
        }]
       const pagination={
            align:'center',
            total:this.state.total,
            showTotal:()=>`共${this.state.total}条`,
            showSizeChanger:true,
            onShowSizeChange:(current, pageSize)=>{this.setState({pageNo:1,pageSize:pageSize},this.handleSearch)},
            onChange:(page)=>{this.setState({pageNo:page},this.handleSearch)},
            page:this.state.pageNo,
            current:this.state.pageNo,
            pageSize:this.state.pageSize
        }
        const searchHtml = this.state.cacheSearchParam.map((item,index)=>{
            if(item.length!==0){
                return <span className="btn-search" onClick={this.handleSearchReduce.bind(this,index)} key={index}>{item}<i className="iconfont">&#xe621;</i></span>
            }
        })
        var content = this.state.cacheContent;
        this.state.cacheSearchParam.forEach((item,index)=>{
            let reg = new RegExp(item,'gm');
           content = content.replace(reg,data=>{
                return `<span style="color:red" contenteditable="false">${data}</span>`
            })
        });
        return(
            <div className="text-filter">
                <BreadCrumb breadList={this.state.breadList}></BreadCrumb>
                <Row>
                    <Col span={12}>
                        <Search
                            style={{width:'380px'}}
                            placeholder=""
                            enterButton="搜索"
                            value={this.state.cacheValue}
                            onChange={e=>this.setState({cacheValue:e.target.value})}
                            onSearch={value => {this.setState({pageNo:1,cacheSearchParam:[value]},()=>this.handleSearch(value))}}
                        />
                        <Button className="ml10 btn-o-x" onClick={()=>this.setState({hightSearchShow:true})}>高级搜索</Button>
                        <Button className="ml10 btn-o-x" onClick={this.handleResultSearch.bind(this)}>在结果中搜索</Button>
                    </Col>
                    <Col span={12} align="right">
                        <Button type="primary" onClick={this.handleAddCorpus.bind(this)}>添加语料</Button>
                        <Button className="ml10" type="primary" onClick={this.handleImportCorpus.bind(this)}>导入语料</Button>
                        <Button className="ml10 btn-o-x" onClick={this.handleExport.bind(this)}>导出当前语料</Button>
                    </Col>
                </Row>
                <div className="search-wrap">
                    <Row className="search-condition">
                        <Col span={24}>
                            搜索条件:
                            {searchHtml}
                        </Col>
                        {/*<Col span={12} align="right">*/}
                            {/*共{0}条结果,一页显示*/}
                            {/*<Select style={{width:'80px'}}>*/}
                                {/*<Option value="1111"></Option>*/}
                            {/*</Select>*/}
                            {/*&nbsp;*/}
                            {/*这是第1-25条的结果*/}
                        {/*</Col>*/}
                    </Row>
                    <Row className="search-b">
                        <Col span={12}>
                            批量操作: &nbsp;
                            <Input style={{width:'150px'}} value={this.state.classifyVal} onChange={(e)=>this.setState({classifyVal:e.target.value})} size="small"/>
                            <Button type="primary" className="ml10 mr10" size="small" onClick={this.handleChangeClassify.bind(this,0)}>添加分类</Button>
                            <Button className="btn-o-x" size="small" onClick={this.handleChangeClassify.bind(this,1)}>替换分类</Button>
                        </Col>
                        <Col span={12} align="right">
                            <Popconfirm placement="bottom" title="确认批量删除语料吗?" onConfirm={()=>this.handleDelMore()}>
                                <Button type="danger" size="small">删除当前语料</Button>
                            </Popconfirm>
                        </Col>
                    </Row>
                </div>
                <Table className="mt20" columns={columns} dataSource={this.state.tableData} pagination={pagination}></Table>
                <ImportCorpus/>
                <Modal
                    title={this.state.corpusTitle}
                    visible={this.state.addCorpusShow}
                    width="780px"
                    onOk={this.handleAddCorpusSubmit.bind(this)}
                    onCancel={this.handleAddCorpusCancel.bind(this)}
                >
                    {
                        this.state.corpusTitle!=='添加语料'?
                            <Row className="row-item">
                            <Col span={3} pull={1} align="right">搜索条件</Col>
                            <Col span={20}>{this.state.cacheSearchParam.join(";")}</Col>
                        </Row> :null
                    }

                    <Row className="row-item mt10">
                        <Col span={3} pull={1} align="right">全文</Col>
                        <Col span={20}>
                            <div ref="content" contentEditable={true} className="corpus-detail-box" dangerouslySetInnerHTML={{__html:content}}>
                            </div>
                        </Col>
                    </Row>
                    <Row className="row-item mt10">
                        <Col span={3} pull={1} align="right">分类</Col>
                        <Col span={20}>
                            <Input value={this.state.classify} onChange={(e)=>this.setState({classify:e.target.value})}/>
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    className="text-filter-modal"
                    title="高级搜索"
                    visible={this.state.hightSearchShow}
                    width="650px"
                    onCancel={this.handleSearchCancel.bind(this)}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleSearch.bind(this)}>
                            搜索
                        </Button>,
                    ]}
                >
                    <Tabs style={{textAlign:'center'}} defaultActiveKey={this.state.activeKey} onChange={this.handleTabChange.bind(this)}>
                        <TabPane tab="分类筛选" key="1">
                            <Row className="form-row">
                                <Col span={6} align="right">
                                   <span className="mr10">文本</span>
                                </Col>
                                <Col span={18} align="left">
                                    <Input style={{width:'350px'}} value={this.state.wenben} onChange={(e)=>this.setState({wenben:e.target.value})}/>
                                </Col>
                            </Row>
                            <Row className="form-row">
                                <Col span={6} align="right">
                                     <span className="mr10">分类</span>
                                </Col>
                                <Col span={18} align="left">
                                    <Input style={{width:'350px'}} placeholder="请输入需要筛选的分类，多个分类请用“；”分隔开" value={this.state.fenlei} onChange={(e)=>this.setState({fenlei:e.target.value})}/>
                                </Col>
                            </Row>
                            <Row className="form-row">
                                <Col span={6} align="right">
                                    <span className="mr10">多分类关系</span>
                                </Col>
                                <Col span={18} align="left">
                                    <RadioGroup onChange={(e)=>this.setState({classifyRelation:e.target.value})} value={this.state.classifyRelation}>
                                        <Radio value="all">全与</Radio>
                                        <Radio value="or">全或</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="复合匹配" key="2">
                            {this.makeHtml()}
                        </TabPane>
                        <TabPane tab="OEC匹配" disabled key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Modal>
                    <div className="btn-deal" onMouseOver={()=>this.setState({showDeal:true})} onMouseLeave={()=>this.setState({showDeal:false})}>
                        <CSSTransition
                            in={this.state.showDeal}
                            classNames="deal"
                            timeout={300}
                            unmountOnExit
                        >
                            <div className="dealBar">字符串处理</div>
                        </CSSTransition>
                        <i className="iconfont">&#xe645;</i>
                    </div>
                    <div className="btn-compare">
                        <CSSTransition
                            in={this.state.shoCompare}
                            classNames="deal"
                            timeout={300}
                            unmountOnExit
                        >
                            <div className="compareBar">字符串比较</div>
                        </CSSTransition>
                        <i className="iconfont">&#xe66a;</i>
                    </div>
                <div className="back-top" onClick={this.hanelBackTop.bind(this)}><i className="iconfont">&#xe64a;</i></div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        istoGet:state.modal.get("corpusVisible")
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators({
            showCorpusModal:ModalAction.showCorpusModal
        },dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TextFilter);