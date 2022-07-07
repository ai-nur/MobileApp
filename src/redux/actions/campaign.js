import {
  LIST_CAMPAIGN_REQUEST,
  LIST_CAMPAIGN_SUCCESS,
  LIST_CAMPAIGN_FAILED,
  DETAIL_CAMPAIGN_REQUEST,
  DETAIL_CAMPAIGN_SUCCESS,
  DETAIL_CAMPAIGN_FAILED,
} from './actionType';
import {campaignServiceApi} from '../../config/apiConfig';

export const listCampaign = token => async dispatch => {
  dispatch({
    type: LIST_CAMPAIGN_REQUEST,
  });
  try {
    const response = await campaignServiceApi(token).get('/api/v1/campaign');
    dispatch({
      type: LIST_CAMPAIGN_SUCCESS,
      payload: {data: response.data},
    });
  } catch (error) {
    dispatch({
      type: LIST_CAMPAIGN_FAILED,
      payload: error,
    });
  }
};

export const detailCampaign = (id, token) => async dispatch => {
  dispatch({
    type: DETAIL_CAMPAIGN_REQUEST,
  });
  try {
    const response = await campaignServiceApi(token).get(`/api/v1/campaign/${id}`);
    dispatch({
      type: DETAIL_CAMPAIGN_SUCCESS,
      payload: {data: response.data},
    });
  } catch (error) {
    dispatch({
      type: DETAIL_CAMPAIGN_FAILED,
      payload: error,
    });
  }
}