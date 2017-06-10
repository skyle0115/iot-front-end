import {combineReducers} from 'redux';
import {overview, report} from './current';
import devices from './devices';
import target from './target';

const rootReducer = combineReducers({overview, report, devices, target});

export default rootReducer;
