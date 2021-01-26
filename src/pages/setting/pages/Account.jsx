import React from 'react'

// 引入模态对话框的组件
import EditPwdPanel from "./components/editPwdPanel";

// 引入ajax请求
import { getUser,changeAmdinMsg,saveUser} from "../../../api/adminApi";

// 引入scss文件
import "./account.scss"

// 引入antd
import { Card,Form, Input, Button,Upload, message  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// 引入图片的请求地址头
import config from "../../../config/config"

// 引入订阅
import PubSub from "pubsub-js";

//   上传图片前掉的钩子
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('上传的为文件必须是JPG或者PNG格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Account extends React.Component {
        state = {
            isModalVisible:false,//控制修改密码的模态框是否显示
            loading: false,//上传的状态
            account_icon:'',// 管理员的头像
            account:"", // 账户名
            account_name:"",// 昵称
            token:"", // 令牌
           
        };
        formRef = React.createRef();
        
        // 上传文件改变时的状态，如果正在上传，loading为真，也就是小圆圈转圈 那个icon  
        // 如果状态时done，表示图片上传完毕，我们得到服务器给的图片，调用getBase64函数，然后改变imageUrl和loading 的值
        handleChange = (info) => {
            if (info.file.status === 'uploading') {
              this.setState({ loading: true });
              return;
            }
            if (info.file.status === 'done') {
              // Get this url from response in real world.
              message.success("头像上传成功")
              let imgUrl = config.BASE_URL + info.file.response.data.name;
                //   将图片给state
                this.setState({
                    loading:false,
                    account_icon:imgUrl
                })
            }
          };
        // 点击（修改密码打开模态对话框）
        _showEditPwdPanel=(e)=>{
            e.preventDefault()
            this.setState({
                isModalVisible:true
            })
        }
        // 给EditPwdPanel组件传递一个方法
        _hideEditPwdPanel=()=>{
            this.setState({
                isModalVisible:false
            })
        }
        // 点击提交后，form表单给的数据
        _onFinish = (values) => {
            let{token,account_icon}=this.state
            // 发起ajax请求，修改信息
            // 此地的values.account_name，因为还没有存在state中，而其他的都已经一开始就被存入到state中
            changeAmdinMsg(token, values.account_name, account_icon).then(res=>{
                console.log(res);
                if(res.status===1){
                    // 保存用户信息
                    saveUser(res.data)
                    // 发布订阅
                    PubSub.publish("userChange")
                    message.success(res.msg)
                }else{
                    message.err(res.msg)
                }
            }).catch(err=>{
                message.err(err)
            })

          };
    render() {
          let { loading } = this.state;
            // 判断loading是否为真，然后里面显示的东西（组件内容）
          const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return (
            <Card title="管理员信息编辑"  className="card-main">
                     <Form  ref={this.formRef}  onFinish={this._onFinish} labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
                        <Form.Item name='account' label="账户名" >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item name='account_name' label="管理员名称" rules={[{ required: true, message: '请输入管理员名称！'  }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='account_icon' label="管理员头像">
                             <Upload
                                name="admin_avatar"
                                listType="picture-card"//上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
                                className="avatar-uploader"
                                showUploadList={false}//是否展示文件列表,
                                action="/api/auth/admin/upload_admin_icon"//上传的地址
                                beforeUpload={beforeUpload}//上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
                                onChange={this.handleChange}//上传文件改变时的状态
                            >
                                {this.state.account_icon ? <img src={this.state.account_icon} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item  >
                            <Button type="primary" htmlType="submit" className="button-change">
                              修改
                            </Button>
                            或者 <a  onClick={this._showEditPwdPanel}>修改密码?</a>
                        </Form.Item>
                        </Form>
                        <EditPwdPanel visible={this.state.isModalVisible} hideFunc={this._hideEditPwdPanel} ></EditPwdPanel>
            </Card>
        )
    }
    // 钩子函数，在render后调用，获取ajax数据，将数据放在state中
    componentDidMount(){
        this.setState({
            account:getUser().account,
            account_icon:getUser().account_icon,
            account_name:getUser().account_name,
            token:getUser().token,
            // 因为setState时异步处理，如果直接将数据放在form中的话
            // 会导致form表单中的数据都是旧数据，还是那些没有更新的数据，在这里是空
        },()=>{
            // 此时是setstate执行后再执行的地方
            let{ account, account_name}=this.state
            this.formRef.current.setFieldsValue({
                account,
                account_name
            })
        })
    }
}
