import React from 'react';
import {WhiteSpace, Flex} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Card from "../../../components/card/index.jsx";

export default class Separator extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render(){
        // let separator = this.props.separatorData && this.props.separatorData.data;
        // if (!separator) {
        //     return null;
        // }

        return <div>
            <WhiteSpace/>
            <Card>
                <div className="separator">
                    <Flex>
                        <Flex.Item style={{flex: '0 0 4%', marginRight:'0.4rem'}}>
                            <img src='./images/category/菜篮子.png'
                                 style={{width:'100%', margin:'0.4rem'}}/>
                        </Flex.Item>

                        <Flex.Item>{this.props.separatorData}</Flex.Item>

                        <Flex.Item style={{textAlign:'right', marginRight:'0.8rem'}}>
                            <Link to={{pathname: '/home/category', category: this.props.separatorData, categoryId: this.props.categoryData}} style={{color: 'darkorange'}}>
                            更多>
                            </Link>
                        </Flex.Item>
                    </Flex>
                </div>
            </Card>
            </div>
    }
}
