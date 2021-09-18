import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';
import config from './config';

const reducers = combineReducers({
    ui, user, config
});

export default reducers;