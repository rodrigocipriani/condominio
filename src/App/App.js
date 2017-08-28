import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { appActionTypes } from './appActionTypes';
import Button from 'material-ui/Button';

class App extends PureComponent {

  render() {
    const { total, add } = this.props;


    return (
      <div>
        <h2>React App</h2>
        <Button onClick={add} raised color="primary">
          Add from React
        </Button>
        <div>Total: {total}</div>
      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

function mapStateToProps(state) {
  return {
    total: state.appReducer.total,
  };
}

function mapActionToProps(dispatch) {
  return {
    add() {
      dispatch({
        type: appActionTypes.ADD,
        // data: 'rodrigo',
      });
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(App);
