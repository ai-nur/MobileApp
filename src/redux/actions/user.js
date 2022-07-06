import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from './actionType';
import {userServiceApi} from '../../config/apiConfig';

export const login = body => async dispatch => {
  console.log("ok")
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const response = await userServiceApi.post('/api/v1/Login', body);
    console.log(response.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        statusCode: response.status,
        data: response.data,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
