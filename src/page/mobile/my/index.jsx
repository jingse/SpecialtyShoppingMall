import React from 'react';
import { Link } from 'react-router-dom';
import Layout from "../../../common/layout/layout.jsx";
import Card from "../../../components/card/index.jsx";
// import Navigation from "../../../components/navigation/index.jsx"
import { Flex, WingBlank, WhiteSpace, Badge, List } from 'antd-mobile';
import './index.less';
import {wxconfig} from "../../../config.jsx";
import myApi from "../../../api/my.jsx";
import PropTypes from "prop-types";

const Item = List.Item;
const pageSize =10;
const wechatId = localStorage.getItem("wechatId");

export default class My extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            webusinessTotal: 0,
            webusinessDaily: 0,

            allCount: 0,
            payCount: 0,
            deliverCount: 0,
            receiveCount: 0,
            evaluateCount: 0,
            refundCount: 0,

            balance:0,
        };
    }

    componentWillMount() {
        this.nickname = localStorage.getItem("nickname");
        this.headimgurl = localStorage.getItem("headimgurl");

        this.requestInfo();

        this.requestOrderCounts();

        const isWebusiness = localStorage.getItem("isWebusiness");
        if (isWebusiness === "1") {
            const uid = localStorage.getItem("uid");
            this.requestData(uid);
        }

        myApi.getInfo(wechatId, (rs) => {
            if (rs && rs.success) {
                console.log('rs',rs)
                const balance = rs.obj.totalbalance;
                if (balance) {
                    // localStorage.setItem("balance", balance.toString());
                    this.setState({balance:balance})
                }
            }
        });

    }

    componentDidMount() {
        localStorage.removeItem("tab");
    }

    // 请求个人信息
    requestInfo() {
        myApi.getInfo(localStorage.getItem("wechatId"), (rs)=> {
            if (rs && rs.success) {
                console.log("rs", rs);
                this.setState({
                    userData: rs.obj,
                })
            }
        });
    }

    requestOrderCounts() {

        this.requestAllOrderCount();
        this.requestPayCount(localStorage.getItem("wechatId"));
        this.requestDeliverCount(localStorage.getItem("wechatId"));
        this.requestReceiveCount(localStorage.getItem("wechatId"));
        this.requestEvaluateCount(localStorage.getItem("wechatId"));
        this.requestRefundCount(localStorage.getItem("wechatId"));
    }

    requestAllOrderCount() {
        myApi.getAllOrderListByAccount(localStorage.getItem("wechatId"), 1, pageSize, (rs)=>{
            this.setState({
                allCount: rs.obj.total,
            }, ()=>{
                console.log("全部订单", this.state.allCount);
            });
        });
    }


    requestPayCount(wechatId) {
        myApi.getOrderListByAccount(wechatId, 0, 1, pageSize, (rs)=>{
            this.setState({
                payCount: rs.obj.total,
            });
        });
    }

    requestDeliverCount(wechatId) {
        myApi.getOrderListByAccount(wechatId, 1, 1, pageSize, (rs)=>{
            this.setState({
                deliverCount: this.state.deliverCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 2, 1, pageSize, (rs)=>{
            this.setState({
                deliverCount: this.state.deliverCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 3, 1, pageSize, (rs)=>{
            this.setState({
                deliverCount: this.state.deliverCount + rs.obj.total,
            });
        });
    }

    requestReceiveCount(wechatId) {
        myApi.getOrderListByAccount(wechatId, 4, 1, pageSize, (rs)=>{
            this.setState({
                receiveCount: rs.obj.total,
            });
        });
    }

    requestEvaluateCount(wechatId) {
        myApi.getOrderListByAccount(wechatId, 5, 1, pageSize, (rs)=>{
            rs.obj.rows && rs.obj.rows.map((item, index) => {
                if (!item.isAppraised) {
                    this.setState({
                        evaluateCount: this.state.evaluateCount + 1,
                    });
                }
            });
        });
        myApi.getOrderListByAccount(wechatId, 6, 1, pageSize, (rs)=>{
            rs.obj.rows && rs.obj.rows.map((item, index) => {
                if (!item.isAppraised) {
                    this.setState({
                        evaluateCount: this.state.evaluateCount + 1,
                    });
                }
            });
        });
    }

    requestRefundCount(wechatId) {
        myApi.getOrderListByAccount(wechatId, 8, 1, pageSize, (rs)=>{
            this.setState({
                refundCount: this.state.refundCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 9, 1, pageSize, (rs)=>{
            this.setState({
                refundCount: this.state.refundCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 10, 1, pageSize, (rs)=>{
            this.setState({
                refundCount: this.state.refundCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 11, 1, pageSize, (rs)=>{
            this.setState({
                refundCount: this.state.refundCount + rs.obj.total,
            });
        });
        myApi.getOrderListByAccount(wechatId, 12, 1, pageSize, (rs)=>{
            this.setState({
                refundCount: this.state.refundCount + rs.obj.total,
            });
        });
    }

    requestData(uid) {
        // myApi.getInfo(8, (rs)=>{
        //     const data = rs.obj;
        //     this.setState({
        //         userData: data
        //     });
        // });

        myApi.getTotalDivide(uid, (rs)=>{
            const data = rs.obj;
            this.setState({
                webusinessTotal: data
            });
        });

        myApi.getDailyDivide(uid, (rs)=>{
            const data = rs.obj;
            this.setState({
                webusinessDaily: data
            });
        });
    }


    checkWebusiness() {
        const isWebusiness = localStorage.getItem('isWebusiness');
         console.log("isWebusiness", isWebusiness);

        if (isWebusiness === '1') {
            return <Card>
                <div className="card_group">
                    <WingBlank>
                        <span>微商分成区</span>
                    </WingBlank>
                </div>
                <div className="card_group">
                    <Link to={{pathname:"/my/merchant", type:"daily", money: this.state.webusinessDaily}}>
                        <WingBlank>
                            <div className="iconH iconH_inline icon_pie" style={{marginRight:'10px'}}/>
                            <span style={{fontSize:"0.8rem"}}>日分成</span>
                            <span className="my_content_right">￥{JSON.stringify(this.state.webusinessDaily)}></span>
                        </WingBlank>
                    </Link>
                </div>
                <div className="card_group">
                    <Link to={{pathname:"/my/merchant", type:"total", money: this.state.webusinessTotal}}>
                        <WingBlank>
                            <div className="iconH iconH_inline icon_calendar" style={{marginRight:'10px'}}/>
                            <span style={{fontSize:"0.8rem"}}>总分成</span>
                            <span className="my_content_right">￥{JSON.stringify(this.state.webusinessTotal)} ></span>
                        </WingBlank>
                    </Link>
                </div>
                <div className="card_group">
                    <Link to={{pathname:"/my/merchant", type:"remain"}}>
                        <WingBlank>
                            <div className="iconH iconH_inline icon_await" style={{marginRight:'10px'}}/>
                            <span style={{fontSize:"0.8rem"}}>待分成</span>
                            <span className="my_content_right">2单 ></span>
                        </WingBlank>
                    </Link>
                </div>
            </Card>
        } else{
            return null
        }
    }

    checkPhone() {
        // console.log("my bindPhone", localStorage.getItem("bindPhone"));
        // console.log("typeof localStorage.bindPhone", typeof localStorage.getItem("bindPhone"));
        if (this.state.userData.phone || localStorage.getItem("bindPhone")) {
            return <div className="my_header_text">
                <img src="./images/icons/手机.png" style={{width:'5%'}}/>
                {(!this.state.userData.phone) ? localStorage.getItem("bindPhone") : this.state.userData.phone}
            </div>
        } else {
            return <Link to={{pathname:'/my/tel'}}>
                <div className="my_header_text">
                    <img src="./images/icons/手机.png" style={{width:'5%'}}/>
                    {/*{userData.phone ? userData.phone : '未绑定'}*/}
                    未绑定
                </div>
            </Link>
        }
    }


    render() {
        // const counts = coupon_data.counts;
        const userData = this.state.userData;

        // const merchant = () => {
        //     return <div className="card_group" style={{borderTop:'1px solid #eee'}}>
        //         <Link to='/my/merchant'>
        //             <WingBlank>
        //                 <span>微商分成</span>
        //                 <span className="my_content_right">></span>
        //             </WingBlank>
        //         </Link>
        //     </div>
        // };

        return <Layout footer={true}>

            {/*<Navigation title="个人中心" curPath='/my'/>*/}

            <div className="my_setting">
                <WingBlank>
                    <span className="my_font">我的</span>
                    <Link to='/my/setting'>
                        <span className="my_font" style={{float:'right'}}>设置</span>
                    </Link>
                </WingBlank>
            </div>

            <div className="my_header">
                <WhiteSpace/>
                <Flex>
                    <Flex.Item style={{flex:'0 0 20%'}}>
                        <img className="my_header_img" src={this.headimgurl ? this.headimgurl : "./images/zz_help_smile.png"} />
                        <img className="crown_img" src="./images/icons/皇冠.png" />
                    </Flex.Item>
                    <Flex.Item style={{flex:'0 0 80%'}}>
                        <div className="my_header_text">
                            {this.nickname ? this.nickname : <a href={wxconfig.redirectUri} style={{color:"#fff"}}>点击登录</a>}
                        </div>
                        {this.checkPhone()}
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
            </div>


            <Card>
                <div className="card_group">
                    <Link to={{pathname:'/my/order', state:0 }} >
                        <WingBlank>
                            <span>我的订单</span>
                            <span className="my_content_right">
                                全部订单
                                <Badge text={this.state.allCount} overflowCount={99} />
                                >
                            </span>
                        </WingBlank>
                    </Link>
                </div>
                <div className="card_group">
                    <WhiteSpace/>
                    <Flex>
                        <Flex.Item style={{marginLeft:'1rem'}}>
                            {/*badge={order_deliver.data.count}*/}
                            <Link to={{pathname:'/my/order', state:1 }}>
                                <WhiteSpace/>
                                <Badge text={this.state.payCount}>
                                    {/*<div className="div_order">*/}
                                        {/*<img src='./images/icons/待付款.png' style={{width:'35%', height:'1.5rem'}}/>*/}
                                        {/*<div className="to_be_value">待付款</div>*/}
                                    {/*</div>*/}
                                    <div className="iconH icon_pay"/>待付款
                                </Badge>
                            </Link>
                        </Flex.Item>
                        <Flex.Item style={{marginLeft:'1rem'}}>
                            {/*badge={order_deliver.data.count}*/}
                            <Link to={{pathname:'/my/order', state:2 }}>
                                <WhiteSpace/>
                                <Badge text={this.state.deliverCount}>
                                    {/*<div className="div_order">*/}
                                        {/*<img src='./images/icons/待发货.png' style={{width:'30%', height:'1.5rem'}}/>*/}
                                        {/*<div className="to_be_value">待发货</div>*/}
                                    {/*</div>*/}
                                    <div className="iconH icon_deliver"/>待发货
                                </Badge>
                            </Link>
                        </Flex.Item>
                        <Flex.Item style={{marginLeft:'1rem'}}>
                            {/*badge={order_receive.data.count}*/}
                            <Link to={{pathname:'/my/order', state:3 }}>
                                <WhiteSpace/>
                                <Badge text={this.state.receiveCount}>
                                {/*<div className="div_order">*/}
                                    {/*<img src='./images/icons/待收货.png' style={{width:'30%', height:'1.5rem'}}/>*/}
                                    {/*<div className="to_be_value">待收货</div>*/}
                                {/*</div>*/}
                                    <div className="iconH icon_receive"/>待收货
                                </Badge>
                            </Link>

                        </Flex.Item>
                        <Flex.Item style={{marginLeft:'1rem'}}>
                            {/*badge={order_evaluate.data.count}*/}
                            <Link to={{pathname:'/my/order', state:4 }}>
                                <WhiteSpace/>
                                <Badge text={this.state.evaluateCount}>
                                    {/*<div className="div_order">*/}
                                        {/*<img src='./images/icons/待评价.png' style={{width:'40%', height:'1.5rem'}}/>*/}
                                        {/*<div className="to_be_value">待评价</div>*/}
                                    {/*</div>*/}
                                    <div className="iconH icon_comment"/>待评价
                                </Badge>
                            </Link>
                        </Flex.Item>
                        <Flex.Item style={{marginLeft:'1rem'}}>
                            {/*badge={order_refund.data.count}*/}
                            <Link to={{pathname:'/my/order', state:5 }}>
                                <WhiteSpace/>
                                <Badge text={this.state.refundCount}>
                                    {/*<div className="div_order">*/}
                                        {/*<img src='./images/icons/退款.png' style={{width:'35%', height:'1.5rem'}}/>*/}
                                        {/*<div className="to_be_value">退款</div>*/}
                                    {/*</div>*/}
                                    <div className="iconH icon_refund"/>退款
                                </Badge>
                            </Link>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                    <WhiteSpace/>
                </div>
            </Card>

            {/*<Card>*/}
                {/*<div className="card_group">*/}
                    {/*<Link to='/my/coupon'>*/}
                        {/*<WingBlank>*/}
                            {/*<span>我的可用电子券<span style={{color:'red', marginLeft:'8px'}}>{counts}</span></span>*/}
                            {/*<span className="my_content_right">></span>*/}
                        {/*</WingBlank>*/}
                    {/*</Link>*/}
                {/*</div>*/}

                {/*{merchant()}*/}

            {/*</Card>*/}


            {/*<Card>*/}
                {/*<div className="card_group">*/}
                    {/*<Link to={{pathname:"/my/coupon"}}>*/}
                        {/*<WingBlank>*/}
                            {/*<span>我的优惠</span>*/}
                            {/*<span className="my_content_right">全部优惠券></span>*/}
                        {/*</WingBlank>*/}
                    {/*</Link>*/}
                {/*</div>*/}
                {/*<div className="card_group">*/}
                    {/*<Flex style={{textAlign:'center',height:'5rem'}}>*/}
                        {/*<Flex.Item><Link to={{pathname:"/my/coupon"}}>*/}
                            {/*<span style={{lineHeight:1, fontSize:"0.7rem"}}><div className="iconH icon_ticket"/>优惠券(6)</span>*/}
                        {/*</Link></Flex.Item>*/}
                        {/*<Flex.Item><Link to={{pathname:"/my/coupon"}}>*/}
                            {/*<span style={{lineHeight:1, fontSize:"0.7rem"}}><div className="iconH icon_ticket"/>未使用(3)</span>*/}
                        {/*</Link></Flex.Item>*/}
                        {/*<Flex.Item><Link to={{pathname:"/my/coupon"}}>*/}
                            {/*<span style={{lineHeight:1, fontSize:"0.7rem"}}><div className="iconH icon_ticket"/>已使用(1)</span>*/}
                        {/*</Link></Flex.Item>*/}
                        {/*<Flex.Item><Link to={{pathname:"/my/coupon"}}>*/}
                            {/*<span style={{lineHeight:1, fontSize:"0.7rem"}}><div className="iconH icon_ticket"/>已过期(2)</span>*/}
                        {/*</Link></Flex.Item>*/}
                    {/*</Flex>*/}
                {/*</div>*/}
            {/*</Card>*/}

            <Card>
                <List>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        extra={this.state.balance?this.state.balance:'0.00'}
                        onClick={() => {this.context.router.history.push('/my/balance')}}
                    >
                        余额
                    </Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        onClick={() => {this.context.router.history.push('/my/coupon/disposable')}}
                        arrow="horizontal"
                    >
                       一次性电子券
                    </Item>
                </List>
            </Card>

            {this.checkWebusiness()}

            {/*<Card>*/}
                {/*<div className="card_group">*/}
                    {/*<Link to='/my/help'>*/}
                        {/*<WingBlank>*/}
                            {/*<span>设置</span>*/}
                            {/*<span className="my_content_right">></span>*/}
                        {/*</WingBlank>*/}
                    {/*</Link>*/}
                {/*</div>*/}
            {/*</Card>*/}


        </Layout>
    }
}

My.contextTypes = {
    router: PropTypes.object.isRequired
};