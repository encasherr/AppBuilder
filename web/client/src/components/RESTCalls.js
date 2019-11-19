import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/REST';

class RESTCalls extends Component {
    requestMethod = "get";

  componentWillMount() {
    // This method runs when the component is first added to the page
    // const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
  }

  onSubmit = () => {
      if(this.requestMethod === 'get'){
        this.props.initiateGet(this.props.url, this.props.requestJson);
      }
      else {
        this.props.initiatePost(this.props.url, this.props.requestJson);
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
        {this.renderSubmitButton()}
        <div className="row">
        {this.renderRequestJson(this.props)}
        {this.renderResponseJson(this.props)}
        </div>
      </div>
    );
  }

  
onUrlChange = (e) => {
    console.log('e', e.target.value);
    this.props.SetPropertyValue('url', e.target.value);
    console.log('this.props.url', this.props.url);
}

onMethodChange = (e) => {
    console.log('e.target.value', e.target.value);
    this.requestMethod = e.target.value;
    // this.method = e.options[e.selectedIndex].value;
}

onRequestJsonChange = (e) => {
    console.log('e', e);
    this.props.SetPropertyValue('requestJson', e.target.value);
    console.log('this.props.requestJson', this.props.requestJson);
}

onResponseJsonChange = (e) => {
    console.log('e', e);
    this.props.SetPropertyValue('responseJson', e.target.value);
}

renderApiUrl = (props) => {
    return (
        <div className="form-group col-md-7">
            <label>Url</label>
            <input type="url" className="form-control" placeholder="Enter url" onChange={(e) => this.onUrlChange(e)} />
            <small className="form-text text-muted">Url that responds with JSON data .</small>
        </div>
    )
}

renderHttpMethod = (props) => {
    return (
        <div className="form-group col-md-3">
            <label>Method</label>
            <select className="form-control" onChange={(e) => this.onMethodChange(e)}>
                <option value="get">get</option>
                <option value="post">post</option>
            </select>
        </div>
        // <div style={styles.rowStyle} value={this.requestMethod} className="col-md-3">
        //     <select className="form-control" onChange={(e) => this.onMethodChange(e)}>
        //         <option value="get">get</option>
        //         <option value="post">post</option>
        //     </select>
        // </div>
    )
}

renderRequestJson = (props) => {
    return (
        <div className="form-group col-md-6">
            <label>Request Payload</label>
            <textarea rows="10" value={props.requestJson} className="form-control" onChange={(e) => this.onRequestJsonChange(e)}>
            </textarea>
        </div>
        // <div style={styles.rowStyle} className="col-md-6">
        //     <textarea rows="10" value={props.requestJson} className="form-control" onChange={(e) => this.onRequestJsonChange(e)}>
        //     </textarea>
        // </div>
    )
}

renderResponseJson = (props) => {
    return (
        <div className="form-group col-md-6">
            <label>Response Payload</label>
            <textarea rows="10" value={props.responseJson} className="form-control" onChange={(e) => this.onResponseJsonChange(e)}>
            </textarea>
        </div>
        // <div style={styles.rowStyle} className="col-md-6">
        //     <textarea value={props.responseJson} className="form-control" onChange={(e) => this.onResponseJsonChange(e)}>
        //     </textarea>
        // </div>
    )
}

renderSubmitButton = () => {
    return (
        <div style={{marginTop: '25px'}} className="col-md-2">
            <button type="button" className="btn btn-primary" onClick={() => this.onSubmit()}>Submit</button>
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
        marginTop: '10px', 
        // width: '100%'
    }
}