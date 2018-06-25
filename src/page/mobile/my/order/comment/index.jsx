import React from "react";
import {Card, WhiteSpace, Flex, TextareaItem, Checkbox, ImagePicker, Toast } from "antd-mobile";
// import { Link } from 'react-router-dom';
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";
import Submit from "../../../../../components/submit/index.jsx";
import commentApi from "../../../../../api/my.jsx";
import PropTypes from "prop-types";
import { createForm } from 'rc-form';
import {getServerIp} from "../../../../../config.jsx";


// 需传入评价者名称、订单id
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];
const AgreeItem = Checkbox.AgreeItem;

class CommentOn extends React.Component {

    constructor(props) {
        super(props);

        const length = this.props.location.order.orderItems.length;
        var isLighted = new Array(length);
        var files = new Array(length);
        var anonymous = new Array(length);
        for (var i = 0; i < length; i++) {
            isLighted[i] = new Array(5);
            files[i] = new Array();
            anonymous[i] = false;
            for (var j = 0; j < 5; j++) {
                isLighted[i][j] = true;
            }
        }

        this.state = {
            order: this.props.location.order,
            isLighted,
            files,
            anonymous,
        };
    }

    componentWillMount() {
        // this.state.order = this.props.location.order;
        // const length = this.props.location.order.orderItems.length;
        // var isLighted = new Array();
        // var files = new Array();
        // var anonymous = new Array();
        // for (var i = 0; i < length; i++) {
        //     isLighted[i] = new Array();
        //     files[i] = new Array();
        //     anonymous[i] = false;
        //     for (var j = 0; j < 5; j++) {
        //         isLighted[i][j] = true;
        //     }
        // }

        // this.setState({
        //     order: this.state.order,
        //     isLighted,
        //     files,
        //     anonymous,
        // });
    }

    getStarCount(index) {
        let starCount = 0;
        for (let i = 0; i < this.state.isLighted[index].length; i++) {
            if (this.state.isLighted[index][i]) {
                starCount++;
            }
        }
        return starCount;
    }

    //index:被点击的星的位置
    //pos:被评价的商品的位置
    makeFormerFull(index, pos) {
        //如果点击的那颗星是空的，那么把它和它之前的星都点亮
        //否则，把它和它后面的星都置空
        if (this.state.isLighted[pos][index]) {
            for (let i = 0; i < index; i++) {
                this.state.isLighted[pos][i] = true;
            }
        } else {
            for (let i = 4; i > index; i--) {
                this.state.isLighted[pos][i] = false;
            }
        }
        this.setState({isLighted:this.state.isLighted});
    }

    makeLatterNull(index, pos) {
        for (let i = 4; i > index; i++) {
            this.state.isLighted[pos][i] = false;
        }
    }


    getStarDescription(i) {
        if (this.getStarCount(i) === 1) {
            return "很差";
        } else if (this.getStarCount(i) === 2) {
            return "较差";
        } else if (this.getStarCount(i) === 3) {
            return "一般";
        } else if (this.getStarCount(i) === 4) {
            return "较好";
        } else if (this.getStarCount(i) === 5) {
            return "非常好";
        } else {

        }
    }

    commentOnProduct() {
        console.log("comment");
        // const appraiseInfo = {
        //     // "orderItemId": this.props.location.orderId,         // 订单明细id  int
        //     "orderItemId": 12,         // 订单明细id  int
        //
        //     // "wechat_id": localStorage.getItem("openid"),        // 评价者名称 string
        //     "wechat_id": 8,                                        // 评价者名称 string
        //
        //     "appraiseTime": Date.parse(new Date()),             // 评价时间  datetime
        //     "appraiseContent": commentInfo,                     // 评价内容 string
        //     "contentLevel": this.getStarCount(),                // 满意度 int
        //     "isShow": !this.state.anonymous,                     // 是否匿名 boolean
        //     // "imgURLs": [                                        // 图片url列表  list<ImgURL>
        //     //
        //     // ],
        // };

        // const appraiseInfo = {
        //     "specialtyAppraise": {
        //     "appraiseContent": "请问",
        //         "appraiseTime": 1524797746000,
        //         "contentLevel": 5,
        //         "isShow": false
        // },
        //     "orderItemId": 12,
        //     "wechat_id": localStorage.getItem("wechatId")
        // };

        // var appraisesInfo = {
        //     "wechat_id": localStorage.getItem("wechatId"),
        //     "wrapAppraises": [
        //         {
        //             "orderItemId": 45,
        //             "specialtyAppraise":
        //                 {
        //                     "appraiseContent": "请问",
        //                     "appraiseTime": 1524797746000,
        //                     "contentLevel": 5,
        //                     "isShow": false,
        //
        //                     "images":
        //                         [
        //                             {"sourcePath": "asdfasdfsdfasdf"}
        //                         ]
        //                 },
        //
        //         }
        //     ]
        //
        // };

        console.log("files[index]", this.state.files[0]);

        const appraises = this.state.order.orderItems && this.state.order.orderItems.map((item, index) => {
            const appraiseFormName = "count"+index;
            return {
                "orderItemId": item.id,
                "specialtyAppraise":
                    {
                        "appraiseContent": this.props.form.getFieldsValue()[appraiseFormName],
                        "appraiseTime": new Date(),
                        "contentLevel": this.getStarCount(index),
                        "isAnonymous": this.state.anonymous[index],
                        "isShow": true,

                        // "images":
                        //     [
                        //         {"sourcePath": this.state.files[index].url ? this.state.files[index].url : null}
                        //     ],
                    },
            }
        });
        console.log("appraises", appraises);

        var appraisesInformation = {
            "wechat_id": localStorage.getItem("wechatId"),
            "wrapAppraises": appraises,
        };

        commentApi.applyAppraises(appraisesInformation, (rs)=>{
            console.log("rs: ", rs);
            if (rs && rs.success) {
                Toast.info('评价成功！', 1);
            } else {
                Toast.info('哎呀，出错了！', 1);
            }
        });


        // commentApi.applyAppraise(appraiseInfo, (rs)=>{
        //     console.log("rs: ", rs);
        //     if (rs && rs.success) {
        //         Toast.info('评价成功！', 1);
        //     } else {
        //         Toast.info('哎呀，出错了！', 1);
        //     }
        // });


        this.linkTo('/my/order');
    }

    linkTo(link) {
        this.context.router.history.push(link);
    }

    onChange = (fileIndex, files, type, index) => {
        console.log(fileIndex, files, type, index);

        this.state.files[fileIndex] = files;
        this.setState({
            files: this.state.files,
        });
    };

    onChangeAnonymous(index, e) {
        this.state.anonymous[index] = e.target.checked;
        this.setState({
            anonymous: this.state.anonymous,
        });
    }

    getStarOfIndex(i) {
        const content = this.state.isLighted[i] && this.state.isLighted[i].map((item, index) => {

            return <img key={index} src={item ? "./images/icons/星.png" : "./images/icons/星-空.png"} style={{marginLeft:'0.8rem'}}
                        onClick={() => {
                            this.state.isLighted[i][index] = !this.state.isLighted[i][index];
                            this.setState({isLighted: this.state.isLighted});
                            this.makeFormerFull(index, i);
                            // this.setState({isLighted: this.state.isLighted});
                        }}/>

        });
        return content
    }

    render() {
        console.log("order", this.state.order);
        console.log("this.state.files", this.state.files);
        console.log("this.props.form.getFieldsValue()", this.props.form.getFieldsValue());


        const { getFieldProps } = this.props.form;

        const comments = this.state.order.orderItems && this.state.order.orderItems.map((item, index) => {
            const files = this.state.files[index];

            return <div key={index}>
                <Card>
                    <div>
                        <Flex>
                            <Flex.Item style={{flex:'0 0 20%'}}>
                                <img src={"http://" + getServerIp() + item.iconURL.mediumPath} style={{width:'70%', padding:'1rem'}}/>
                            </Flex.Item>
                            <Flex.Item>
                                <span>描述相符</span>
                                <span>{this.getStarOfIndex(index)}</span>
                                <span style={{marginLeft:'0.8rem', color:'#999'}}>{this.getStarDescription(index)}</span>
                            </Flex.Item>
                        </Flex>
                    </div>
                </Card>

                <WhiteSpace/>

                <Card>
                    <div style={{borderBottom: '1px solid #ccc'}}>
                        <TextareaItem
                            autoHeight
                            rows={5}
                            count={200}
                            // labelNumber={5}
                            placeholder="商品好吗？给其他想买的小伙伴做个参考呗"
                            {...getFieldProps('count'+[index], {
                                initialValue: '',
                            })}
                        />
                    </div>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange.bind(this, index)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        multiple={true}
                    />
                    <div style={{fontSize:'0.7rem'}}>
                        <AgreeItem data-seed="logId" onChange={e => this.onChangeAnonymous(index, e)}>
                            匿名 <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}/>
                        </AgreeItem>
                    </div>
                </Card>
                <WhiteSpace/>
            </div>
        });

        return <Layout header={false} footer={false}>

            <Navigation title="发表评价" left={true}/>
            <WhiteSpace/>

            {comments}

            <Submit onClick={()=>{this.commentOnProduct()}}>
                <span>提交</span>
            </Submit>

        </Layout>

    }
}

CommentOn.contextTypes = {
    router: PropTypes.object.isRequired
};

const CommentOnWrapper = createForm()(CommentOn);
export default CommentOnWrapper;