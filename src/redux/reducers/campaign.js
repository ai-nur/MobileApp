import {
  LIST_CAMPAIGN_REQUEST,
  LIST_CAMPAIGN_SUCCESS,
  LIST_CAMPAIGN_FAILED,
  DETAIL_CAMPAIGN_REQUEST,
  DETAIL_CAMPAIGN_SUCCESS,
  DETAIL_CAMPAIGN_FAILED,
} from '../actions/actionType';
import {combineReducers} from 'redux';

const initialState = {
  data: null,
  loading: false,
};

export const listCampaign = (state = {...initialState}, action) => {
  switch (action.type) {
    case LIST_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LIST_CAMPAIGN_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export const detailCampaign = (state = {...initialState}, action) => {
  switch (action.type) {
    case DETAIL_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DETAIL_CAMPAIGN_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
        },
        loading: false,
      };
    default:
      return state;
  }
};

const campaignReducer = combineReducers({
  listCampaign: listCampaign,
  detailCampaign: detailCampaign,
});

export {campaignReducer};
