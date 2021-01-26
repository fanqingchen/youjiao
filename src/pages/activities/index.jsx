import React, { Component } from 'react'

// 引入路由
import { Route,Switch } from "react-router-dom";
// 引入scss文件
import  "./index.scss";
// 引入组件
import ActivitieList from "./pages/ActivitieList";
import AddActivities from "./pages/AddActivities";
import EditActivities from "./pages/EditActivities";



export default class Activities extends Component {
    render() {
        return (
            <Switch>
            <Route exact path='/activities/add-activities' component={AddActivities}></Route>
            <Route exact path='/activities/edit-activities' component={EditActivities}></Route>
            <Route path='/activities' component={ActivitieList}></Route>
        </Switch>
        )
    }
}
