import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/JsonBlock';

class JsonEdit extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
  }

  render() {
    return (
      <div>
        <h1>JSON Editor</h1>
        {this.renderJson(this.props)}
      </div>
    );
  }


renderJson = (props) => {
  return (
        <div className="form-group col-md-6">
            <label>JSON</label>
            <textarea rows="10" value={props.jsonValue} className="form-control" onChange={(e) => this.onJsonValueChange(e)}>
            </textarea>
        </div>
    )
}

onJsonValueChange = (e) => {
  console.log('e', e);
  this.props.SetPropertyValue('jsonValue', e.target.value);
}

}
export default connect(
  state => state.jsonBlock,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(JsonEdit);
