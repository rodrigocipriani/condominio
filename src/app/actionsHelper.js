import store from './store';

export const createAssyncAction = (type, promise, args) => {

    console.log('type', type);
    return () => {
        store.dispatch({
            type: type + '_START'
        });
        promise.then(result => {
            store.dispatch({
                type: type + '_SUCCESS',
                payload: result.data || result,
                ...args,
            });
        }).catch(err => {
            store.dispatch({
                type: type + '_ERROR',
                msg: err.msg,
                error: err
            })
        })
    }
}