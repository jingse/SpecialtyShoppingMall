import React from 'react';
import {Link} from 'react-router-dom';
import {Flex, WhiteSpace} from "antd-mobile";
import recommend_data from '../../../static/mockdata/product_recommend.js'

export default class Recommend extends React.Component{

    constructor(props,context) {
        super(props,context);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        // 通过API获取首页配置文件数据
        // 模拟ajax异步获取数据
        setTimeout(() => {
            const data = recommend_data.data;   //mock假数据
            // const data = this.props.recommends;
            this.setState({
                data: data,
            });
        }, 500);
    }

    render() {
        const content = this.state.data && this.state.data.map((item, index) => {
            return <Flex.Item  key={index} className="product_card"
                               style={{marginBottom:'0.4rem', marginTop:'0.4rem', flex:'0 0 47%',
                                   marginLeft:'1.5%', marginRight:'1.5%'}}>
                <Link to='/product/1'>
                    <div><img src={item.cover_img} style={{width:'100%'}}/></div>
                    <WhiteSpace/>
                    <div className="product_name">{item.name}</div>
                    <WhiteSpace/>
                    <div className="product_price">￥{item.price}元起</div>
                    <WhiteSpace/>
                </Link>
            </Flex.Item>
        });

        return <div className="recommend">
            <div className="recommend_title">推荐产品</div>

            <WhiteSpace/>
            <Flex style={{flexWrap:'wrap', backgroundColor:'#eee'}}>
                {content}
            </Flex>
            <WhiteSpace />

        </div>
    }
}
