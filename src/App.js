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
      timeTook: null,
      reportData: null
    });

    let timeTook = Date.now();

    axios.get('http://localhost:5000/report')
      .then((response) => {
        this.setState({
          status: 'success',
          timeTook: Date.now() - timeTook,
          reportData: response.data.report.data
        });
      })
      .catch((error) => {
        this.setState({ status: 'error' });
      });
  }

  render() {
    return (
      <div>
        <div><strong>Status:</strong> {this.state.status}</div>
        {this.renderSpinner()}
        {this.renderTimeTook()}
        {this.renderData()}
        <button
          onClick={this.runReport}
          disabled={this.state.status === 'started'}
        >
          Run!
        </button>
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
        <div><strong>Took:</strong> {this.state.timeTook}ms</div>
      );
    }
  }

  renderData() {
    if (this.state.status === 'success') {
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
