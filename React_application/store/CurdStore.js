//Creating Store

import {createStore} from 'redux';
import CurdReducer from '../reducers/CurdReducer';
const store=createStore(CurdReducer);
console.log(store);
export default store;