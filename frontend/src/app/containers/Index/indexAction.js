// import {createAssyncAction} from '../../lib/actionsHelper';
import api  from 'lib/api';
import config from '../../config';

const appApi = api(config.urls.api);

export const indexActionTypes = {
    APP_NEW_MESSAGE: 'APP_NEW_MESSAGE',
};

// export function test() {
//     createAssyncAction(indexActionTypes.TESTE,
//         appApi.get('/teste'),
//         {}
//     );
// }
