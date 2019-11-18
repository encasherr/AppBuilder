import axios from 'axios';

const setPropertyValue = 'SET_PROPERTY_VALUE';
const initiateGetType = 'INITIATE_GET';
const receiveGetType = 'RECEIVE_GET';
const initiatePostType = 'INITIATE_POST';
const initialState = { url: '', requestJson: '', responseJson: '' };

export const actionCreators = {
  SetPropertyValue: (fieldName, fieldValue) => (dispatch, getState) => {
      dispatch({type: setPropertyValue, fieldName, fieldValue});
  },

  initiateGet: (apiUrl, jsonString) => async (dispatch, getState) => {    
    
    dispatch({ type: initiateGetType, apiUrl, jsonString });

    const url = apiUrl;
    const response = await axios.get(url, {params: { jsonString } }) 
    const responseJson = await response.json();

    dispatch({ type: receiveGetType, apiUrl, responseJson });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if(action.type === setPropertyValue) {
    var newState = {...state};
    newState[action.fieldName] = action.fieldValue;
    return newState;
  }

  if (action.type === initiateGetType) {
    return {
      ...state,
      url: action.apiUrl, 
      requestJson: action.jsonString,
      isLoading: true
    };
  }

  if (action.type === receiveGetType) {
    return {
      ...state,
      url: action.apiUrl, 
      requestJson: action.jsonString,
      responseJson: action.responseJson,
      isLoading: false
    };
  }

  if (action.type === initiatePostType) {
    return { ...state, count: state.count - 1 };
  }

  return state;
};
