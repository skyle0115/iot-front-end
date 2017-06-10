import {combineReducers} from 'redux';
import {overview, report} from './current';
import devices from './devices';
import settings from './settings';

const rootReducer = combineReducers({overview, report, devices, settings});

export default rootReducer;
