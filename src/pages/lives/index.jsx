import React, { Component } from 'react'


// 引入scss文件
import  "./index.scss";
// 引入组件
import LiveList from "./pages/LiveList";
import LiveAdd from "./pages/LiveAdd";
import EditLive from "./pages/EditLive";

// 引入路由
import { Route,Switch } from "react-router-dom";

export default class Lives extends Component {
    render() {
        return (
         <Switch>
             <Route exact path='/live/add-live' component={LiveAdd}></Route>
             <Route exact path='/live/edit-live' component={EditLive}></Route>
             <Route path='/live' component={LiveList}></Route>
         </Switch>
        )
    }
}
