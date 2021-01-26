import React, { Component } from 'react'
import PropTypes from "prop-types"

// 引入ajax请求
import { getUser,changeAdminPwd,removeUser} from "../../../../api/adminApi";
// 引入antd
import { Modal, Form, Input, Button, Checkbox, message } from 'antd';

// 引入路由，将该组件变成路由组件
import { withRouter } from "react-router-dom";

 class editPwdPanel extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        hideFunc: PropTypes.func.isRequired
    }
    // 点击确定关闭对话框
      _handleOk = () => {
        this.props.hideFunc()
      };
    // 提交表单，点击button按钮触发
      onFinish = (values) => {
        console.log('Success:', values);
        if(values.oldpassword===values.newpassword){
                message.warning("新旧密码不能一样！！！")
                return
        }
        changeAdminPwd( getUser().token,values.oldpassword, values.newpassword).then(res=>{
            console.log(res);
            if(res.status===1){
                message.success(res.msg)
            }
            this._handleOk()
            removeUser()
            this.props.history.replace("/login")
        }).catch(err=>{
            message.err("请检查网络链接！")
        })
       
      };
    render() {
        return (
            <Modal title="修改密码" visible={this.props.visible} footer={null} keyboard maskClosable={false} onCancel={this._handleOk}>
                 <Form
                name="basic"
                onFinish={this.onFinish}
                >
                        <Form.Item
                            label="旧密码"
                            name="oldpassword"
                            rules={[{ required: true, message: '请输入旧密码' }]}
                        >
                            <Input.Password />
                        
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="newpassword"
                            rules={[{ required: true, message: '请输入新密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" >
                                  确定
                            </Button>
                        </Form.Item>
                </Form>
          </Modal>
        )
    }
}

export default withRouter(editPwdPanel)
