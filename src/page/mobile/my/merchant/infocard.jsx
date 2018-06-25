import React from 'react';
import { Flex } from 'antd-mobile';
import Card from "../../../../components/card/index.jsx";
import './index.less';

const InfoCard = ({data, ...props}) => (
    <Card className="profitshare_infocard" {...props}>
        <Flex>
            <div style={{flex:'0 0 55%'}}>
                <div className="iconH iconH_inline icon_time" style={{marginRight:'10px'}}/>{new Date(data.time).toLocaleString()}
            </div>
            <div style={{flex:'0 0 45%'}}>
                <div className="iconH iconH_inline icon_usero" style={{marginRight:'10px'}}/>{data.user_name}
            </div>
        </Flex>{/*
        <Flex>
            <div style={{flex:'0 0 55%'}}>
                <div className="iconH iconH_inline icon_product" style={{marginRight:'10px'}}/>{data.product_name}
            </div>
            <div style={{flex:'0 0 45%'}}>
                <div className="iconH iconH_inline icon_shop" style={{marginRight:'10px'}}/>{data.shop_name}
            </div>
        </Flex>*/}
        <Flex>
            <div style={{flex:'0 0 55%'}}>
                <div className="iconH iconH_inline icon_coins" style={{marginRight:'10px'}}/>总价：￥{data.total_fee}
            </div>
            <div style={{flex:'0 0 45%'}}>
                <div className="iconH iconH_inline icon_sharemoney" style={{marginRight:'10px'}}/>分成：￥{data.share_fee}
            </div>
        </Flex>
    </Card>
);

export default InfoCard;
