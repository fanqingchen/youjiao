import React from 'react'
import ReactEcharts from 'echarts-for-react'

import {getBuyCount} from '../../../../api/homeApi'

export default class SourceCount extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = ()=>{
        getBuyCount().then((result)=>{
             let tempData = [];
             if(result.status === 1){
                 for (let k in result.data){
                     tempData.push(result.data[k]);
                 }
                 // 更新状态机
                 this.setState({
                     data: tempData
                 });
             } 
          
         });
    };


    getOption = ()=>{
        let{data}=this.state
       return {
        title: {
            text: '各业务购买数量统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: [
                    {value: data[0], name: '幼教资源'},
                    {value: data[1], name: '职场人生'},
                    {value: data[2], name: '活动专区'},
                    {value: data[3], name: '直播课堂'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
       }
    };

    render() {
        return (
                <ReactEcharts option={this.getOption()}  />
        )
    }
}