import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WeatherForecasts';

class CreateDataSource extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  render() {
    return (
      <div>
        <h1>Data Sources</h1>
        <div className="row">
            {renderCreateDataSource(this.props)}
        </div>
        <div className="row">
            {renderDataSources(this.props)}
            {props.isLoading ? <span>Loading...</span> : []}
        </div>
      </div>
    );
  }


 renderDataSources = (props) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Data Source</th>
          <th>Last Updated</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {props.dataSources.map(dataSource =>
          <tr key={dataSource.id}>
            <td>{dataSource.name}</td>
            <td>{dataSource.lastupdated}</td>
            <td><Link to={`/viewdatasource/${datasource.id}`}>View</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
    onNameChange = (e) => {
        this.props.setPropertyValue('name', e.target.value);
    }

    onReadOnlyChange = (e) => {
        console.log('e.target.value', e.target.value);
        this.props.setPropertyValue('readonly', e.target.value);
    }

        renderCreateDataSource = (props) => {

            return (
                    <div>
                        <div className="form-group col-md-3">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter data source name" onChange={(e) => this.onNameChange(e)} />
                            <small className="form-text text-muted">Name to identify this data source.</small>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Read Only</label>
                            <input type="checkbox" className="form-control" onChange={(e) => this.onReadOnlyChange(e)} />
                        </div>
                        {this.renderFields(props)}
                        <div className="row">
                        {this.renderAddField(props)}
                        <button onClick={() => this.onShowAddNewField()} className="btn btn-default">Add New</button>
                        </div>
                    </div>
                );
        }

        renderFields = (props) => {
            <div>
                {props.datasource.fields && props.datasource.fields.length > 0 &&
                    props.datasource.fields.map((field, index) => {
                        return (
                            <div className="row">
                                <div className="col-md-4">{field.name}</div>
                                <div className="col-md-4">{field.datatype}</div>
                            </div>
                        )
                    })
                }
            </div>
        }

        renderAddField = (props) => {
            {this.showAddField && <div>
                <div className="form-group col-md-3">
                    <label>Field Name</label>
                    <input type="text" className="form-control" placeholder="Enter field name" onChange={(e) => this.onFieldNameChange(e)} />
                </div>
                <div className="form-group col-md-3">
                    <label>Data Type</label>
                    <select className="form-control" onChange={(e) => this.onDataTypeChange(e)}>
                        <option value="get">text</option>
                        <option value="post">number</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button type="button" className="btn btn-default" onClick={() => this.onAddField()}>Save</button>
                </div>
            </div>}
        }

        onFieldNameChange = (e) => {
            this.props.setPropertyValue('field.name', e.target.value);
        }

        onDataTypeChange = (e) => {
            this.props.setPropertyValue('field.datatype', e.target.value);
        }
        onShowAddNewField = (e) => {
            this.showAddField = !this.showAddField;
        }
        
        onAddField = () => {
            this.showAddField = false;
            this.props.datasource.fields.push({
                name: this.props.field.name,
                datatype: this.props.field.datatype
            });
        }
}
export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(CreateDataSource);
