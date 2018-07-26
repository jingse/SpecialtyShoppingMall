import React from "react";
import {Flex, Card, WhiteSpace} from "antd-mobile";
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";
import couponApi from "../../../../../api/coupon.jsx";

const wechatId = localStorage.getItem("wechatId");

export default class BalanceRecords extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            records: []
        };
    }

    componentWillMount() {
        this.requestBalanceRecords(wechatId, 1, 10);
    }

    requestBalanceRecords(wechatId, page, rows) {
        couponApi.getBalanceRecords(wechatId, page, rows, (rs) => {
            if (rs && rs.success) {
                const records = rs.obj.rows;

                this.setState({
                    records
                });
            }
        });
    }

    checkType(type) {
        switch(type) {
            case 1: return "线路赠送";
            case 2: return "销售奖励";
            case 3: return "商城销售";
            case 4: return "大客户购买";
            default: return "未知";
        }
    }

    getDate(date) {
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        return Y+M+D
    }

    render() {

        const content = this.state.records && this.state.records.map((item, index) => {
            return <Flex key={index} style={{textAlign:'center'}}>
                        <Flex.Item style={{padding:'0.5rem'}}>{this.getDate(new Date(item.useTime))}</Flex.Item>
                        <Flex.Item>{this.checkType(item.type)}</Flex.Item>
                        <Flex.Item>{item.useAmount}</Flex.Item>
                    </Flex>
        });

        return <Layout>

            <Navigation title="充值记录" left={true}/>

            <Card>
                <Flex style={{textAlign:'center', background:'#F7F7F7'}}>
                    <Flex.Item style={{padding:'0.5rem'}}>时间</Flex.Item>
                    <Flex.Item>电子券种类</Flex.Item>
                    <Flex.Item>电子券金额</Flex.Item>
                </Flex>
                <WhiteSpace/>

                {content}
            </Card>

        </Layout>
    }

}