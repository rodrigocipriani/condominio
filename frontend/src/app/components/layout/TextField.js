import React, {Component, PropTypes} from "react";

export default class TextField extends Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
        sizes: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string
    };

    static defaultProps = {
        name: null,
        sizes: '',
        label: '',
        type: 'text'
    };

    render(){

        const {name, sizes, label, type} = this.props;

        return (
            <div className={['input-field', sizes].join(' ')}>
                <input {...this.props} id={name} type={type} className="validate" />
                <label htmlFor={name}>{label}</label>
            </div>
        );
    }
}