import React from 'react';
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";
import {WhiteSpace} from 'antd-mobile';

export default class Member extends React.Component {

    render() {
        return <Layout>

            <Navigation title="会员规则" left={true}/>

            <WhiteSpace/>

            <div className="help_message">

            </div>


        </Layout>
    }

}