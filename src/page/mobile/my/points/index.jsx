import React from "react";
import {WingBlank, WhiteSpace, List} from "antd-mobile";
import Layout from "../../../../common/layout/layout.jsx";
import Navigation from "../../../../components/navigation/index.jsx";
import PropTypes from "prop-types";
// import myApi from "../../../../api/my.jsx";

const wechatId = localStorage.getItem("wechatId");

export default class MyPoints extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            points:0,
        }
    }

    componentWillMount() {
        this.requestInfo(wechatId);
    }

    requestInfo(wechatId) {
        // myApi.getInfo(wechatId, (rs) => {
        //     if (rs && rs.success) {
        //         console.log('rs',rs);
        //         const balance = rs.obj.totalbalance;
        //         if (balance) {
        //             // localStorage.setItem("balance", balance.toString());
        //             this.setState({balance:balance})
        //         }
        //     }
        // });
    }



    render() {
        return <Layout>

            <Navigation title="积分" left={true}/>

            <div style={{background: 'darkorange', color:'white', height:'8rem'}}>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>总积分：0</WingBlank>
                <WhiteSpace/>
                <WingBlank>可用积分：</WingBlank>
                <WingBlank style={{fontSize:'2rem', marginTop:'1rem'}}>
                    {this.state.points}
                </WingBlank>
            </div>

            <List>
                <List.Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {this.context.router.history.push('/my/points/exchange')}}
                    arrow="horizontal"
                >
                    兑换
                </List.Item>
            </List>

            <WhiteSpace/>
            <WhiteSpace/>

            <List>
                <List.Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {this.context.router.history.push('/my/points/records')}}
                >
                    积分记录
                </List.Item>

                {/*<List.Item*/}
                    {/*thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"*/}
                    {/*onClick={() => {this.context.router.history.push('/my/balance/purchase')}}*/}
                    {/*arrow="horizontal"*/}
                {/*>*/}
                    {/*我的购买*/}
                {/*</List.Item>*/}
            </List>


        </Layout>
    }

}

MyPoints.contextTypes = {
    router: PropTypes.object.isRequired
};