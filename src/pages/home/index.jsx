import React, { Component } from 'react'

import './index.scss'
// 引入路由
import { Route,Switch } from "react-router-dom";
// 引入组件
import HomeList from "./pages/HomeList";
import SiteSetting from "./pages/SiteSetting";

export default class Home extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/home/sitesetting' component={SiteSetting}></Route>
                <Route  path='/home' component={HomeList}></Route>
            </Switch>
        )
    }
}



