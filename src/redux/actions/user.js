import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from './actionType';
import {userServiceApi} from '../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = body => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const response = await userServiceApi.post('/api/v1/Login', body);
    const value = JSON.stringify(response.data);
    await AsyncStorage.setItem('USER', value);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        statusCode: response.status,
        data: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        error: error,
      },
    });
  }
};

export const getUser = () => async dispatch => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  try {
    const user = await AsyncStorage.getItem('USER');
    console.log(user);
    if (user !== null) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {data: JSON.parse(user)},
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
      payload: {error: null},
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  try {
    AsyncStorage.removeItem('USER');
    const user = await AsyncStorage.getItem('USER');
    if (!user) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED,
    });
  }
}