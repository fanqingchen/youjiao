import React, { Component } from 'react'

import logo from './images/logo192.png'// 引入照片logo
import './index.scss'//它的css样式
import "./fonts/iconfont.css"//字体图标

// 引入列表数据
import menus from './config/menuConfig.json'

// 引入路由部分
import { Link,withRouter} from "react-router-dom";

// 引入ajax获取用户头像，信息
import { getUser } from "../../../../api/adminApi";

// 引入订阅
import PubSub from "pubsub-js";

// 引入antd
import { Layout ,Menu} from 'antd';
const {  Sider } = Layout;
const { SubMenu } = Menu;


 class LeftNav extends Component {
        constructor(props){
            super(props)
            this.state={
              menuList:menus,
              account_name:getUser().account_name,
              account_icon:getUser().account_icon,
              shuffling:false,//左右移动控制
            }
            
        }
       
        _renderMenu(menuList){
          return menuList.map((item)=>{
               if(!item.children){
                //  没有孩子，是item
                  return (<Menu.Item key={item._key} >
                      {/*  */}
                      <Link to={item._key}>
                        <span className={item.icon } style={{fontSize:!this.state.shuffling? '16px':'25px'}}></span>
                        <span>{this.state.shuffling?'':item.title}</span>
                      </Link>
                  </Menu.Item>)

               }else{
                //  是sub
                return(
                  <SubMenu key={item._key} 
                   title={
                    <span>
                       <span className={item.icon} style={{fontSize:!this.state.shuffling? '16px':'25px'}}> </span> 
                       <span>{this.state.shuffling?'':item.title}</span>
                    </span>
                     }>
                   {this. _renderMenu(item.children)}
                  </SubMenu>
                )
               

               }
          })
        }
      // 查找需要让哪个Submenu展开
    _getOpenKeys(menuList,path){
      for(let i=0; i<menuList.length; i++){
          let item = menuList[i]
          if(item.children && item.children.find(c_item=>c_item._key == path)){
              return item._key
          }
      }
  }
    render() {
      let {account_name,account_icon,menuList} = this.state;
      // 获取当前的路由
      let path = this.props.location.pathname; 
      let ppath = path.substr(0, path.indexOf("/",2)) ? path.substr(0, path.indexOf("/",2)) : path
      let openKeys = this._getOpenKeys(menuList,path)
      // 接收订阅
      PubSub.subscribe("handleshuffling",(_,{data})=>{
        console.log(data);
        this.setState({
          shuffling:data
        })
        console.log(this.state.shuffling);
      })
        return (
            <Sider collapsible collapsed={this.state.shuffling} className="sider-left">
                    <div className="sider-top" >
                        <div className="log">
                          <img src={account_icon?this.state.account_icon :logo} alt=""/>
                        </div>
                        <p>{this.state.account_name?account_name:'管理员'}</p>
                    </div>

                      <Menu
                       defaultSelectedKeys={[path]}  
                       selectedKeys={[path,ppath]}
                       defaultOpenKeys={openKeys}
                        mode="inline"
                        theme="dark"
                        // 此方法为菜单是否收起，要么折叠要么展开
                        >
                          {
                            this._renderMenu(this.state.menuList)
                          }
                        </Menu>
            </Sider>
        )
    }
    componentDidMount(){

      PubSub.subscribe("userChange",()=>{
        this.setState({
          account_name:getUser().account_name,
          account_icon:getUser().account_icon
        })
    })
  }
}
export default withRouter(LeftNav)
