import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as appActions from './appActions';
import BigListComponent from './BigListComponent';


class App extends PureComponent {

  render() {
    const { total, add, reset, biglist, criarLista, criarListaClient } = this.props;


    return (
      <div>

        <h2>React App</h2>
        <Button onClick={() => add(null)} raised color="primary">
          Add 1
        </Button>
        <Button onClick={reset} raised color="primary">
          Zerar contador (Server)
        </Button>

        <br/><br/>

        <div>Total: {total}</div>

        <br/><br/>

        <TextField onChange={e => add(e.target.value)} value={total}/>

        <br/><br/>

        <Button onClick={() => criarLista(total)} raised color="primary">
          Criar lista (Server)
        </Button>

        <Button onClick={() => criarListaClient()} raised color="primary">
          Criar lista (Client)
        </Button>

        <br/><br/>

        <BigListComponent list={biglist}/>

      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

function mapStateToProps(state) {
  return {
    total: state.appStore.total,
    biglist: state.appStore.biglist,
  };
}

function mapActionToProps(dispatch) {
  return {
    add(total) {
      dispatch(appActions.add(total));
    },
    reset() {
      dispatch(appActions.reset());
    },
    criarLista(total) {
      dispatch(appActions.criarLista(total));
    },
    criarListaClient() {
      dispatch(appActions.criarListaClient());
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(App);
