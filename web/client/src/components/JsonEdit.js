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
        {renderJson(this.props)}
      </div>
    );
  }
}

function renderJson(props) {
  return (
    <div/>
  );
}


export default connect(
  state => state.jsonBlock,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(JsonEdit);
