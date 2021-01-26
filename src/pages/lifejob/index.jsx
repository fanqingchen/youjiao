import React, { Component } from 'react'


// 引入scss文件
import  "./index.scss";
// 引入组件
import LifeList from "./pages/LifeList";
import LifeAdd from "./pages/LifeAdd";
import EditLife from "./pages/EditLife";

// 引入路由
import { Route,Switch } from "react-router-dom";

export default class Lifejob extends Component {
    render() {
        return (
         <Switch>
             <Route exact path='/lifejob/add-life' component={LifeAdd}></Route>
             <Route exact path='/lifejob/edit-life' component={EditLife}></Route>
             <Route path='/lifejob' component={LifeList}></Route>
         </Switch>
        )
    }
}
