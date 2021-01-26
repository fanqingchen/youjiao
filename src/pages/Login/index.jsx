import React, { Component } from 'react'
import  "./index.scss";
// 引入照片logo
import logo from './images/logo192.png'
// 引入antd
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//引入ajax请求
import { checkLogin,saveUser} from "../../api/adminApi";

export default class Login extends Component {
    
    render() {
        const onFinish = async(values) => {
            console.log('Received values of form: ', values);
           let res=await checkLogin(values.account,values.password)
            if(res&&res.status===1){
                message.success(res.msg)
                saveUser(res.data)
                // 跳转
                this.props.history.replace("/")
            }else if(res&&res.status===0){
                message.error(res.msg)
            }else{
                message.error("请求服务器失败~~~")
            }
          };
        return (
            <div className="card">
               
                     <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        >
                             <div className="img">
                                <img src={logo} alt=""/>
                            </div>
                                 <Form.Item
                                    name="account"
                                    rules={[ { required: true, message: '请输入用户名!' } ]}
                                 >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                                </Form.Item>

                                <Form.Item
                                name="password"
                                rules={[ { required: true, message: '请输入密码!' } ]}
                                >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" >
                                登录
                                </Button>
                           
                             </Form.Item>
                        </Form>
            </div >
        )
    }
}
