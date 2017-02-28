import React, {Component, PropTypes} from "react";

export default class Row extends Component{
    static propTypes = {
        children: PropTypes.object
    };

    static defaultProps = {
        children: null
    };

    render(){

        const {children} = this.props;

        return <div className='row'>{children}</div>;
    }
}