'use strict';

/**
 *
 * @param msg
 */
const getMensagemErro = (msg) => {
    return getMensagem('danger', msg);
};

/**
 *
 * @param msg
 */
const getMensagemInfo = (msg) => {
    return getMensagem('info', msg);
};

/**
 *
 * @param msg
 */
const getMensagemWarning = (msg) => {
    return getMensagem('warning', msg);
};

/**
 *
 * @param msg
 */
const getMensagemSucesso = (msg) => {
    return getMensagem('success', msg);
};

/**
 *
 * @param tipo
 * @param msg
 */
const getMensagem = (tipo, msg) => {
    let mensagem = {tipo: tipo};

    if (msg.chave) {
        mensagem.texto = msg.chave;
    } else if (msg.message) {
        mensagem.texto = msg.message;
    } else if (msg.texto) {
        mensagem.texto = msg.texto;
    } else {
        mensagem.texto = msg;
    }
    return {mensagens: [mensagem]};
};

/**
 *
 * @param erro: Erro(tipo, msg)
 */
let errors = [];
const add = (erro) => {
    errors.push(erro.mensagens[0]);
    return errors;
};

const getFlush = (erro) => {
    let retorno = Object.assign([], errors);
    errors = [];
    return {mensagens: retorno};
};

const hasErrors = () => {
    return errors.length > 0;
};

exports.getMensagemErro = getMensagemErro;
exports.getMensagemInfo = getMensagemInfo;
exports.getMensagemSucesso = getMensagemSucesso;
exports.getMensagemWarning = getMensagemWarning;
exports.add = add;
exports.getFlush = getFlush;
exports.hasErrors = hasErrors;