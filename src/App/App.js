// import { UiAlert, UiButton } from 'keen-ui';
import UiButton from 'keen-ui/lib/UiButton';
import connect from '../../es2x/vue-redux-connect/connect';
import { appActionTypes } from './appActionTypes';

const App = {
  data: () => ({
    isRed: true,
    size: 'normal',
  }),
  components: {
    UiButton,
  },
  // methods: {
  //   add(event) {
  //     store.dispatch({ type: 'ADD' });
  //   },
  // },
  props: {
    total: {
      type: Number,
    },
    add: {
      type: Function,
    },
  },
  render(h) {
    return (
        <div class={{ 'is-red': this.isRed }}>
          <p>Total: {this.total}</p>
          <p>{this.size}</p>
          <ui-button onClick={this.add} type="secondary">Normal</ui-button>
        </div>
    );
  },
};

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
        // data: { 1 },
      });
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(App);
