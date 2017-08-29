import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { appActionTypes } from './appActionTypes';
import Button from 'material-ui/Button';

import config from '../../config';
import api from '../../es2x/api';

const appApi = api(config.urls.api);

class App extends PureComponent {

  render() {
    const { total, add, reset } = this.props;


    return (
      <div>
        <Button onClick={reset} raised color="primary">
          Zerar contador
        </Button>

        <br/>
        <br/>
        <br/>

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
    total: state.appStore.total,
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
    reset() {
      dispatch({
        type: appActionTypes.RESET_TOTAL,
        promise: appApi.get('/reset'),
      });
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(App);
