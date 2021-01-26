import React, { Component } from 'react'

// 引入路由部分
import { Switch, Route} from "react-router-dom";

// 引入组件部分
import Admin from "./pages/Admin";
import Login from "./pages/Login";
// import NotFount from "./pages/notFount";




export default class App extends Component {
 
  render() {
    return (
              <Switch>
                    <Route exact path="/login" component={ Login }></Route>
                     <Route path="/" component={ Admin }></Route>
                     {/* <Route  path="*" component={ NotFount }></Route> */}
              </Switch>
    )
  }
  
}
