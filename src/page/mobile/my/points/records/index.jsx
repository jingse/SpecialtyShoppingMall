import React from 'react';
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";
import {WhiteSpace, Flex, Card} from 'antd-mobile';

export default class ExchangeRecords extends React.Component {

    render() {
        return <Layout>

            <Navigation title="兑换记录" left={true}/>

            <WhiteSpace/>

            <Card>
                <Flex style={{textAlign:'center', background:'#F7F7F7'}}>
                    <Flex.Item style={{padding:'0.5rem'}}>日期</Flex.Item>
                    <Flex.Item>积分</Flex.Item>
                    <Flex.Item>详细说明</Flex.Item>
                </Flex>
                <WhiteSpace/>

                {/*{this.getRecordsContent()}*/}
            </Card>


        </Layout>
    }

}