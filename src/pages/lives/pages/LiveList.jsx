import React, { Component } from 'react'
import {Card, Button, Table,Divider,Switch, message ,Modal,notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ajax请求
import { getLive ,setFocusLive,deleteLive} from "../../../api/liveApi";
// 获取图片默认地址
import config from "../../../config/config";
export default class LiveList extends Component {
    // 一开始获取数据
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            pageSize:5,
            totalSize:0,
            dataSource:[],//数据
        }
       
    }
    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center'},
        {title: '直播课标题', dataIndex: 'live_title', key: 'live_title',align: 'center'},
        {
            title: '直播课封面', dataIndex: 'live_img', key: 'live_img',align: 'center',
            render:text=>{
              return(
                <img src={config.BASE_URL+text} alt="图片" className='LiveList-table-img' />
              )
            }
           
        },
        {title: '开始时间', dataIndex: 'live_begin_time', key: 'live_begin_time',align: 'center'},
        {title: '直播课老师', dataIndex: 'live_author', key: 'live_author',align: 'center'},
        {title: '直播课价格', dataIndex: 'live_price', key: 'live_price',align: 'center'},
        // 焦点switch
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align: 'center',
            render:(text,record)=>{
                return(
                    <Switch checkedChildren="是"  unCheckedChildren="否" defaultChecked={record.is_focus===1} onChange={e=>this._onChange(e,record)}/>
                )
            }
         
        },
        {
            title: '操作', align: 'center',align: 'center',
            render:(text,record)=>{
                    return(
                     
                        <div>
                            <Button type='primary' onClick={()=>{
                                this.props.history.push({
                                    pathname:"/live/edit-live",
                                    state:record
                                })
                            }}>
                                编辑
                            </Button>
                            <Divider type="vertical" />
                            <Button  type='primary'danger onClick={()=>{
                                Modal.confirm({
                                    title:'删除',
                                    icon:<ExclamationCircleOutlined />,
                                    content:`确定要删除ID为${record.id}的这个数据嘛？`,
                                    onOk:()=> {
                                       console.log(record.id);
                                       deleteLive(record.id).then(res=>{
                                           if(res.status===1){
                                            message.success(res.msg)
                                           this. _getLive()
                                           }else{
                                            message.error("请检查网络连接")
                                           }
                                       })
                                      }
                                     

                                })
                            }}>
                                删除
                            </Button>

                        </div>
                    )
            }
          
        }
    ];
    // 列表焦点图按钮的方法
    _onChange(checked,record){
        setFocusLive(record.id,checked?1:0).then(res=>{
            if(res.status===1){
                notification["success"]({
                    message:`课程:${record.live_title}`,
                    description:`${checked ? "设置为":"取消"}焦点课程`,
                    duration:2
                })
            }else{
                message.error("请检查网络连接")
            }
        })
    }
    // 发ajax请求
    _getLive(pageNum=1,pageSize=5){
        this.setState({
            isLoading:true
        })
        getLive(pageNum,pageSize).then(res=>{
            console.log(res);
            if(res.status===1){
               this.setState({
                dataSource:res.data.live_list,
                isLoading:false,
                totalSize:res.data.live_count
               })
            }
            // this.dataSource=res.data
        })
    }
    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push('/live/add-live');
            }}>
                添加直播课
            </Button>
        );

        return (
            <Card title={"直播课列表"} extra={addBtn}>
                <Table
                  loading={this.state.isLoading}//加载效果
                    columns={this.columns}//列标题
                    rowKey={"id"}
                    dataSource={this.state.dataSource}//行数据
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize)=>{
                            this._getLive(pageNum, pageSize)
                        }
                    }}
                />
            </Card>
        )
    }
    componentDidMount(){
        let{pageNum,pageSize}=this.state
        this._getLive(pageNum,pageSize)
     }
}
