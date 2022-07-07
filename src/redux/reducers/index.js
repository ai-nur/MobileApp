import {combineReducers} from 'redux';
import {userReducer} from './user';
import { campaignReducer } from './campaign';

const rootReducer = combineReducers({
  user: userReducer,
  campaign: campaignReducer
});

export default rootReducer;
