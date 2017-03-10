import {connect} from 'react-redux'
import IndexPage from './IndexPage';

const mapStateToProps = (state) => {
    return {
        msgs: state.indexReducer.msgs,
        isLogged: state.autenticacaoReducer.isLogged
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onTodoClick: (id) => {
        //     dispatch(toggleTodo(id))
        // }
    };
};

const Index = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);

export default Index;