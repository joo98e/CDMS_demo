import { combineReducers } from 'redux';
import User from './User';
import UI from './UI';
import Producer from './Producer'

const reducers = combineReducers({
    UI,
    User,
    Producer
});

export default reducers;