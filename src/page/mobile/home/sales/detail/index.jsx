import React from "react";
import { Link } from "react-router-dom";
import { Card, WhiteSpace, Flex } from "antd-mobile";
import Layout from "../../../../../common/layout/layout.jsx";
import SearchNavBar from "../../../../../components/search/index.jsx";
import "./index.less";
// import sales_detail from "../../../../../static/mockdata/sales_detail.js"; // mock假数据
import homeApi from "../../../../../api/home.jsx";
import {getServerIp} from "../../../../../config.jsx";

export default class SalesDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            salesDetail: [],
            isLoading: false,
        };
    }

    componentWillMount() {
        var promotionId = 0;

        if (!this.props.location.state) {
            promotionId = localStorage.getItem("promotionId");
        } else {
            promotionId = this.props.location.state;
            localStorage.setItem("promotionId", this.props.location.state);
        }

        this.requestOrdinaryPromotionDetail(promotionId);
    }

    requestOrdinaryPromotionDetail(promotionId) {
        homeApi.getOrdinaryPromotionDetail(promotionId, (rs) => {
            if(rs && rs.success) {
                const proDetail = rs.obj;
                this.setState({
                    salesDetail: proDetail,
                    isLoading: false
                });
            }
        });
    }

    getSalesDetailIcon(salesImages) {
        var img = null;
        salesImages && salesImages.map((item, index) => {
            if (item.isLogo) {
                img = item.mediumPath
            }
        });
        console.log("img", img);
        return img
    }

    // componentDidMount() {
    //     this.requestData();
    // }
    //
    // requestData() {
    //     // 通过API获取首页配置文件数据
    //     // 模拟ajax异步获取数据
    //     setTimeout(() => {
    //         const data = sales_detail;   //mock假数据
    //         this.setState({
    //             salesDetail: data,
    //             isLoading: false
    //         });
    //     }, 300);
    // }

    render() {

        // const content = this.state.salesDetail.data && this.state.salesDetail.data.map((item, index) => {
        //     return <Link to={`/product/${item.id}`} key={index}>
        //         <Flex style={{background:'#fff'}}>
        //             <Flex.Item style={{flex: '0 0 30%'}}>
        //                 <img src={item.img_url} style={{width: '70%', margin:'0.4rem'}}/>
        //             </Flex.Item>
        //             <Flex.Item style={{flex: '0 0 60%', color:'black', fontSize:'0.3rem'}}>
        //                 <WhiteSpace/>
        //                 <div style={{marginBottom: 10}}>{item.name}</div>
        //                 <div style={{marginBottom: 10}}>优惠价格：<span style={{color:'red'}}>￥{item.price}元</span></div>
        //                 <div style={{marginBottom: 10}}>商品规格：<span style={{color:'red'}}>{item.price}</span></div>
        //                 <div>销量：<span style={{color:'red'}}>{item.sales_count}</span></div>
        //                 <WhiteSpace/>
        //             </Flex.Item>
        //         </Flex>
        //         <WhiteSpace />
        //     </Link>
        // });
        // console.log("this.state.salesDetail.hySingleitemPromotions", this.state.salesDetail.hySingleitemPromotions);

        const content = this.state.salesDetail.hySingleitemPromotions && this.state.salesDetail.hySingleitemPromotions.map((item, index) => {
            return <Link to={{pathname: `/product/${item.specialtyId.id}`, isPromotion: true}} key={index}>
                <Flex style={{background:'#fff'}}>
                    <Flex.Item style={{flex: '0 0 30%'}}>
                        <img src={"http://" + getServerIp() + this.getSalesDetailIcon(item.specialtyId.images)} style={{width: '70%', height:'4rem', margin:'0.4rem'}}/>
                    </Flex.Item>
                    <Flex.Item style={{flex: '0 0 60%', color:'black'}}>
                        <WhiteSpace/>
                        <div style={{marginBottom: 10}}>{item.specialtyId.name}</div>
                        <div style={{marginBottom: 10}}>优惠价格：<span style={{color:'red'}}>￥{item.specificationId.platformPrice}元</span></div>
                        <div style={{marginBottom: 10}}>商品规格：<span style={{color:'red'}}>{item.specificationId.specification}</span></div>
                        <div>销量：<span style={{color:'red'}}>{item.specificationId.hasSold}</span></div>
                        <WhiteSpace/>
                    </Flex.Item>
                </Flex>
                <WhiteSpace />
            </Link>
        });

        // const salesContent = this.state.salesDetail.sales_content && this.state.salesDetail.sales_content.map((item, index) => {
        //     return <span key={index} className='tag' style={{marginRight:'0.5rem'}}>{item}</span>
        // });

        return <Layout header={false} footer={true}>

            <SearchNavBar/>

            {/*<img src={this.state.salesDetail.img_url} style={{width:'100%'}}/>*/}

            {/*<Card>*/}
                {/*<WingBlank style={{fontSize:'1rem', textAlign:'center', fontWeight:'bold', margin:'1rem'}}>*/}
                    {/*{this.state.salesDetail.sales_title}简介*/}
                {/*</WingBlank>*/}
                {/*<WingBlank className='sales_detail_line'>*/}
                    {/*<span className='tag'>时间</span>*/}
                    {/*<span style={{marginLeft:'0.5rem'}}>*/}
                        {/*{this.state.salesDetail.sales_start_time} - {this.state.salesDetail.sales_end_time}*/}
                    {/*</span>*/}
                {/*</WingBlank>*/}
                {/*<WingBlank className='sales_detail_line'>*/}
                    {/*<span className='tag' style={{marginRight:'0.5rem'}}>{this.state.salesDetail.sales_tag}</span>*/}
                    {/*{salesContent}*/}
                {/*</WingBlank>*/}
                {/*<WingBlank className='sales_detail_line'>*/}
                    {/*<span className='tag'>电子券</span>*/}
                {/*</WingBlank>*/}
            {/*</Card>*/}

            <Card>
                <div dangerouslySetInnerHTML={{ __html: this.state.salesDetail.introduction}} />
            </Card>

            <WhiteSpace/>

            {content}

        </Layout>
    }
}