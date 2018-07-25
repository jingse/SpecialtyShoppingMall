import React from 'react';
import { InputItem, Flex, WhiteSpace, Button, Toast } from 'antd-mobile';
//import { Link } from 'react-router-dom';
import Card from "../../../../components/card/index.jsx";
import Layout from "../../../../common/layout/layout.jsx";
import Navigation from "../../../../components/navigation/index.jsx";
import myApi from "../../../../api/my.jsx";
import PropTypes from "prop-types";

const wechatId = localStorage.getItem("wechatId");


export default class TelBinding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //wechat_id: 1,
            phone: '',
            code: ''
        };
    }

    validatePhone() {
        const phone = this.state.phone.replace(/\s+/g,"");
        console.log("phone", phone);
        myApi.validatePhone(phone, (rs)=>{
            if(rs && rs.success) {
                Toast.info("发送成功，注意查收", 1);
                console.log(rs);
            }
        });
    }

    bindTel(wechatId, phone, code) {
        console.log("code", code);
        myApi.bindPhoneOrTel(wechatId, phone, code, (rs) =>{
            if (rs && rs.success) {
                console.log(rs);
                localStorage.setItem("bindPhone", this.state.phone.replace(/\s+/g,""));
                Toast.info(rs.msg, 1);
                // history.back();
            } else {
                Toast.info(rs.msg, 1);
            }
        });
        this.context.router.history.push('/my');
    }

    render(){
        return <Layout header={false} footer={false}>

            <Navigation title="绑定手机" left={true}/>
            <WhiteSpace/>

            {/*<Card>*/}
                {/*<InputItem placeholder="11位手机号" type = "phone">手机号</InputItem>*/}

                {/*<Flex>*/}
                    {/*<Flex.Item style={{flex:'0 0  70%'}}>*/}
                        {/*<InputItem type="number" placeholder="请填写获取的激活码">激活码</InputItem>*/}
                    {/*</Flex.Item>*/}
                    {/*<Flex.Item>*/}
                        {/*<Button type="primary" inline size="small" style={{ marginRight: '4px' }}>获取激活码</Button>*/}
                    {/*</Flex.Item>*/}
                {/*</Flex>*/}

            {/*</Card>*/}

            {/*<Button type="primary" style={{ marginLeft:'4px', marginRight: '4px' }}>绑定手机</Button>*/}

            <Card>
                <InputItem placeholder="11位手机号" type = "phone" onChange={(val)=>{this.setState({phone: val})}}>手机号</InputItem>

                <Flex>
                    <Flex.Item style={{flex:'0 0  70%'}}>
                        <InputItem type="number" placeholder="请填写获取的激活码" onChange={(val)=>{this.setState({code: val})}}>激活码</InputItem>
                    </Flex.Item>
                    <Flex.Item>
                        <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={this.validatePhone.bind(this)}>获取激活码</Button>
                    </Flex.Item>
                </Flex>

            </Card>

            <Button type="primary" style={{ marginLeft:'4px', marginRight: '4px' }}
                    onClick={() => {this.bindTel(wechatId, this.state.phone.replace(/\s+/g,""), this.state.code)}}>
                绑定手机
            </Button>

        </Layout>
    }
}

TelBinding.contextTypes = {
    router: PropTypes.object.isRequired
};
