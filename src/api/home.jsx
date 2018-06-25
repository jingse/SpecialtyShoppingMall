import {getServerHost} from '../config.jsx';
import http from '../common/http.jsx';

// let myOrigin = "10.8.219.22";

var api = {
    //----------------------------------login api-------------------------------------------

    postOpenId(uid, nickname, openid, callback) {
        let formdata = new FormData();
        formdata.append("uid", uid);
        formdata.append("wechatName", nickname);
        formdata.append("openId", openid);

        http.ajax({
            method: 'POST',
            url: getServerHost() + '/api/postOpenId',
            // data: {
            //     uid: uid,
            //     wechatName: nickname,
            //     openId: openid
            // },
            data: formdata,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    createAccount(nickname, openid, callback) {
        let formdata = new FormData();
        formdata.append("wechatName", nickname);
        formdata.append("openId", openid);

        http.ajax({
            method: 'POST',
            url: getServerHost() + '/api/createAccount',
            // data: JSON.stringify({
            //     'wechatName': nickname,
            //     'openId': openid
            // }),
            // data: {
            //     wechatName: nickname,
            //     openId: openid
            // },
            data: formdata,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    loginCheck(wechatId, webusinessId, wechatName, callback) {
        http.ajax({
            method: 'POST',
            url: getServerHost() + '/login/submit?wechat_openid=' + wechatId + "&webusiness_id=" + webusinessId + "&wechat_name=" + wechatName,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


    //----------------------------------homepage api-------------------------------------------

    getCarousel(callback) {
        http.ajax({
            url: getServerHost() + '/banner/listad',
            // origin: myOrigin,
            dataType:"json",
            // crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getMerchantInfo(merchantId, callback) {
        http.ajax({
            url: getServerHost() + '/webusiness/detail/?id=' + merchantId,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getCategories(callback) {
        http.ajax({
            url: getServerHost() + '/product/category/super_categories',
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getTopNOfCategory(categoryId, size, callback) {
        http.ajax({
            url: getServerHost() + '/product/sub_list_by_category_id?category_id='+ categoryId + '&size=' + size,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


    //-----------------------------------category list api--------------------------------------------

    getCategoryList(categoryId, page, rows, condition, callback) {
        http.ajax({
            url: getServerHost() + '/product/pages_by_category_id?category_id=' + categoryId + "&page=" + page +
                    "&rows=" + rows + "&condition=" + condition,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


    //----------------------------------homepage search api-------------------------------------------

    getSpecialtyListSearching(type, input, page, rows, condition, callback) {
        http.ajax({
            url: getServerHost() + '/product/search?' + type + "=" + input + "&page="+ page + "&rows=" + rows + "&condition=" + condition,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    // getSpecialtyListSearchingBySpecialtyId(callback) {
    //     http.ajax({
    //         type:"GET",
    //         url: getServerHost() + '/product/search',
    //         dataType:"json",
    //         crossDomain:true,
    //         success: (rs) => {
    //             callback && callback(rs);
    //         }
    //     });
    // },
    //
    // getSpecialtyListSearchingBySpecificationId(callback) {
    //     http.ajax({
    //         type:"GET",
    //         url: getServerHost() + '/product/search',
    //         dataType:"json",
    //         crossDomain:true,
    //         success: (rs) => {
    //             callback && callback(rs);
    //         }
    //     });
    // },
    //
    // getSpecialtyListSearchingByCategoryId(callback) {
    //     http.ajax({
    //         type: "GET",
    //         url: getServerHost() + '/product/search',
    //         dataType:"json",
    //         crossDomain:true,
    //         success: (rs) => {
    //             callback && callback(rs);
    //         }
    //     });
    // },


    //----------------------------------ordinary preferential api-------------------------------------------

    getOrdinaryPromotionList(callback) {
        http.ajax({
            url: getServerHost() + '/promotion/normal/list?page=1&rows=10',
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getOrdinaryPromotionDetail(promotionId, callback) {
        http.ajax({
            url: getServerHost() + '/promotion/normal/detail?id=' + promotionId,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


    //----------------------------------group preferential api-------------------------------------------

    getGroupPromotionList(callback) {
        http.ajax({
            url: getServerHost() + '/promotion/group/list?page=1&rows=10',
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getGroupPromotionDetail(promotionId, callback) {
        http.ajax({
            url: getServerHost() + '/promotion/group/detail?id=' + promotionId,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


    //----------------------------------coupon list api-------------------------------------------
    getCouponList(wechatId, callback) {
        http.ajax({
            // url: getServerHost() + '/business/coupon/once_used_coupon/receive_list?wechat_id=' + wechatId,
            url: getServerHost() + '/coupon/once_used_coupon/receive_list?wechat_id=' + wechatId,
            // dataType:"json",
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getCoupon(couponId, wechatId, callback) {
        http.ajax({
            url: getServerHost() + '/coupon/once_used_coupon/create_coupon?wechat_id=' + wechatId + "&couponMoneyId=" + couponId,
            // dataType:"json",
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    //----------------------------------coupon recharge api-------------------------------------------
    getSaleCouponList(callback) {
        http.ajax({
            url: getServerHost() + '/coupon/balance_used_coupon/sale_list',
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    paySaleCoupon(callback) {

    },
};

export default api;
