import React, { Component } from 'react'
import {Card,  Form, Input, Button, Select ,DatePicker ,Divider,message} from 'antd'
// 引入上传图片的组件
import UploadImg from "../../../components/UploadImg";

// 引入ajax请求
import { getLivePerson,getLiveTheme,addLive } from "../../../api/liveApi"
import { getUser } from "../../../api/adminApi"

// 引入moment
import Moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
export default class LiveAdd extends Component {
    state={
        imageUrl:'' ,
        focusImgUlr:'',
        live_person:[],
        live_theme:[],
    }
    // 没用上,这是用来修改不同的时间………………………………………………………………………………………………………………
    dateFormat(dateData) {
        let date = new Date(dateData)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        const time = y + '-' + m + '-' + d
        return time
      }
    onFinish=async(values)=>{
        console.log(values);
        let{imageUrl,focusImgUlr}=this.state
        let live_begin_time = Moment(values.live_time[0]).format("YYYY-MM-DD HH:mm:ss")
            let live_end_time = Moment(values.live_time[1]).format("YYYY-MM-DD HH:mm:ss")
            console.log(live_begin_time,live_end_time);
            // 发起ajax请求
         
           let res=await addLive(getUser().token, values.live_title, values.live_url, values.live_author,imageUrl,live_begin_time,live_end_time,values.live_price,values.live_person_id, values.live_theme_id,focusImgUlr)
           if(res.status===1){
                    this.props.history.goBack();
           }
        }
  
    render() {
        return (
            <Card title="新增直播课"  className='lives-card' >

                    <Form  name="control-hooks" onFinish={this.onFinish} labelCol={{ span: 2 }} wrapperCol={{ span: 14}}>
                        <Form.Item name="live_title" label="直播课名称：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="live_author" label="直播课作者：" rules={[{ required: true  ,message: '请输入直播课作者!'}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="live_price" label="直播课价格：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="live_time" label="直播课时间：" rules={[{ required: true }]}>
                            <RangePicker />
                        </Form.Item>
                        <Form.Item name="live_person_id" label="适用人群：" rules={[{ required: true }]}>
                            <Select
                            placeholder="请输入适用人群"
                            allowClear
                            >
                                {
                                    this.state.live_person.map((item)=>{
                                        return(
                                            <Option value={item.id} key={item.id}>{item.live_person_name}</Option>
                                        )
                                    })
                                }
                          
                            </Select>
                        </Form.Item>
                        <Form.Item name="live_theme_id" label="内容主题：" rules={[{ required: true }]}>
                            <Select
                            placeholder="请输入内容主题"
                            allowClear
                            >
                              {
                                this.state.live_theme.map(item=>{
                                    return (
                                        <Option value={item.id} key={item.id}>{item.live_theme_title}</Option>
                                    )
                                })
                            }
                           
                            </Select>
                        </Form.Item>
                        <Form.Item name="live_url" label="直播课地址：" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="直播课封面图"
                        name="live_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name)=>{
                                message.success("直播课程封面上传成功")
                                this.setState({
                                    imageUrl:name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传轮播图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name)=>{
                                message.success("直播课焦点图上传成功")
                                this.setState({
                                    focusImgUlr:name
                                })
                            }}
                        />
                    </Form.Item>
                        <Form.Item  className="liveAdd-btn" >
                             <div>
                                     <Button type="primary" htmlType="submit" >保存</Button>
                                    <Divider type="vertical" />
                                    <Button 
                                    onClick={()=> {
                                        this.props.history.goBack();
                                    }}
                                    >取消</Button>
                          </div>
                        </Form.Item>
                        </Form>
            </Card>
        )
    }
    componentDidMount(){
        // 获取适用人群
        getLivePerson().then(res=>{
           if(res.status===1){
            this.setState({
                live_person:res.data
            })
           }
        })
        // 获取内容主题
        getLiveTheme().then(res=>{
            if(res.status===1){
                this.setState({
                    live_theme:res.data
                })
               }
        })
    }
}
