import React from "react";
import {List} from "antd-mobile";
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";


export default class TelManage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {

        return <Layout>

            <Navigation title="手机管理" left={true}/>



        </Layout>

    }
}