import React, { Component } from 'react'

// 引入容器组件
import Header from "./components/right-header"
import LeftNav from "./components/left-nav"
// 引入样式
import "./index.scss";

// 引入路由部分
import { Switch, Route, Redirect } from "react-router-dom";
// 引入路由组件
import Home from "../home";
import Lifejob from "../lifejob";
import Lives from "../lives";
import Activities from "../activities";
import Resource from "../resource";
import Setting from "../setting";
import NotFount from "../notFount";

// 引入ajax请求
import { isLogin} from "../../api/adminApi";


// 引入antd
import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default class Admin extends Component {
  
    render() {
        // 如果没有数据，代表被清了，或者没有登录
            if(!isLogin()){
                this.props.history.replace("/login")
            }
        return (
            
                <Layout className="layout_all">
                    {/* 导航栏组件 */}
                    <LeftNav>
                    </LeftNav>
                    {/* 右边部分 */}
                    <Layout>
                        {/* 顶部组件 */}
                        <Header></Header>
                        {/* 内容出口 */}
                        <Content className="content-main">
                             <Switch>
                                <Redirect exact path="/" exact to='/home'></Redirect>
                                <Route  path="/home" component={Home}></Route>
                                <Route  path="/resource" component={Resource}></Route>
                                <Route  path="/lifejob" component={Lifejob}></Route>
                                <Route  path="/activities" component={Activities}></Route>
                                <Route  path="/live" component={Lives}></Route>
                                <Route path="/setting" component={Setting}></Route>
                                <Route  path="*" component={ NotFount }></Route>
                            </Switch>
                        </Content>
                        {/* 底部内容 */}
                        <Footer>底部内容</Footer>
                    </Layout>
                </Layout>
           
        )
    }
}
