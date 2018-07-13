import React from 'react';
import { WingBlank, Flex, Modal, Stepper } from 'antd-mobile';
import "./index.less";
import {getServerIp} from "../../../config.jsx";

export default class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const data = this.props.modalData;

        let active = {};
        for (let i in data) {
            // Object.assign(active, data[i].options[0]);
            Object.assign(active, data[0]);
        }
        return {
            active,
            val: 1,
            salePrice: this.props.productData[0].pPrice,
            mPrice: this.props.productData[0].mPrice,
            inbound: this.props.productData[0].inbound,
            specificationId: this.props.modalData[0].id,
        };
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    };

    findOptionIndex(option) {
        var index = 0;
        const length = this.props.productData.length;
        for (var i= 0; i < length; i++) {
            if (JSON.stringify(this.props.productData[i].specification) === JSON.stringify(option)) {
                index = i;
            }
        }
        return index;
        // return this.props.productData && this.props.productData.map((item, index) => {
        //     if (JSON.stringify(item.specification) === JSON.stringify(option)) {
        //         console.log("option", option);
        //         console.log("item.specification", item.specification);
        //         return index
        //     }
        // });
    }

    clickSelector(option) {
        const index = this.findOptionIndex(option);
        const salePrice = this.props.productData[index].pPrice;
        const mPrice = this.props.productData[index].mPrice;
        const inboud = this.props.productData[index].inbound;

        this.setState({
            active: Object.assign(this.state.active, option),
            salePrice: salePrice,
            mPrice: mPrice,
            inbound: inboud,
            specificationId: option.id,
        });
    }

    generateDataSet() {
        const optionsData = this.props.modalData.map((option, key) => {
            let className = "select_item";
            if (JSON.stringify(this.state.active) === JSON.stringify(option)) {
                className +=" select_active";
            }
            return <div className={className}
                        key={key}
                        onClick={() => {this.clickSelector(option)}}
                    >
                {option.specification}
            </div>});

        return <Flex wrap="wrap" className="content_sec">
            <Flex.Item>
                {optionsData}
            </Flex.Item>
        </Flex>
    }

    render() {
        // console.log("active", this.state.active);
        const title = <div className="popup_modal_header">
            <Flex justify="end">
                <Flex.Item style={{flex:'0 0 30%'}}>
                    <img src={"http://" + getServerIp() + this.props.productData[0].iconURL.sourcePath}
                         style={{width:'50%', height:'3rem'}}/>
                </Flex.Item>
                <Flex.Item style={{flex:'0 0 60%'}}>
                    <h3>{this.props.productData[0].specialty.name}</h3>
                    <p>价格：￥{this.state.salePrice}  库存：{this.state.inbound}</p>
                </Flex.Item>
            </Flex>
        </div>;

        const footer = [{
            text: '确定',
            onPress: ()=>{
                this.props.hideModal && this.props.hideModal('success');
                this.props.selectorText && this.props.selectorText(this.state.active, this.state.val, this.state.specificationId, this.state.mPrice, this.state.salePrice,'success');
            }
        }];

        const dataSet = this.generateDataSet();

        return <Modal
            visible={this.props.modal}
            popup
            animationType="slide-up"
            closable
            onClose = {()=>{
                this.props.hideModal && this.props.hideModal('close');
                //this.props.selectorText && this.props.selectorText(this.state.active, this.state.val, this.state.specificationId);
            }}
            title = {title}
            footer = {footer}
            className = "popup_modal"
        >
            <div className="popup_modal_content">
                <div style={{float:'left', marginLeft:'1rem', marginRight:'1rem'}}>种类</div>
                {dataSet}
                <div style={{float:'left', marginLeft:'1rem'}}>数量</div>
                <div className="step">
                        <div className="add" onClick={() => {this.setState({val:this.state.val+1})}}>
                        +
                        </div>
                        <div className="value">
                        {this.state.val}
                        </div>
                        <div className="minus"onClick={() => {this.setState({val:(this.state.val-1)>1?this.state.val-1:1})}}>
                        -
                        </div>
                    </div>
                {/* <div>
                    <Stepper
                        style={{ width: '30%', minWidth: '100px', touchAction: 'none' }}
                        showNumber
                        //max={10}
                        min={1}
                        value={this.state.val}
                        onChange={this.onChange}/>
                </div> */}
            </div>
        </Modal>
    }
}
