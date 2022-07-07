import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
} from '../actions/actionType';
import {combineReducers} from 'redux';

const initialState = {
  data: null,
  error: null,
};

export const user = (state = {...initialState}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
        },
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: {
          ...action.payload.error,
        },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
        },
      };
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
