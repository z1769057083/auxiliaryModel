import React,{Component} from 'react'
import {Form,Input,Select,Button} from 'antd'
import {connect} from 'react-redux'
const Option = Select.Option;
const FormItem = Form.Item;
class TagInfo extends Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <div className="title mb10">实体标签信息</div>
                <Form>
                    <FormItem
                        label="标签名称"
                    >
                        {getFieldDecorator('tagName',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="标签颜色"
                    >
                        {getFieldDecorator('tagColor',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        label="标签Tag"
                    >
                        {getFieldDecorator('tag',{initialValue:''})(
                            <Input style={{"width":'200px'}} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="mr10">新建</Button>
                        <Button type="primary mr10">保存</Button>
                        <Button>清空</Button>
                    </FormItem>
                </Form>
                <div className="mt10 title">关系标签信息</div>
                <div className="mt10">
                    <Input style={{width:'380px'}} placeholder="请输入关系标签类别，多个标签请用#号分隔" />
                    <Button type="primary ml10">新建</Button>
                    <Button type="primary ml10 mr10">保存</Button>
                    <Button>清空</Button>
                </div>


            </div>
        )
    }
}
function mapStateToProps(state){
    return{

    }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(TagInfo));