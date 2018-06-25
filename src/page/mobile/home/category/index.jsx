import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { ListView, Flex, WhiteSpace, Tabs } from 'antd-mobile';
import Layout from "../../../../common/layout/layout.jsx";
import SearchNavBar from "../../../../components/search/index.jsx";
import homeApi from "../../../../api/home.jsx";
// import category_data from "../../../../static/mockdata/category.js";
import {getServerIp} from "../../../../config.jsx";   //mock假数据
import "./index.less";
/**
 * @ListView 使用了一些react-native中ListView的API，可以查询 https://mobile.ant.design/components/list-view-cn/
 * @ListView.dataSource 同上，查询 https://reactnative.cn/docs/0.26/listviewdatasource.html
 */
var page = 1;
var hasMore = false;
var categoryId = 0;

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            categoryData: [],

            dataSource,
            value: '',
            isLoading: true,
            ascChoose: true,
            tabIndex: 0,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }


    componentWillMount() {
        if (!this.props.location.categoryId) {
            categoryId = localStorage.getItem("categoryId");
        } else {
            categoryId = this.props.location.categoryId;
            localStorage.setItem("categoryId", this.props.location.categoryId);
            localStorage.setItem("categoryName", this.props.location.category);
        }

        this.requestCategoryList(categoryId, 1, 10, 0);

        console.log("this.props.location.categoryId", this.props.location.categoryId);
    }

    requestCategoryList(categoryId, page, rows, condition) {
        homeApi.getCategoryList(categoryId, page, rows, condition, (rs)=>{
            if (rs && rs.success) {
                const data = rs.obj.rows;

                this.setState({
                    categoryData: data,
                });
            }
        });
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        //fixed id length bug
        sectionIDs = [];
        rowIDs = [];
        pageIndex = 0;
        dataBlobs = {};

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        //console.log(dataBlobs)
        }, 600);
        //console.log(dataBlobs)
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (!this.state.isLoading && !hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    };

    onTabsChange(tab, index) {
        this.setState({
            isLoading: false,
            tabIndex: index
        });
        const type = this.checkType(index);
        this.requestCategoryList(categoryId, 1, 10, type);
        // 模拟ajax异步获取数据
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 300);
    }

    checkType(index) {
        switch(index) {
            case 0: return 0;
            case 1: return 3;
            case 2: return 1;
        }
    }


    render() {
        const tabs = [
            { title: '综合排序', sub: 'default' },
            { title: <Flex>
                    <Flex.Item style={{flex:'0 0 80%', textAlign:'center'}}>
                        按价格排序
                    </Flex.Item>
                    <Flex.Item style={{marginLeft: -1, flex:'0 0 30%'}}>
                        <div onClick={() => {
                            this.state.ascChoose = true;
                            this.setState({ascChoose: this.state.ascChoose});
                            this.requestCategoryList(categoryId, 1, 10, 3);
                            console.log("升序")}}>
                            <img src={this.state.ascChoose ? "./images/icons/升序-选中.png" : "./images/icons/升序.png"} style={{width:'50%'}}/>
                        </div>
                        <div onClick={() => {
                            this.state.ascChoose = false;
                            this.setState({ascChoose: this.state.ascChoose});
                            this.requestCategoryList(categoryId, 1, 10, 2);
                            console.log("降序")}}>
                            <img src={this.state.ascChoose ? "./images/icons/降序.png" : "./images/icons/降序-选中.png"} style={{width:'50%'}}/>
                        </div>
                    </Flex.Item>

                </Flex>,
                sub: 'price' },
            { title: '按销量排序', sub: 'comments' },
        ];

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    // height: 8,
                    borderTop: '1px dashed #ECECED',
                    borderBottom: '1px dashed #ECECED',
                }}
            />
        );
        // const data = category_data;
        const data = this.state.categoryData;

        // console.log("this.state.categoryData", this.state.categoryData);
        // console.log("category", category);

        // if (!category || category.length === 0) {
        //     return <Layout header={false} footer={true}>
        //
        //         <SearchNavBar/>
        //         <WhiteSpace size="xs"/>
        //
        //         <div style={{borderBottom: '1px solid green', backgroundColor:'white', color:'green', fontSize:'bold'}}>
        //             <Flex>
        //                 <Flex.Item style={{flex: '0 0 4%', marginRight:'0.4rem'}}>
        //                     <img src='./images/category/菜篮子.png'
        //                          style={{width:'90%', margin:'0.4rem'}}/>
        //                 </Flex.Item>
        //                 <Flex.Item>{this.props.location.category}</Flex.Item>
        //             </Flex>
        //         </div>
        //
        //
        //         <div style={{textAlign: 'center'}}>
        //             哎呀，这个分区没有数据
        //         </div>
        //     </Layout>
        // }


        let index = data.length - 1;
        const row = (rowdata, sectionID, rowID) => {
            if (index < 0) {
                // index = data.length - 1; //这是使它循环的原因
                hasMore = false;
                return null
            }
            const obj = data[index--];
            console.log("obj", obj);
            // return (
            //     <div key={rowID} style={{ padding: '0 15px' }}>
            //         <Link to={{pathname: '/product'}}>
            //             <div style={{ display: 'flex', padding: '15px 0' }}>
            //                 <img style={{ height: '64px', marginRight: '15px' }} src={obj.img_url}/>
            //                 <div style={{ lineHeight: 1 , color:'black', fontSize:'0.4rem'}}>
            //                     <div style={{marginBottom: 10}}>{obj.name}</div>
            //                     <div style={{marginBottom: 10}}>优惠价格：<span style={{color:'red'}}>￥{obj.price}元</span></div>
            //                     <div style={{marginBottom: 10}}>商品规格：<span style={{color:'red'}}>{obj.specification}</span></div>
            //                     <div>销量：<span style={{color:'red'}}>{obj.sales_count}</span></div>
            //                 </div>
            //             </div>
            //         </Link>
            //     </div>
            // );
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <Link to={{pathname: `/product/${obj.specialty.id}`}}>
                        <div style={{ display: 'flex', padding: '15px 0' }}>
                            <img style={{ height: '4rem', width:'25%', marginRight: '2rem' }} src={"http://" + getServerIp() + obj.iconURL.sourcePath}/>
                            <div style={{ lineHeight: 1 , color:'black'}}>
                                <div style={{marginBottom: 10}}>{obj.specialty.name}</div>
                                <div style={{marginBottom: 10}}>优惠价格：<span style={{color:'darkorange'}}>￥{obj.pPrice}元</span></div>
                                <div style={{marginBottom: 10}}>商品规格：<span style={{color:'darkorange'}}>{obj.specification.specification}</span></div>
                                <div>销量：<span style={{color:'darkorange'}}>{obj.specification.hasSold}</span></div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        };

        return <Layout header={true} footer={true}>

            {/* <SearchNavBar/> */}
            <WhiteSpace size="xs"/>



            <div style={{borderBottom: '1px solid green', backgroundColor:'white', color:'green', fontSize:'bold', marginTop:'3.125rem'}}>
                <Flex>
                    <Flex.Item style={{flex: '0 0 4%', marginRight:'0.4rem'}}>
                        <img src='./images/category/菜篮子.png'
                             style={{width:'90%', margin:'0.4rem'}}/>
                    </Flex.Item>
                    <Flex.Item>{(!this.props.location.category) ? localStorage.getItem("categoryName") : this.props.location.category}</Flex.Item>
                </Flex>
            </div>

            <div className="search_container">
                <Tabs tabs={tabs}
                      onChange={this.onTabsChange.bind(this)}
                      initialPage={this.state.tabIndex}
                      useOnPan={false}
                    // className="search_tabs"
                >
                </Tabs>
            </div>

            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={10}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        </Layout>
    }     
}

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}



const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

let dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

Category.contextTypes = {
    router: PropTypes.object.isRequired
};
