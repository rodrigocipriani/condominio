import React, {PureComponent, PropTypes} from 'react';
import {Painel} from 'br-react-utils/layout';

class DocumentosPage extends PureComponent {

    constructor(props) {
        super(props);
        props.buscaDocumentos();
    }

    render() {
        const {documentos} = this.props;

        return (
            <div className='Documentos row'>
                <h3>Documentos</h3>
                <hr />

                <Painel titulo="Gerais" isOpen={true}>
                    <ul className="collection">
                        {documentos.map((documento, key) => {
                            return (
                                <li key={key} className="collection-item">
                                    {documento.titulo}
                                    <a href={documento.url} target="_blank" className="secondary-content">
                                        <i className="fa fa-lg fa-download" aria-hidden="true"/>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </Painel>
            </div>
        );
    }
}

DocumentosPage.propTypes = {
    documentos: PropTypes.array,
    buscaDocumentos: PropTypes.func.isRequired
};

DocumentosPage.defaultProps = {
    documentos: [],
    buscaDocumentos: null
};

export default DocumentosPage;
