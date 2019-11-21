import axios from 'axios';

const nodeApiUrl = 'http://localhost:3001/api/rest';
const setPropertyValue = 'SET_PROPERTY_VALUE';
const initiateGetType = 'INITIATE_GET';
const receiveGetType = 'RECEIVE_GET';
const initiatePostType = 'INITIATE_POST';
const receivePostType = 'RECEIVE_POST';
const initialState = { url: '', requestJson: '', responseJson: '' };

export const actionCreators = {
  SetPropertyValue: (fieldName, fieldValue) => (dispatch, getState) => {
      dispatch({type: setPropertyValue, fieldName, fieldValue});
  },

  initiateGet: (apiUrl, jsonString) => async (dispatch, getState) => {    
    console.log('url requested', apiUrl); 
    console.log('requestJson', jsonString); 
    dispatch({ type: initiateGetType, apiUrl, jsonString });

    let payload =  {
      apiUrl: apiUrl,
      data: jsonString,
      method: "get"
    }
    axios.post(nodeApiUrl,{
      payload
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
      dispatch({ type: receiveGetType, apiUrl, responseJson: result });
    })
  },

  
  initiatePost: (apiUrl, jsonString) => async (dispatch, getState) => {    
    console.log('post url requested', apiUrl); 
    console.log('requestJson', jsonString); 
    dispatch({ type: initiatePostType, apiUrl, jsonString });

    /*
{ 
 "app_name": "sample_4"
}
    */
    const url = apiUrl;
    let jsonobj = !jsonString ? {} : JSON.parse(jsonString);
    
    if(isHostUrlRequested(apiUrl)) {
        axios.post(apiUrl, { 
          payload: jsonobj
        })
        .then( (response) => handlePostResponse(response, dispatch, apiUrl)
        )
        .catch((error) => {
          let msg = `Error in REST call\n${error}`;
          dispatch({ type: receivePostType, apiUrl, responseJson: error });
        })
    }
    else{
      let payload =  {
        apiUrl: apiUrl,
        data: jsonobj,
        method: "post"
      }
      axios.post(nodeApiUrl, { 
        payload
      })
      .then( (response) => handlePostResponse(response, dispatch, apiUrl)
      )
      .catch((error) => {
        let msg = `Error in REST call\n${error}`;
        dispatch({ type: receivePostType, apiUrl, responseJson: error });
      })
    }
    // // let jsonobj = JSON.parse('{ "app_name": "alok" }');
  }
};

function handlePostResponse(response, dispatch, apiUrl) {
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
}

function isHostUrlRequested(requestUrl) {
  var hostname;

  if (requestUrl.indexOf("//") > -1) {
      hostname = requestUrl.split('/')[2];
  }
  else {
      hostname = requestUrl.split('/')[0];
  }

  return nodeApiUrl.indexOf(hostname) > -1;
  //find & remove port number
  // hostname = hostname.split(':')[0];
  //find & remove "?"
  // hostname = hostname.split('?')[0];

  // return hostname;
}

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
