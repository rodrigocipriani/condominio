import store from './store';

export const createAssyncAction = (type, promise, args) => {

    store.dispatch({
        type: type + '_START'
    });
    console.log(" <<< _START");
    promise.then(result => {
        console.log(" <<< _SUCCESS");
        store.dispatch({
            type: type + '_SUCCESS',
            payload: result.data || result,
            ...args,
        });
    }).catch(err => {
        console.log(" <<< _ERROR");
        store.dispatch({
            type: type + '_ERROR',
            msg: err.msg,
            error: err
        })
    })
};