import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
} from '../actions/actionType';
import {combineReducers} from 'redux';

const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
      };
    case GET_USER_SUCCESS:
      return {...state, ...action.payload.data};
    case LOGOUT_SUCCESS:
      return {...initialState};
    default:
      return state;
  }
};

const userReducer = combineReducers({
  user,
});

export {userReducer};
