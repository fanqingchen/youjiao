import React, { Component } from 'react'

// 引入该文件的css样式
import './index.scss';
// 引入路由api
import { withRouter } from "react-router-dom";

// 引入订阅，发布订阅
import PubSub from "pubsub-js";

// 发起ajax请求
import { checkLogOut,removeUser } from "../../../../api/adminApi";
// 引入antd
import { Layout ,Button ,Modal} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
const { Header} = Layout;
const { confirm } = Modal;

class RightHeader extends Component {
    state={
        collapsed:false
    }
    // 退出登录
    _checkLogOut=()=>{
        confirm({
            title:"警告",
            content:"确定要找事？",
            onOk:()=>{
                console.log('OK');
                checkLogOut();
                removeUser();
                this.props.history.replace("/login")
              }
        })
    }
    // 点击小图标进行左右移动
    _handleshuffling=()=>{
        let setcollapsed=!this.state.collapsed
        // 发布订阅
       this.setState({
           collapsed:setcollapsed
       },()=>{
           let{collapsed}=this.state
        PubSub.publish("handleshuffling",{data:collapsed})
       })
    }
    render() {
        return (
            <Header className="app-header">
               <div className="header-content">
                    <h1 className="left">
                        <i onClick={this._handleshuffling }> {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}</i>
                        后台管理系统
                    </h1>
                    <div className="right">
                        <i></i>
                        <span>小雨转大雨27~23°</span>
                        <Button  type='primary' danger onClick={this._checkLogOut}>退出登录</Button >
                    </div>
               </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)