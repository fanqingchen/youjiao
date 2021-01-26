import React, { Component } from 'react'
import {Card } from 'antd'
import TopCard from "../components/top-card";
import SourceCount from "../components/main-echarts";
import BuyCount from "../components/secondary-echarts";


export default class HomeList extends Component {
    render() {
        return (
            <div className='homelist-admin'>
               <div className='card-top-three'>
                <TopCard
                 pathLink='/home/sitesetting'
                 iconClassName='icon iconfont icon-hezuohuobanmiyueguanli'
                 cardFirstTitle='网站设置'
                 cardSetTitle='客户端通用信息设置'
                 bgColor='red'
                />
                <TopCard
                  pathLink='/home/sitesetting'
                  iconClassName='icon iconfont icon-hezuohuobanmiyueguanli'
                  cardFirstTitle='管理员中心'
                  cardSetTitle='管理员管理'
                  bgColor='purple'/>
                <TopCard
                  pathLink='/home/sitesetting'
                  iconClassName='icon iconfont icon-hezuohuobanmiyueguanli'
                  cardFirstTitle='系统说明'
                  cardSetTitle='系统使用说明'
                  bgColor='orange'/>
               </div>
               {/* 图表 */}
               <div className='home-echarts-all'>
                <div className='home-echarts'>
                <Card title='各业务购买数量统计' className="home-echarts-card">
                    <SourceCount></SourceCount>
                 </Card>
                </div>
                <div className='home-echarts'>
                    <Card title='各业务购买数量统计'>
                         <BuyCount></BuyCount>
                    </Card>
                </div>
                </div>
            </div>
        )
    }
}
