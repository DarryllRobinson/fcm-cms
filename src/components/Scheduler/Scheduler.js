import React, { Component } from 'react';
//import Nav from '../Nav';
//import Upload from '../Upload/Upload';
import {Industry} from './Industry';
import { Category } from './Category';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import history from '../../history';

import './react-datepicker.css';
import './Scheduler.css';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auto: false,
      name: '',
      flightings: 0,
      startDate: moment(),
      endDate: moment(),
      industry: '',
      category: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  handleClick() {

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    console.log('logging: ',
    [
      this.state.auto.toString(),
      this.state.name.toString(),
      this.state.flightings.toString(),
      this.state.startDate.format(),
      this.state.endDate.format(),
      this.state.industry.toString(),
      this.state.category.toString(),
      'TBM'
    ]);
  }

  handleChangeStart(date) {
    this.setState({ startDate: date })
  }

  handleChangeEnd(date) {
    this.setState({ endDate: date })
  }

  uploadWidget = () => {
    let myTags = [
      this.state.auto.toString(),
      this.state.name.toString(),
      this.state.flightings.toString(),
      this.state.startDate.format(),
      this.state.endDate.format(),
      this.state.industry.toString(),
      this.state.category.toString(),
      'TBM'
    ];

    window.cloudinary.openUploadWidget( {
      cloud_name: 'flycrow',
      upload_preset: 'ubx3ytwg',
      tags: myTags,
      sources: ['local', 'url']
    },
      function(error, result) {
        if (result) {
          //console.log("This is the result of the last upload", result);
          history.push(`/success`);
        } else {
          history.push('/fail');
        }
      });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      {
        isAuthenticated() && (
          <div>
        <h3 className="text-center">Scheduler</h3>
        <hr/>

        <div className="container justify-content-xs-center" onChange={this.handleChange}>
          {/*<h4>Campaign Details</h4>*/}
          <div className="row justify-content-xs-center pl-1">
            <div className="col col-xs-12">
              <input type="text" name="name" placeholder="Campaign Name" />
            </div>
          </div>

          <div className="row justify-content-xs-center pt-2 pl-1">
            <div className="col col-xs-4 col-md-3 pt-1">
              Auto Schedule
            </div>

            <div className="col col-xs-1 col-md-2 pt-1">
              <input type="checkbox"
                name="auto" />
            </div>

            <div className="col col-xs-5 col-md-4 pt-1">
              Number of flightings
            </div>

            <div className="col col-xs-2 col-md-3 pt-1">
              <input type="number"
                id="flight"
                name="flightings"
                placeholder="0"
                onChange={this.handleChange}/>
            </div>
          </div>

          <div className="row justify-content-xs-center pt-2 pl-1">
            <div className="col col-xs-6 col-md-6 mb-2 pt-1">
              <Industry
                name="industry"
                value={this.state.industry}
                onChange={this.handleChange} />
            </div>

            <div className="col col-xs-6 col-md-6 mb-2 pt-1">
              <Category
                name="category"
                value={this.state.category}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className="row justify-content-xs-center pt-2 pl-1">
            <div className="col col-xs-12 col-md-6 mb-2 pt-1">
              Start Date and Time
              <DatePicker
                dateFormat="YYYY/MM/DD HH:mm"
                name="startDate"
                todayButton={"Today"}
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
                showTimeSelect
                timeCaption="Time"
                timeFormat="HH:mm"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                showWeekNumbers
                selectsStart />
            </div>
            <div className="col col-xs-12 col-md-6 mb-2 pt-1">
              End Date and Time
              <DatePicker
                dateFormat="YYYY/MM/DD HH:mm"
                name="endDate"
                todayButton={"Today"}
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
                showTimeSelect
                timeCaption="Time"
                timeFormat="HH:mm"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                showWeekNumbers
                selectsEnd />
            </div>
          </div>
          <div className="text-center">{/*<input placeholder="Content Tag" onChange={this.handleTagChange}></input>*/}
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info m-3">Upload Content</button>
          </div>
        </div>
        </div>
      )}
      </div>
    );
  }
}

export default Scheduler;
