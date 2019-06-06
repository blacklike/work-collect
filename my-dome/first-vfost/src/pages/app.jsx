import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import HelloWorld from '../components/hello/world';
import Stores from '../stores/store';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="app-content">
            <HelloWorld />
        </div>
    }
}

const store = new Stores();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));