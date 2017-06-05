import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      status: 'not started'
    };

    this.runReport = this.runReport.bind(this);
  }

  runReport() {
    console.log('Running report...');

    this.setState({
      status: 'started',
      timeTook: null
    });

    let timeTook = Date.now();

    axios.get('http://localhost:3000/report')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          status: 'success',
          timeTook: Date.now() - timeTook,
          reportData: response.data.data
        });
      })
      .catch((error) => {
        this.setState({ status: 'error' });
      });
  }

  render() {
    return (
      <div>
        <div>Status: {this.state.status}</div>
        {this.renderSpinner()}
        {this.renderTimeTook()}
        {this.renderData()}
        <button onClick={this.runReport}>Run!</button>
      </div>
    );
  }

  renderSpinner() {
    if (this.state.status === 'started') {
      return (
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      );
    }
  }

  renderTimeTook() {
    if (this.state.timeTook) {
      return (
        <div>Took: {this.state.timeTook}ms</div>
      );
    }
  }

  renderData() {
    if (this.state.reportData) {
        return (
          <div>
            <strong>Report data:</strong>
            {this.renderReportData()}
          </div>
        );
    }
  }

  renderReportData() {
    return Object.keys(this.state.reportData).map((key) => {
      return (
        <div key={key}>{key}: {this.state.reportData[key]}</div>
      );
    });
  }
}

export default App;
