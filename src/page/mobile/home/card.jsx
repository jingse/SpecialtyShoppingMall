import React from 'react';
//import {Link} from 'react-router-dom';
import {WhiteSpace, Card, Flex, WingBlank} from 'antd-mobile';

export default class InfoCard extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {

    }

    render(){
        let card = this.props.cardData;
        //console.log("card",card);
        if (!card || !card.weBusiness) {
            return null;
        }

        // console.log("card", this.props.cardData);

        return <Card className="info_card">
            <div className="card_div">
                <WingBlank>
                    <div className="title">土特产微商城</div>
                    <WhiteSpace/>

                    <Flex>
                        <Flex.Item className="info_contact">联系人：
                            {/*<span style={{fontWeight:'initial'}}>刘传昌</span>*/}
                            <span style={{fontWeight:'initial'}}>{this.props.cardData.weBusiness.name}</span>
                        </Flex.Item>
                        <Flex.Item className="info_name">手机：
                            {/*<span style={{color:'blue', fontWeight:'initial'}}>13681582884</span>*/}
                            <a href={"tel:" + this.props.cardData.weBusiness.mobile}
                               style={{color:'blue', fontWeight:'initial'}}>
                                {this.props.cardData.weBusiness.mobile}
                            </a>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>

                    {/*<Flex>*/}
                        {/*<Flex.Item className="info_name">座机：*/}
                            {/*<a href={"tel:" + this.props.cardData.weBusiness.mobile}*/}
                               {/*style={{color:'blue', fontWeight:'initial'}}>*/}
                                {/*{this.props.cardData.weBusiness.mobile}*/}
                            {/*</a>*/}
                            {/*<span style={{color:'darkorange', fontWeight:'initial'}}>(点击号码直接拨号)</span>*/}
                        {/*</Flex.Item>*/}

                    {/*</Flex>*/}
                    {/*<WhiteSpace/>*/}

                    <Flex>
                        <Flex.Item className="info_name">地址：
                            {/*<span style={{fontWeight:'initial'}}>北京市海淀区西土城路10号</span>*/}
                            <span style={{fontWeight:'initial'}}>{this.props.cardData.weBusiness.address}</span>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>

                </WingBlank>
            </div>
        </Card>
    }
}
