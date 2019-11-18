import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/REST';

class RESTCalls extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    // const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
  }

  onSubmit = () => {
      if(this.props.match.params.method === 'get'){
        this.props.initiateGet(this.props.match.params.apiUrl, this.props.match.params.jsonString);
      }
      else {

      }
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    // const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    // this.props.requestWeatherForecasts(startDateIndex);
  }

  render() {
    return (
      <div>
        <h1>REST Calls</h1>
        <p>Enter the url, request body in json format, select the HTTP method and Submit.</p>
        {this.renderApiUrl(this.props)}
        {this.renderHttpMethod(this.props)}
        {this.renderRequestJson(this.props)}
        {this.renderResponseJson(this.props)}
        {this.renderSubmitButton()}
      </div>
    );
  }

  
onUrlChange = (e) => {
    console.log('e', e);
    this.props.SetPropertyValue('url', e.target.value);
}

onMethodChange = (e) => {
    console.log('e', e);
    this.method = e.options[e.selectedIndex].value;
}

onRequestJsonChange = (e) => {
    console.log('e', e);
    this.props.SetPropertyValue('requestJson', e.target.value);
}

onResponseJsonChange = (e) => {
    console.log('e', e);
    this.props.SetPropertyValue('responseJson', e.target.value);
}

renderApiUrl = (props) => {
    return (
        <div style={styles.rowStyle}>
            <input type="text" onChange={(e) => this.onUrlChange(e)} />
        </div>
    )
}

renderHttpMethod = (props) => {
    return (
        <div style={styles.rowStyle}>
            <select onChange={(e) => this.onMethodChange(e)}>
                <option value="get" selected="selected">get</option>
                <option value="post">post</option>
            </select>
        </div>
    )
}

renderRequestJson = (props) => {
    return (
        <div style={styles.rowStyle}>
            <textarea onChange={(e) => this.onRequestJsonChange(e)}>
                {props.requestJson}
            </textarea>
        </div>
    )
}

renderResponseJson = (props) => {
    return (
        <div style={styles.rowStyle}>
            <textarea onChange={(e) => this.onResponseJsonChange(e)}>
                {props.responseJson}
            </textarea>
        </div>
    )
}

renderSubmitButton = () => {
    return (
        <div style={styles.rowStyle}>
            <button type="button" onClick={() => this.onSubmit()}>Submit</button>
        </div>
    )
}
}

export default connect(
  state => state.rest,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(RESTCalls);

const styles = {
    rowStyle: {
        padding: '5px',
        'margin-top': '10px', 
        width: '100%'
    }
}