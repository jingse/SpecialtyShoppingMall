import React from "react";
import {List, WhiteSpace,DatePicker,Toast} from "antd-mobile";
import Layout from "../../../../common/layout/layout.jsx";
import Navigation from "../../../../components/navigation/index.jsx";
import PropTypes from "prop-types";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = new Date('1900/01/01');

export default class Setting extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            dateNow:now, //当前时间
            dateSet:null, //会员设置时间
        }
    }
    componentWillMount(){
        //获得会员地址and生日
        console.log(this.state.dateNow,nowTimeStamp)
    }


    render() {

        return <Layout>

            <Navigation title="设置" left={true}/>

            <WhiteSpace/>

            <List>
                <List.Item
                    // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {this.context.router.history.push('/my/setting/tel')}}
                >
                    修改绑定手机号
                </List.Item>

                <List.Item
                    // thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {this.context.router.history.push({pathname: '/address', state: {fromSet:'set'} })}}
                    arrow="horizontal"
                >
                    收货地址管理
                </List.Item>
                <DatePicker
                    disabled={(this.state.dateSet === null) ?false:true}
                    maxDate = {this.state.dateNow}
                    minDate = {minDate}
                    mode="date"
                    title="选择日期"
                    extra="未设置"
                    value={this.state.dateSet}
                    onChange={date => {
                        if(this.state.dateSet === null)
                            this.setState({ dateSet:date })
                        else
                            Toast.info('会员生日已经设置无法修改', 1);
                    }}
                >
                <List.Item arrow="horizontal" onClick={()=>{Toast.info('会员生日仅能设置一次', 2, null, false)}}>会员生日</List.Item>
                </DatePicker>

                <List.Item
                    onClick={() => {this.context.router.history.push('/my/setting/vipAddress')}}
                    arrow="horizontal"
                    extra="未设置"
                >
                    会员地址
                </List.Item>
            </List>

            <WhiteSpace/>
            <WhiteSpace/>

            <List>
                <List.Item
                    // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {this.context.router.history.push('/my/setting/points')}}
                >
                    积分规则
                </List.Item>

                <List.Item
                    // thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {this.context.router.history.push('/my/setting/member')}}
                    arrow="horizontal"
                >
                    会员规则
                </List.Item>
            </List>

            <WhiteSpace/>
            <WhiteSpace/>

            <List>
                <List.Item
                    // thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {this.context.router.history.push('/my/setting/help')}}
                    arrow="horizontal"
                    
                >
                    帮助
                </List.Item>
            </List>

        </Layout>

    }
}

Setting.contextTypes = {
    router: PropTypes.object.isRequired
};