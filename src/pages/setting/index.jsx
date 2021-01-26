import React, { Component } from 'react'

// 引入路由部分
import { Switch, Route,Redirect} from "react-router-dom";

// 引入组件部分
import Account from "./pages/Account";
import Member from "./pages/Member";


export default class Setting extends Component {
    render() {
        return (
            <Switch>
                    <Redirect path="/setting" exact to='/setting/account'></Redirect>
                    <Route path="/setting/account" component={Account}/>
                    <Route path="/setting/member" component={Member}/>
            </Switch>
        )
    }
}
