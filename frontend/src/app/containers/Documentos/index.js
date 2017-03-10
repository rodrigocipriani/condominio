import {connect} from 'react-redux'
import DocumentosPage from './DocumentosPage';
import * as documentosAction from './documentosAction';

const mapStateToProps = (state) => {
    return {
        documentos: state.documentosReducer.documentos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        buscaDocumentos: () => {
            documentosAction.buscaDocumentos();
        }
    };
};

const Documentos = connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentosPage);

export default Documentos;