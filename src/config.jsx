function getServerHost() {

    const search = location.search.substr(1);
    const searchs = search.split("&");
    const params = {};
    for (const i in searchs) {
        const theParams = searchs[i].split("=");
        params[theParams[0]] = decodeURI(theParams[1]);
    }

    let onlineURL = "//ymymmall.swczyc.com"; // 线上地址
    //let devURL = "//10.108.164.11:8080/hongyu/ymmall"; // 后台地址
    //let devURL = "//10.108.164.133/hyapi/ymmall"; // 后台地址
    //let devURL = "//10.109.252.80/hyapi/ymmall"; // 后台地址
    let devURL = "//admin.swczyc.com/hyapi/ymmall"; // 后台地址

    if (/*/huiyan\.baidu\.com/.test(location.href) || */params.apitype == "online") {
        return onlineURL;
    } else {
        return devURL;
    }
}


function getServerIp() {
    // return "//10.109.252.80";
    return "//ymymmall.swczyc.com";
}


const wxconfig = {
    appId: 'wx6d6fd71af24c22c3',
    appSecret: '0094e566a880a093082b7e805f5b1c71',
    redirectUri: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d6fd71af24c22c3&redirect_uri=http://ymymmall.swczyc.com/ver&response_type=code&scope=snsapi_info&state=1#wechat_redirect'

};

export { getServerHost, getServerIp, wxconfig };
