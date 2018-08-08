import React from 'react';
import { WhiteSpace ,ActivityIndicator, Toast} from "antd-mobile";
import LoadingHoc from "../../../common/loading/loading-hoc.jsx";
import Layout from "../../../common/layout/layout.jsx";
import Bottom from "../../../components/bottom/index.jsx";
import Carousel from "./carousel.jsx";
import InfoCard from "./card.jsx";
import GridCategory from "./grid_category.jsx"
import Grid from "./grid_categoryList.jsx";
// import home_data from "../../../static/mockdata/home.js";   //mock假数据
import homeApi from "../../../api/home.jsx";
import './index.less';
import wxApi from "../../../api/wechat.jsx";
import locManager from "../../../common/LockManager.jsx";
import cartApi from "../../../api/cart.jsx";

const host = 'http://ymymmall.swczyc.com/';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            carousel: [],
            card: {},
            gridCategory: [],

            isLoading: false,
            animating:false
        };
    }

    componentWillMount() {
        // console.log('window.location',window.location)
        // window.location.href='www.baidu.com';
        this.setState({ animating: !this.state.animating });
        console.log("browser localStorage", localStorage.valueOf());

        // window.addEventListener("popstate", function(e) {
        //     //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        //     var ua = navigator.userAgent.toLowerCase();
        //     if(ua.match(/MicroMessenger/i)=="micromessenger") {
        //         localStorage.clear();
        //         WeixinJSBridge.call('closeWindow'); //微信
        //     }
        // }, false);


        const url = encodeURIComponent(window.location.href.split('#')[0]);
        wxApi.postJsApiData(url, (rs) => {
            
            const data = rs.result;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"]
            });
        });

        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=你自己的appid&redirect_uri=微信想要回调的你的页面&response_type=code&scope=snsapi_userinfo&state=xxx#wechat_redirect'
        const uid = locManager.getUId();
        const from_user = locManager.getFromUser();
        const myopenid = locManager.getMyOpenId();

        console.log("openid: ", myopenid);

        const mynickname = locManager.getMyNickname();
        var shareData = {   // 自定义分享数据
            title: '土特产微商城',
            desc: '来自'+locManager.getMyNickname()+'的分享',
            link: host + locManager.generateSaleLink()
        };
        if (uid) {          // 第一次扫码，url带uid字段，不带from_user
            console.log("uid存在");
            localStorage.setItem("uid", uid);
            console.log("myopenid", myopenid);
            homeApi.postOpenId(uid, mynickname, myopenid, (rs) => {
                console.log("提交openid给后台的结果：", rs);
                if (rs.msg && rs.msg !== "") {
                    // Toast.info(rs.msg);
                    console.log(rs.ms);
                }
                if(rs.obj !== null){
                    window.location.href = rs.obj;
                }
            });

        } else {            // 分享后的链接，url不带uid字段，带from_user
            console.log("uid不存在");
            homeApi.createAccount(mynickname, myopenid, (rs)=>{
                // localStorage.setItem("isWebusiness", 'false');
                // alert(rs);
            });
        }

        wx.ready(function(){
            wx.checkJsApi({
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"],
                success: function(res) {
                    console.log(res)
                }
            });
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
        });
        wx.error(function(res){
            console.log('wx.error');
            console.log(res);
        });

        setTimeout(() => {
            if(localStorage.getItem("firstLog") == "true"){

            }
            else
                localStorage.setItem("firstLog", 'false');
            this.checkLogin(uid);
            // this.requestMockData();
            // this.requestCarousel();
            // this.requestMerchantInfo(uid);
            // this.requestCategories();

        }, 1000);

        localStorage.removeItem("dest");
    }

    componentDidMount() {
        // this.checkLogin();  //拿到wechatId webusinessId
        this.closeTimer = setTimeout(() => {
            this.setState({ animating: !this.state.animating });
          }, 500);
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    getCartCount() {
        cartApi.getCartItemsList(localStorage.getItem("wechatId"), (rs) => {
            if (rs && rs.success) {
                const count = rs.obj.length;
                localStorage.setItem("cartCount", count);
            }
        });
    }

    checkLogin(uid) {
        
        let logtemp = localStorage.getItem("firstLog")
        console.log('logtemp',logtemp)
        if(logtemp == "false"){

        const uid = locManager.getUId();
        const myopenid = locManager.getMyOpenId();
        const wechatName = localStorage.getItem('nickname');

        console.log("login param uid", uid);
        console.log("login param openid", myopenid);
        console.log("login param wechatName", wechatName);


        // let leoopid = 'ocgJPv95RkAVveXrTmMWaxeN_wjA';
        // let uuuu = 26;
        // let leoname = 'Leo';
        // homeApi.loginCheck(leoopid, uuuu, leoname, (rs) => {
        homeApi.loginCheck(myopenid, uid, wechatName, (rs) => {
            if (rs && rs.success) {
                console.log("loginCheck rs:", rs);
                const wechatId = rs.obj.id;
                
                // const bindPhone = rs.obj.phone;
                const balance = rs.obj.totalbalance;
                const isVip = rs.obj.isVip;
                localStorage.setItem("wechatId", wechatId);
                if(rs.obj.isWeBusiness){
                    localStorage.setItem("isWebusiness", '1');
                }
                else{
                    localStorage.setItem("isWebusiness", '0');
                }
                if(rs.obj.phone) {
                    localStorage.setItem("bindPhone", rs.obj.phone);
                }
                localStorage.setItem("balance", balance);
                localStorage.setItem("isVip", isVip);
                this.requestCarousel();
                this.requestMerchantInfo(uid);
                this.requestCategories();
            }

            
        });
        localStorage.setItem("firstLog", 'true');


        // 为了测试使用
        // if (!localStorage.getItem("wechatId")) {
        //     localStorage.setItem("wechatId", "15");
        //     localStorage.setItem("uid",'26'); 
        //     localStorage.setItem("isWebusiness", "1");
        // }

        //拿到购物车的数量
        this.getCartCount();

        }
        else{
                this.requestCarousel();
                this.requestMerchantInfo(uid);
                this.requestCategories();
                this.getCartCount();

        }
        console.log("localStorage wechatId", localStorage.getItem("wechatId"));
        console.log("localStorage isWebusiness", localStorage.getItem("isWebusiness"));
        console.log("localStorage bindPhone", localStorage.getItem("bindPhone"));
    }

    // componentDidMount() {
    //     const uid = locManager.getUId();
    //     const from_user = locManager.getFromUser();
    //     const myopenid = locManager.getMyOpenId();
    //     const mynickname = locManager.getMyNickname();
    //     var shareData = {   // 自定义分享数据
    //         title: '土特产微商城',
    //         desc: '来自'+locManager.getMyNickname()+'的分享',
    //         link: host + locManager.generateSaleLink()
    //     };
    //     if (uid) {          // 第一次扫码，url带uid字段，不带from_user
    //         homeApi.postOpenId(uid, mynickname, myopenid, (rs)=>{
    //             alert(rs);
    //         });
    //     } else {            // 分享后的链接，url不带uid字段，带from_user
    //         homeApi.createAccount(mynickname, myopenid, (rs)=>{
    //             alert(rs);
    //         });
    //     }
    //     wx.ready(function(){
    //         wx.checkJsApi({
    //             jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"],
    //             success: function(res) {
    //                 console.log(res)
    //             }
    //         });
    //         wx.onMenuShareAppMessage(shareData);
    //         wx.onMenuShareTimeline(shareData);
    //     });
    //     wx.error(function(res){
    //         console.log('wx.error');
    //         console.log(res);
    //     });
    // }


    requestCarousel() {
        homeApi.getCarousel((rs) => {
            if(rs && rs.success) {
                const carousel = rs.obj;

                this.setState({
                    carousel,
                });
            }
        });
        //console.log("this.state.carousel: ", this.state.carousel);
    }

    requestMerchantInfo(merchantId) {
        homeApi.getMerchantInfo(merchantId, (rs) => {
            console.log('RS',rs);
            if (rs && rs.success) {
                const card = rs.obj;
                // let merchant = card;
                this.setState({
                    card
                }, ()=>{
                    console.log("this.state.card", this.state.card);
                    console.log("this.state.card.weBusiness.openid", this.state.card.weBusiness.openid);
                    console.log("localStorage.getItem(\"openid\")", localStorage.getItem("openid"));
                    console.log("二者相等？", this.state.card.weBusiness.openid === localStorage.getItem("openid"));

                    if (this.state.card.weBusiness.openid === localStorage.getItem("openid")){
                        console.log("isWebusiness设为1");
                        localStorage.setItem("isWebusiness", 1);
                    }
                    
                });
            }
        });
        console.log("requestMerchantInfo", this.state.card);
    }

    requestCategories() {
        homeApi.getCategories((rs) => {
            // this.checkLogin();//延迟重新登录
            // console.log(rs);
            if (rs && rs.success) {
                const gridCategory = rs.obj;
                this.setState({
                    gridCategory
                });
                // console.log("gridCategory", gridCategory);
            }
        });
    }


    render() {

        // if (!this.state.gridCategory || JSON.stringify(this.state.gridCategory) === '[]') {
        //     return null
        // }

        const category = this.state.gridCategory;
        const categories = category && category.map((item, index) => {
            return <Grid key={index} categoryId={item.id} categoryData={item.name} type="fruits"/>
        });

        return <Layout header={true} footer={true}>
            <Carousel carouselData={this.state.carousel} />
            <InfoCard cardData={this.state.card}/>
            <GridCategory gridData={this.state.gridCategory}/>
            <WhiteSpace size="lg"/>

            {categories}

            <WhiteSpace/>
            <Bottom>技术支持：矩江科技   旅行社信息化专家</Bottom>
            <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.animating}
              />
        </Layout>
    }
}

export default LoadingHoc(Home);


{/*<Separator separatorData="水果专区"/>*/}
{/*<Grid gridData={this.state.grid} categoryData={this.state.gridCategory} type="fruits"/>*/}

{/*<Separator separatorData="乳胶产品专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="玩具专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="饰品服饰专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="奢侈品专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="化妆品专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="日用品专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="保健品专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="食品酒水专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="箱包专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}

{/*<Separator separatorData="电器专区"/>*/}
{/*<Grid gridData={this.state.grid} type="emulsion"/>*/}


// requestMockData() {
//     // 通过API获取首页配置文件数据
//     // 模拟ajax异步获取数据
//     // setTimeout(() => {
//     const data = home_data.data.rows;   //mock假数据
//     let carousel = {},
//         card = {},
//         gridCategory = {},
//         grid = {},
//         separator = {};
//     if (data.length) {
//         for (let i in data) {
//             if (data[i].style_id === 'carousel_view') {
//                 carousel = data[i];
//             } else if (data[i].style_id === 'contact_info_view') {
//                 card = data[i]
//             } else if (data[i].style_id === 'grid_category_view') {
//                 gridCategory = data[i]
//             } else if (data[i].style_id === 'grid_view') {
//                 grid = data[i];
//             }
//             // else if (data[i].style_id === 'separator_view') {
//             //     separator = data[i];
//             // }
//         }
//     }
//     this.setState({
//         carousel,
//         card,
//         gridCategory,
//         grid,
//         separator,
//         isLoading: false
//     });
//     // }, 500);
// }