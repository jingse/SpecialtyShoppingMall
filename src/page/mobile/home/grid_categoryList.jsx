import React from 'react';
import {Link} from 'react-router-dom';
import { WhiteSpace, Flex } from 'antd-mobile';
import Separator from "./separator.jsx";
// import category_list from "../../../static/mockdata/category_list.js";
import {getServerIp} from "../../../config.jsx";
import homeApi from "../../../api/home.jsx";

export default class CategoryGrid extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.requestTopNOfCategory(this.props.categoryId);
    }


    requestTopNOfCategory(categoryId) {
        // params: categoryId  size
        homeApi.getTopNOfCategory(categoryId, 6, (rs) => {
            // console.log(rs);
            if (rs && rs.success) {
                const grid = rs.obj;
                this.setState({
                    data: grid
                });
                // console.log("gridCategory", gridCategory);
            }
        });

    }

    // requestData() {
    //     // 通过API获取首页配置文件数据
    //     // 模拟ajax异步获取数据
    //     setTimeout(() => {
    //         const type = this.props.type;
    //         const data = category_list[type];     //mock data
    //         this.setState({
    //             data: data,
    //         });
    //     }, 100);
    // }

    render(){

        let categoryData = this.props.categoryData;
        if (!categoryData || JSON.stringify(categoryData) === "{}") {
            return null
        }

        let topOfCategory = this.state.data;
        if (!topOfCategory || JSON.stringify(topOfCategory) === "{}") {
            return null;
        }

        // const content = this.state.data && this.state.data.map((item, index) => {
        const content = topOfCategory && topOfCategory.map((item, index) => {

            // return <Flex.Item  key={index} className="product_card"
            //                    style={{marginBottom:'0.8rem', flex:'0 0 47%', marginLeft:'1.5%', marginRight:'1.5%'}}>
            //         <Link to='/product/1'>
            //             <div><img src={item.cover_img} style={{width:'100%'}}/></div>
            //             <WhiteSpace/>
            //             <div className="product_name">{item.name}</div>
            //             <WhiteSpace/>
            //             <div className="product_amount">{item.specification}</div>
            //             <WhiteSpace/>
            //             <div className="product_price">￥{item.price}元起</div>
            //             <WhiteSpace/>
            //         </Link>
            //     </Flex.Item>

            return <Flex.Item  key={index} className="product_card"
                               style={{marginBottom:'0.8rem', flex:'0 0 47%', marginLeft:'1.5%', marginRight:'1.5%'}}>
                {/*<Link to={{pathname:"/product", state: item.specialty.id }}>*/}
                <Link to={`/product/${item.specialty.id}`}>
                    <div><img src={"http://" + getServerIp() + item.iconURL.sourcePath} style={{width:'100%', height: '10rem'}}/></div>
                    <WhiteSpace/>
                    <div className="product_name">{item.specialty.name}</div>
                    <WhiteSpace/>
                    <div className="product_amount">{item.specification.specification}</div>
                    <WhiteSpace/>
                    <div className="product_price">￥{item.pPrice}元 起</div>
                    <WhiteSpace size='xs'/>
                </Link>
            </Flex.Item>

        });


        return <div>

            <Separator separatorData={categoryData} categoryData={this.props.categoryId}/>

            <Flex style={{flexWrap:'wrap'}}>
                {content}
            </Flex>

        </div>
    }
}
