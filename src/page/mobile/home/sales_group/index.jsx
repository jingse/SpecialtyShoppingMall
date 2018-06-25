import React from "react";
import { Link } from "react-router-dom";
import { Flex, WhiteSpace } from "antd-mobile";
import Layout from "../../../../common/layout/layout.jsx";
import SearchNavBar from "../../../../components/search/index.jsx";
import Bottom from "../../../../components/bottom/index.jsx";
// import sales_group from "../../../../static/mockdata/sales_group.js"; //mock假数据
import homeApi from "../../../../api/home.jsx";
import {getServerIp} from "../../../../config.jsx";


export default class SalesGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
        };
    }

    componentWillMount() {
        this.requestGroupPromotionList();
        localStorage.setItem("categoryName", "组合优惠");
    }

    // componentDidMount() {
    //     this.requestData();
    // }

    requestGroupPromotionList() {
        homeApi.getGroupPromotionList((rs) => {
            if(rs && rs.success) {
                const proList = rs.obj;
                this.setState({
                    data: proList,
                    isLoading: false
                });
            }
        });
    }

    // requestData() {
    //     // 通过API获取首页配置文件数据
    //     // 模拟ajax异步获取数据
    //     setTimeout(() => {
    //         const data = sales_group.data;   //mock假数据
    //         this.setState({
    //             data: data,
    //             isLoading: false
    //         });
    //     }, 300);
    // }

    getSalesIconImg(salesImages) {
        var img = null;
        salesImages && salesImages.map((item, index) => {
            if (item.isTag) {
                img = item.mediumPath
            }
        });
        return img
    }

    getSalesContent(salesContent) {
        const sales = salesContent && salesContent.map((item, index) => {
            return "满" + item.fullFreeRequirement + "减" + item.fullFreeAmount
        });

        return sales
    }


    render() {

        // const content = this.state.data && this.state.data.map((item, index) => {
        //     return <Link to={`/home/sales_group/detail`} key={index}>
        //         <Flex style={{background:'#fff'}}>
        //             <Flex.Item style={{flex: '0 0 30%'}}>
        //                 <img src={item.img_url} style={{width: '70%', margin:'0.4rem'}}/>
        //             </Flex.Item>
        //             <Flex.Item style={{flex: '0 0 60%', color:'black', fontSize:'0.3rem'}}>
        //                 <WhiteSpace/>
        //                 <div style={{marginBottom: 15, fontSize:'1rem', fontWeight:'bold'}}>{item.sales_title}</div>
        //                 <div style={{marginBottom: 10}}>
        //                     <span style={{color:'red', border:'1px solid darkorange', padding:'2px', marginRight:'0.5rem'}}>
        //                         {item.sales_tag}
        //                     </span>
        //                     {item.sales_content}
        //                 </div>
        //                 <Flex style={{marginBottom: 10}}>
        //                     <Flex.Item style={{flex:'0 0 30%'}}>
        //                         <span style={{color:'red', border:'1px solid darkorange', padding:'2px', marginRight:'0.5rem'}}>
        //                             时间
        //                         </span>
        //                     </Flex.Item>
        //                     <Flex.Item style={{flex:'0 0 70%'}}>
        //                         <div className="sales_time_text">{item.sales_start_time}</div>
        //                         <div className="sales_time_text">{item.sales_end_time}</div>
        //                     </Flex.Item>
        //                 </Flex>
        //                 <WhiteSpace/>
        //             </Flex.Item>
        //         </Flex>
        //         <WhiteSpace/>
        //     </Link>
        // });

        const content = this.state.data.rows && this.state.data.rows.map((item, index) => {
            return <Link to={{pathname: `/home/sales_group/detail`, state: item.id}} key={index}>
                <Flex style={{background:'#fff'}}>
                    <Flex.Item style={{flex: '0 0 30%'}}>
                        <img src={"http://" + getServerIp() + this.getSalesIconImg(item.pics)} style={{width: '70%', margin:'0.4rem'}}/>
                    </Flex.Item>
                    <Flex.Item style={{flex: '0 0 60%', color:'black'}}>
                        <WhiteSpace/>
                        <div style={{marginBottom: 15, fontSize:'1rem', fontWeight:'bold'}}>{item.name}</div>
                        <div style={{marginBottom: 10}}>
                            <span style={{color:'red', border:'1px solid darkorange', padding:'2px', marginRight:'0.5rem'}}>
                                {item.ruleType}
                            </span>
                            {this.getSalesContent(item.fullSubstracts)}
                        </div>
                        <Flex style={{marginBottom: 10}}>
                            <Flex.Item style={{flex:'0 0 30%'}}>
                                <span style={{color:'red', border:'1px solid darkorange', padding:'2px', marginRight:'0.5rem'}}>
                                    时间
                                </span>
                            </Flex.Item>
                            <Flex.Item style={{flex:'0 0 70%'}}>
                                <div className="sales_time_text">{new Date(item.startTime).toLocaleString()}</div>
                                <div className="sales_time_text">{new Date(item.endTime).toLocaleString()}</div>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace/>
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
            </Link>

        });


        return <Layout header={false} footer={true}>

            <SearchNavBar dest="/home"/>

            <div style={{borderBottom: '1px solid green', backgroundColor:'white', color:'green', fontSize:'bold', marginTop:'3.125rem'}}>
                <Flex>
                    <Flex.Item style={{flex: '0 0 4%', marginRight:'0.4rem'}}>
                        <img src='./images/category/菜篮子.png'
                             style={{width:'90%', margin:'0.4rem'}}/>
                    </Flex.Item>
                    <Flex.Item>{(!this.props.location.category) ? localStorage.getItem("categoryName") : this.props.location.category}</Flex.Item>
                </Flex>
            </div>


            <div style={{backgroundColor:'white', height:'3rem', borderBottom:'1px solid #eee'}}>
                <div className="order_button">
                    <WhiteSpace size='lg'/>
                    <a style={{marginLeft:'0.6rem'}}>满减</a>
                    <a style={{marginLeft:'0.6rem'}}>满赠</a>
                    <a style={{marginLeft:'0.6rem'}}>折扣</a>
                    {/*<img src="./images/icons/筛选.png" style={{width:'5%'}}/>*/}
                </div>
            </div>


            {content}


            <Bottom>我是有底线的</Bottom>
        </Layout>
    }
}