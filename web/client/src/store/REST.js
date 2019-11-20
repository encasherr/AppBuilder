import axios from 'axios';

const setPropertyValue = 'SET_PROPERTY_VALUE';
const initiateGetType = 'INITIATE_GET';
const receiveGetType = 'RECEIVE_GET';
const initiatePostType = 'INITIATE_POST';
const receivePostType = 'RECEIVE_GET';
const initialState = { url: '', requestJson: '', responseJson: '' };

export const actionCreators = {
  SetPropertyValue: (fieldName, fieldValue) => (dispatch, getState) => {
      dispatch({type: setPropertyValue, fieldName, fieldValue});
  },

  initiateGet: (apiUrl, jsonString) => async (dispatch, getState) => {    
    console.log('url requested', apiUrl); 
    console.log('requestJson', jsonString); 
    dispatch({ type: initiateGetType, apiUrl, jsonString });

    const url = apiUrl;
    // const response = await axios.get(url, {params: { jsonString } }) 
    // const responseJson = await response.json();
    axios.get(url, { params: jsonString })
    .then( (response) => {
      console.log('response.data', response.data);
      console.log('typeof(response.data)', typeof(response.data));
      let result = '';
      if(typeof(response.data) === 'object') {
        result = JSON.stringify(response.data, null, 4);
      }
      else {
        result = response.data;
      }
      dispatch({ type: receiveGetType, apiUrl, responseJson: result });
    })
    // dispatch({ type: receiveGetType, apiUrl, responseJson });
  },

  
  initiatePost: (apiUrl, jsonString) => async (dispatch, getState) => {    
    console.log('post url requested', apiUrl); 
    console.log('requestJson', jsonString); 
    dispatch({ type: initiatePostType, apiUrl, jsonString });

    const url = apiUrl;
    let jsonobj = JSON.parse(jsonString);
    // let jsonobj = JSON.parse('{ "app_name": "alok" }');
    axios.post(url, { 
      payload: jsonobj
    })
    .then( (response) => {
      console.log('response.data', response.data);
      console.log('typeof(response.data)', typeof(response.data));
      let result = '';
      if(typeof(response.data) === 'object') {
        result = JSON.stringify(response.data, null, 4);
      }
      else {
        result = response.data;
      }
      dispatch({ type: receivePostType, apiUrl, responseJson: result });
    })
    .catch((error) => {
      let msg = `Error in REST call\n${error}`;
      dispatch({ type: receivePostType, apiUrl, responseJson: error });
    })
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if(action.type === setPropertyValue) {
    var newState = {...state};
    newState[action.fieldName] = action.fieldValue;
    console.log('newstate', newState);
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
    return {
      ...state,
      url: action.apiUrl, 
      requestJson: action.jsonString,
      isLoading: true
    };
  }

  if (action.type === receivePostType) {
    return {
      ...state,
      url: action.apiUrl, 
      responseJson: action.responseJson,
      isLoading: false
    };
  }

  return state;
};
