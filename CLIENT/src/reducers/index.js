import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import ui from './ui';

const reducers = combineReducers({
    counter, ui, user
});

export default reducers;