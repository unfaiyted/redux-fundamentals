import React  from 'react';
import  {connect} from 'react-redux';
import Todos from './Todos';
import Goals from './Goals'

import {
  handleInitialData
} from "../actions/shared";

class App extends React.Component {
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }
    render() {
        const {loading} = this.props;

        if(loading === true) {
            return (<div>Loading</div>);
        };

        return (
            <div>
                <Todos/>
                <Goals/>
            </div>
        )
    }
}

// invoking connect, then the result of that is passes again to the component we want to render
export default connect((state) => ({
    loading: state.loading
}))(App);

