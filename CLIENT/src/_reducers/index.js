import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import ui from './ui';
import config from './config';

const reducers = combineReducers({
    counter, ui, user, config
});

export default reducers;