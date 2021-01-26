import React, { Component } from 'react'
// 引入scss文件
import  "./index.scss";
// 引入组件
import ResourceList from "./pages/ResourceList";
import AddResource from "./pages/AddResource";
import EditResource from "./pages/EditResource";

// 引入路由
import { Route,Switch } from "react-router-dom";

export default class Resource extends Component {
    render() {
        return (
         <Switch>
             <Route exact path='/resource/add-resource' component={AddResource}></Route>
             <Route exact path='/resource/edit-resource' component={EditResource}></Route>
             <Route path='/resource' component={ResourceList}></Route>
         </Switch>
        )
    }
}
