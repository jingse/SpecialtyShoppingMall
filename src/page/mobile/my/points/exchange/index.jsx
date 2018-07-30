import React from 'react';
import Layout from "../../../../../common/layout/layout.jsx";
import Navigation from "../../../../../components/navigation/index.jsx";
import Submit from "../../../../../components/submit/index.jsx";
import {WhiteSpace, Card, InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';

class ExchangePoints extends React.Component {

    render() {
        const { getFieldProps } = this.props.form;

        return <Layout>

            <Navigation title="积分兑换" left={true}/>

            <WhiteSpace/>

            <Card>
                <InputItem editable={false} value="xxxx">可用积分：</InputItem>
                <InputItem editable={false} value="100积分 = 1元">兑换规则：</InputItem>
                <InputItem
                    {...getFieldProps('number')}
                    type="number"
                    placeholder="输入要兑换的积分"
                >要兑换：</InputItem>
            </Card>

            <Submit>
                兑换
            </Submit>

        </Layout>
    }

}


const ExchangePointsWrapper = createForm()(ExchangePoints);
export default ExchangePointsWrapper;