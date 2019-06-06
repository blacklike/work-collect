import './world.less';
import React from 'react';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }

    componentDidMount() {
        this.store.getName();
        this.store.getRemoteInfo();
    }

    render() {
        const { author, message } = this.store;
        return <div>
            <h1>HelloWorld</h1>
            <p>this is a sample template</p>
            <p>create by zuimo.xt</p>
            <Input addonBefore={author} value={message}/>
        </div>
    }
}

export default HelloWorld;