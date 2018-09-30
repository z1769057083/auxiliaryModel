import {Form,Input,Select,Table,Message,Button,Modal,Popconfirm} from 'antd'
import React,{Component} from 'react'
import BreadCrumb from '@/components/BreadCrumb'
import PropTypes from 'prop-types'
import {api} from '@/api'
import './index.less'
const FormItem = Form.Item;
const Option =Select.Option;

class AddUser extends Component{
    state={
        roleList:[]
    }
    componentDidMount(){
        this.queryRole();
    }
    queryRole(){
        api.queryRole().then(res=>{
            if(res.success){
                this.setState({roleList:res.data})
            }else{
                Message.error(res.err);
            }
        })
    }
    handleOk(){
        this.props.form.validateFields((err,values)=>{
            if(err) {
                return;
            }
            api.saveUser({...values,id:this.props.editParm.id}).then(res=>{
                if(res.success){
                    Message.success("操作成功");
                    this.handleCancel();
                }else{
                    Message.error(res.err);
                }
            })
        })
    }
    handleCancel(){
        this.props.form.resetFields();
        this.props.changeModal({addShow:false});
    }
    render(){
        const editParm = this.props.editParm;
        const roleName = editParm.roleName;
        const roleSelect = this.state.roleList.filter((item)=>item.name===roleName);
        const roleId = roleSelect[0]?roleSelect[0].id:'';
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                 span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const validFunction = (rule, value, callback) => {
            var reg = /^[\u4e00-\u9fa5]{1,10}$/gi;
            if(!reg.test(value)||value.length<1||value.length>10){
                callback('请输入1-10位中文字符');
                return;
            } else{
                callback(); // 校验通过
            }
        }
        return(
            <Modal
                visible={this.props.addShow}
                title="新建账号"
                width="480px"
                onCancel={this.handleCancel.bind(this)}
                footer={[
                    <Button key="back" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                        确认
                    </Button>,
                ]}

            >
                <Form>
                    <FormItem
                        label="账号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name',{initialValue:this.props.editParm.name,
                            rules: [
                                {  required: true, message: '请输入账号' },
                                {min:4,max:20,message:'请输入4-20位数字字母组合'}
                                ],
                        })(
                            <Input style={{"width":'290px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="真实姓名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('realName',{initialValue:this.props.editParm.realName,
                            rules: [
                                {  required: true, message: '请输入真实姓名' },
                                {validator:validFunction}
                            ],
                        })(
                            <Input style={{"width":'290px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="角色"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('roleId',{initialValue:roleId,rules:[{
                            required:true,message:'请选择角色'
                            }]})(
                            <Select style={{width:'290px'}}>
                                {this.state.roleList.map((item,index)=><Option key={index} value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
AddUser = Form.create()(AddUser);
AddUser.propTypes = {
    addShow: PropTypes.bool.isRequired,
    changeModal:PropTypes.func,
    isEdit:PropTypes.bool,
    editParm:PropTypes.object
}
AddUser.defaultProps = {
    addShow:false,
    isEdit:false,
}

class UserManage extends Component{
    state={
        pageNo:1,
        pageSize: 10,
        total:0,
        breadList:[{text:'用户管理'}],
        tableData:[],
        userList:[],
        addShow:false,
        editParm:{
            name:'',
            realName:'',
            id:'',
            roleName:''
        },
        isEdit:false,
    }
    componentDidMount(){
        this.getCreator();
        this.getTableData();
    }
    getTableData(){
        const param = this.props.form.getFieldsValue();
        api.queryUserList({...param,pageNo:this.state.pageNo,pageSize:this.state.pageSize}).then(res=>{
            if(res.success){
                const data = res.data.data.map((item,index)=>{
                    item.key = index;
                    item.num = (this.state.pageNo-1) * this.state.pageSize + index + 1;
                    return item;
                })
                this.setState({
                    total:res.data.total,
                    tableData:data
                })
            }else {
                Message.error(res.err);
            }
        })
    }
    getCreator(){
        api.queryCreator().then(res=>{
            if(res.success){
                this.setState({
                    userList:res.data
                })
            }else{
                Message.error(res.err);
            }
        })
    }
    clearVal(){
        this.props.form.resetFields();
    }
    changeModal(param){
        if(param.isEdit){
            this.setState({
                addShow:param.addShow,
                editParm:param.editParm,
                isEdit:param.isEdit
            })
        }else{
            this.setState({
                addShow:param.addShow
            },this.getTableData)
        }

    }
    handleAddAccount(){
        this.setState({addShow:true,editParm:{name:'',realName:'',roleName:''}});
    }
    handleDel(id){
        api.delUser({id}).then(res=>{
            if(res.success){
                Message.success("删除成功");
                this.getTableData();
            }else{
                Message.error(res.err);
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const  columns = [{
            title: '编号',
            dataIndex: 'num',
            width: '100px',
            align:'center'
        },{
            title: '账号',
            dataIndex: 'name',
            align:'center'
        },{
            title: '真实姓名',
            dataIndex: 'realName',
            align:'center'
        },{
            title: '角色名称',
            dataIndex: 'roleName',
            align:'center'
        },{
            title: '创建用户',
            dataIndex: 'creator',
            align:'center'
        },{
            title: '操作时间',
            dataIndex: 'ctime',
            align:'center'
        },{
            title: '操作人',
            dataIndex: 'operator',
            align:'center'
        },{
            title: '操作',
            dataIndex: '',
            align:'center',
            render:(text,row)=>{
                return(
                    <div>
                        <span className="btn-red" onClick={()=>this.changeModal({addShow:true,isEdit:true,editParm:row})}><i className="iconfont">&#xe63a;</i>编辑</span>
                        <Popconfirm placement="left"  title="确认删除该账号吗?" onConfirm={()=>this.handleDel(row.id)}>
                            <span className="btn"><i className="iconfont">&#xe653;</i>删除</span>
                        </Popconfirm>
                    </div>
                )
            }
        }]
        const pagination = {
            page:this.state.pageNo,
            pageSize:this.state.pageSize,
            current:this.state.pageNo,
            total: this.state.total,
                showTotal:()=>`共${this.state.total}条`,
            onChange:(page)=>{
                this.setState({
                    pageNo: page
                },this.getTableData)
            }
        }
        return (
            <div className="user-wrapper">
                <BreadCrumb breadList={this.state.breadList}></BreadCrumb>
                <Form ref="form" onSubmit={this.handleSubmit}>
                    <FormItem
                        label="账号"
                    >
                        {getFieldDecorator('name',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="真实姓名"
                    >
                        {getFieldDecorator('realName',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="创建账号"
                    >
                        {getFieldDecorator('creator',{initialValue:''})(
                            <Select style={{"width":'200px'}} >
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="mr10" onClick={()=>{this.setState({pageNo:1},this.getTableData)}}>筛选</Button>
                        <Button onClick={this.clearVal.bind(this)}>清空</Button>
                    </FormItem>
                    <FormItem className="fr">
                        <Button type="dashed" onClick={this.handleAddAccount.bind(this)}><i className="iconfont mr3">&#xe607;</i>新建账号</Button>
                    </FormItem>
                </Form>
                <Table columns={columns} dataSource={this.state.tableData} pagination={pagination}></Table>
                <AddUser ref="addUser"  addShow={this.state.addShow} changeModal={this.changeModal.bind(this)} editParm={this.state.editParm} isEdit={this.state.isEdit}/>
            </div>
        )
    }
}
const UserManage1 = Form.create()(UserManage);
export default UserManage1;