import React from "react";
import {List, WhiteSpace} from "antd-mobile";
import Layout from "../../../../common/layout/layout.jsx";
import Navigation from "../../../../components/navigation/index.jsx";
import PropTypes from "prop-types";


export default class Setting extends React.Component {

    constructor(props, context) {
        super(props, context);
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
                    onClick={() => {this.context.router.history.push('/address')}}
                    arrow="horizontal"
                >
                    收货地址管理
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