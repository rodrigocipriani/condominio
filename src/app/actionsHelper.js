export const createAssyncAction = (type, promise, args) => {

    return dispatch => {
        dispatch({
            type: type + '_PENDING'
        });
        promise.then(result => {
            dispatch({
                type: type + '_SUCCESS',
                payload: result.data || result,
                ...args,
            });
        }).catch(err => {
            dispatch({
                type: type + '_FAILURE',
                msg: err.msg,
                error: err
            })
        })
    }
}