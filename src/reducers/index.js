import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';
import {overview, report} from './current';
import devices from './devices';
import target from './target';

const rootReducer = combineReducers({overview, report, devices, target, loadingBar});

export default rootReducer;
