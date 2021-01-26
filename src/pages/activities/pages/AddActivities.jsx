
import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Divider, message } from 'antd'

// 引入上传图片的组件
import UploadImg from "../../../components/UploadImg";
// 引入tag选择
import ActivitiesTag from '../../../components/z-tag'
// 引入富文本编辑器
import RichTextEdit from "../../../components/rich-text-editor"

// 引入ajax请求
import { getActivitiesBus, getActivitiesAddress, getActivitiesObject,addActivities } from "../../../api/activitiesApi"
import { getUser } from "../../../api/adminApi"
// 引入moment
import Moment from "moment";
const { Option } = Select;
export default class AddActivities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities_address:[],//活动获取的地址
            activities_object_name:[],//招生对象
            activities_bus_day:[],//获取营期
            activities_tag:[],  // 活动标签
             // 图片
             imageUrl: '', // 资源封面
             focusImgUrl: '', // 轮播图封面

        }
        this.activities_intr_ref=React.createRef()//活动介绍
        this.activities_plan_ref=React.createRef()//活动安排
        this.activities_date_ref=React.createRef()//日期
        this.activities_notice_ref=React.createRef()//活动须知

    }


    onFinish = (values) => {
        let{imageUrl,focusImgUrl,activities_address,activities_object_name,activities_bus_day}=this.state
        // 处理时间
        let activities_time=Moment(values.activities_time).format('YYYY-MM-DD HH:mm:ss')
        // 处理富文本
         let activities_intr_ref=this.activities_intr_ref.current.getContent(); //  活动介绍
         let activities_plan_ref=this.activities_plan_ref.current.getContent(); //  行程安排
         let activities_date_ref=this.activities_date_ref.current.getContent(); //  开营日期
         let activities_notice_ref=this.activities_notice_ref.current.getContent(); //  报名须知
        // 处理标签
        let activities_tags=this.state.activities_tag.join(",")
        // 发起ajax请求
      
        addActivities(getUser().token,values.activities_name,activities_time,imageUrl, values.activities_price,
        activities_tags,values.activities_address_id,values.activities_object_id,values.activities_bus_day_id,activities_intr_ref, activities_plan_ref,activities_date_ref,activities_notice_ref,focusImgUrl).then(res=>{
            if(res.status===1){
                message.success(res.msg)
                this.props.history.goBack()
            }
        }).catch(err=>{
            message.error(res.msg)
        })

    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    render() {
        let{activities_address,activities_object_name,activities_bus_day}=this.state
        return (
            <Card title="添加活动" className='lives-card' >
                <Form name="control-hooks" onFinish={this.onFinish} labelCol={{ span: 2 }} wrapperCol={{ span: 14 }}>
                    <Form.Item name="activities_name" label="活动标题：" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="activities_time" label="活动日期：" rules={[{ required: true, message: '请输入直播课作者!' }]}>
                        <DatePicker onChange={this.onChange} placeholder="请输入日期" />
                    </Form.Item>
                    <Form.Item name="activities_price" label="活动价格：" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="activities_address_id" label="活动地点：" rules={[{ required: true }]}>
                        <Select
                            placeholder="请选择活动地点"
                            allowClear
                        >
                            {
                                activities_address.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.activities_address}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="activities_object_id" label="招生对象：" rules={[{ required: true }]}>
                        <Select
                            placeholder="请选择招生对象"
                            allowClear
                        >
                           {
                                 activities_object_name.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item. activities_object_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="activities_bus_day_id" label="选择营期：" rules={[{ required: true }]}>
                        <Select
                            placeholder="请选择营期"
                            allowClear
                        >
                          {
                                activities_bus_day.map(item=>{
                                    return(
                                        <Option value={item.id} key={item.id}>{item.activities_bus_day}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="activities_tag" label="添加活动标签：">
                        <ActivitiesTag tagsCallBack={(tags) => {
                            this.setState({
                                activities_tag:tags
                            })
                        }} />
                    </Form.Item>
                  
                    <Form.Item
                        label="活动封面图"
                        name="activities_img"
                    >
                          <UploadImg
                            // upLoadBtnTitle={"上传活动封面"}
                            upLoadName={"activities_img"}
                            upLoadAction={"/api/auth/activities/upload_activities"}
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
                            // upLoadBtnTitle={"上传首页轮播图"}
                            upLoadName={"activities_img"}
                            upLoadAction={"/api/auth/activities/upload_activities"}
                            successCallBack={(name)=>{
                                message.success("直播课程封面上传成功")
                                this.setState({
                                    focusImgUrl:name
                                })
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        // upLoadBtnTitle="活动介绍"
                        name="activities_intro"
                        wrapperCol={{ span: 20 }}
                    >
                        <RichTextEdit
                         ref={this.activities_intr_ref} 
                         upLoadName={"activities_img"}
                         upLoadAction={'/api/auth/activities/upload_activities'}
                         htmlContent={this.state.activities_intr}
                        />
                    </Form.Item>
                    <Form.Item
                        label="行程安排"
                        name="activities_trip"
                        wrapperCol={{ span: 20 }}
                    >
                        <RichTextEdit 
                        ref={this.activities_plan_ref} 
                        upLoadName={"activities_img"}
                         upLoadAction={'/api/auth/activities/upload_activities'}
                         htmlContent={this.state.activities_plan}/>
                    </Form.Item>
                    <Form.Item
                        label="开营日期"
                        name="activities_days"
                        wrapperCol={{ span: 20 }}
                    >
                        <RichTextEdit 
                        ref={this.activities_date_ref}
                         upLoadName={"activities_img"}
                         upLoadAction={'/api/auth/activities/upload_activities'}
                         htmlContent={this.state.activities_date} />
                    </Form.Item>
                    <Form.Item
                        label="报名须知"
                        name="activities_notice"
                        wrapperCol={{ span: 20 }}
                    >
                        <RichTextEdit 
                        ref={this.activities_notice_ref} 
                        upLoadName={"activities_img"}
                         upLoadAction={'/api/auth/activities/upload_activities'}
                         htmlContent={this.state.activities_notice}/>
                    </Form.Item>


                    <Form.Item className="liveAdd-btn" >
                        <div>
                            <Button type="primary" htmlType="submit" >保存</Button>
                            <Divider type="vertical" />
                            <Button>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
    componentDidMount() {
        // 获取地址
        getActivitiesAddress().then(res=>{
            if(res.status===1){
                this.setState({
                    activities_address:res.data
                })
            }
        })
        // 获取招生对象
        getActivitiesObject().then(res=>{
            if(res.status===1){
                this.setState({
                    activities_object_name:res.data
                })
            }
        })
        // 获取 营期
        getActivitiesBus().then(res=>{
            this.setState({
                activities_bus_day:res.data
            })
        })
    }
}
