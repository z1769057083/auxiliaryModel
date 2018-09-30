import React,{Component} from 'react'
import XLSX from "xlsx"
import {Modal,Button,Input,Form,Checkbox ,Radio,Upload,Icon,Select,Message} from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {api} from '@/api/index'
import * as ModalActions from '@/actions/modal'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class ImportCorpus extends Component{
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    state = {
        loading: false,
        visible: false,
        fileList:[],
        dataColumns:[],
        classifyColumns:[],
        file:null
    }
    showModal = () => {
        this.setState({
            visible: true,
            fieldsVal:{}
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        this.props.form.validateFields((err,fieldsVal)=>{
            if(err){
                return;
            }
            fieldsVal.firstIsTitle? 1: 0;
            console.log(fieldsVal)
            // this.setState({fieldsVal})
            const formData = new FormData();
            formData.append("classifyColumn",fieldsVal.classifyColumn);
            formData.append("firstIsTitle",fieldsVal.firstIsTitle?1:0);
            formData.append("importType",fieldsVal.importType);
            formData.append("dataColumn",fieldsVal.dataColumn);
            formData.append("file",this.state.file);
            api.uploadCorpus(formData,{type:'file'}).then(res=>{
                if(res.success){
                    Message.success('导入成功');
                    this.handleCancel();
                }else{
                    Message.error(res.err);
                }
                this.setState({loading:false})
            })
        })



    }
    handleCancel(){
        this.props.form.resetFields();
        this.setState({fileList:[]})
        this.props.actions.hideCorpusModal()
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, loading } = this.state;
        const formItemLayout = {
            labelCol: {
                 span: 4
            },
            wrapperCol: {
                span: 20
            }
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
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
                var that = this;
                var dataColumns = [];
                var classifyColumns = [];
                if(file.size / 1024 / 1024 > 20){
                    Message.warning("请上传2M以内文件");
                    return;
                }
                let fileType = file.name.split(".")[1];
                if (fileType === "csv") {
                    //解析csv文件
                    if (typeof FileReader !== "undefined") {
                        var reader = new FileReader();
                        reader.readAsText(file, "GB2312"); // 以文本格式读取
                        reader.onload = function(evt) {
                            var data = evt.target.result; // 读到的数据
                            var columns = data.split("\n")[0].split(",");
                            if (columns.length <= 0) {
                                Message.warning("文件为空");
                                return;
                            }
                            dataColumns = columns;
                            columns.forEach(item => {
                                classifyColumns.push(item);
                            });
                            that.setState({
                                dataColumns,
                                classifyColumns
                            })
                        };
                    }
                } else if (fileType === "xlsx") {
                    //解析xlsx文件
                    const files = file;
                    const fileReader = new FileReader();
                    fileReader.readAsBinaryString(file);
                    fileReader.onload = ev => {
                        try {
                            const data = ev.target.result;
                            const workbook = XLSX.read(data, {
                                type: "binary"
                            });
                            const range = workbook.Sheets.Sheet1["!ref"];
                            const startNum = parseInt(range.split(":")[0].substring(1));
                            const endNum = parseInt(range.split(":")[1].substring(1));
                            const sheetArray = [];
                            for (var i = startNum; i < endNum; i++) {
                                sheetArray.push(workbook.Sheets.Sheet1["A" + i]);
                                dataColumns.push(workbook.Sheets.Sheet1["A" + i].v);
                                classifyColumns.push(workbook.Sheets.Sheet1["A" + i].v);
                            }
                            that.setState({
                                dataColumns,
                                classifyColumns
                            })
                        } catch (e) {
                            Message.warning("文件读取失败！");
                            return false;
                        }
                    };
                } else if (fileType === "txt") {
                    //
                } else {
                    Message.warning("请上传csv,xlsx,txt类型文件");
                    return;
                }
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                    file:file
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        const dataColumnHtml = this.state.dataColumns.map((item,index)=><Option key={index}>{item}</Option>)
        const classifyColumnHtml = this.state.classifyColumns.map((item,index)=><Option key={index}>{item}</Option>)
        return (
            <div>
                <Modal
                    visible={this.props.corpusVisible}
                    title="导入语料"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            导入
                        </Button>
                    ]}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="文件名称"
                        >
                            {getFieldDecorator('fileName')(
                                <Upload {...props}>
                                    <Button><Icon type="upload"/>选择文件</Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="数据列名"
                        >
                            {getFieldDecorator('dataColumn')(
                                <Select>
                                    {dataColumnHtml}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="分类列名"
                        >
                            {getFieldDecorator('classifyColumn')(
                                <Select>
                                    {classifyColumnHtml}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formTailLayout}
                        >
                            {getFieldDecorator('firstIsTitle',{initialValue: false})(
                                <Checkbox >首行为标题</Checkbox>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="导入类型"
                        >
                            {getFieldDecorator('importType',{
                                initialValue: '0',
                            })(
                                <RadioGroup>
                                    <Radio value="0">覆盖导入</Radio>
                                    <Radio value="1">增加导入</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
 ImportCorpus = Form.create()(ImportCorpus);
function mapStateToProps(state){
    return {
        corpusVisible: state.modal.get("corpusVisible")
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            showCorpusModal: ModalActions.showCorpusModal,
            hideCorpusModal: ModalActions.hideCorpusModal
        },dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ImportCorpus)