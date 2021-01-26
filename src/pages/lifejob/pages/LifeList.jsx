import React, { Component } from 'react'
import {Card, Button, Table,Divider,Switch, message ,Modal ,notification} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ajax请求
import { setFocusJob,getJobList,deleteJob} from "../../../api/lifejobApi";
// 获取图片默认地址
import config from "../../../config/config";
export default class LifeList extends Component {
    // 一开始获取数据
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            dataSource:[],//数据
            pageSize:5,
            pageNum:0,
            total:0,
        }
       
    }
    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center'},
        {title: '职场人生标题', dataIndex: 'job_name', key: 'live_title',align: 'center'},
        {
            title: '职场人生封面', dataIndex: 'job_img', key: 'live_img',align: 'center',
            render:text=>{
              return(
                <img src={config.BASE_URL+text} alt="图片" className='LiveList-table-img' />
              )
            }
           
        },
        {title: '所属作者', dataIndex: 'job_author', key: 'live_begin_time',align: 'center'},
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
                                    pathname:"/lifejob/edit-life",
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
                                       deleteJob(record.id).then(res=>{
                                           if(res.status===1){
                                               message.success(res.msg)
                                               this._getlistDate()
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
      console.log(checked,record);
      setFocusJob(record.id,checked?1:0).then(res=>{
          console.log(res);
        if(res.status===1){
            notification["success"]({
                message:`职场人生:这个我也不知道`,
                description:`${checked ? "设置为":"取消"}焦点课程`,
                duration:2
            })
        }else{
            message.error("请检查网络连接")
        }

      })
    }
      // 获取数据
      _getlistDate(pageNum,pageSize){
        this.setState({
            isLoading:true
        })
        getJobList(pageNum,pageSize).then(res=>{
            if(res.status===1){
                this.setState({
                    dataSource:res.data.job_list,
                    total:res.data.job_count,
                    isLoading:false
                })
            }
        })
    }
    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push('/lifejob/add-life');
            }}>
                添加职场人生
            </Button>
        );

        return (
            <Card title={"职场人生列表"} extra={addBtn}>
                <Table
                  loading={this.state.isLoading}//加载效果
                    columns={this.columns}//列标题
                    rowKey={"id"}
                    dataSource={this.state.dataSource}//行数据
                    pagination={{
                        total: this.state.total,
                        pageSize: 5,
                        onChange: (pageNum, pageSize)=>{
                          this._getlistDate(pageNum,pageSize)
                        }
                    }}
                />
            </Card>
        )
    }
    componentDidMount(){
        let{pageNum,pageSize}=this.state
        this._getlistDate(pageNum=1,pageSize)
     }
}
