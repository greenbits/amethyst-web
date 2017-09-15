import React, { Component } from 'react';
import axios from 'axios';

class ReportRunner extends Component {
  constructor() {
    super();

    this.state = {
      status: 'not started'
    };

    this.runReport = this.runReport.bind(this);
    this.fetchReportStatus = this.fetchReportStatus.bind(this);
  }

  runReport() {
    console.log('Running report...');

    this.setState({
      status: 'started',
      startedAt: Date.now(),
      timeTook: null,
      reportData: null,
      reportId: null
    });

    axios.post('http://localhost:3000/report')
      .then((response) => {
        this.setState({ reportId: response.data.report.id }, () => {
          setTimeout(this.fetchReportStatus, 500);
        });
      })
      .catch((error) => {
        this.setState({ status: 'error' });
      });
  }

  fetchReportStatus() {
    console.log('Fetching report status...');

    const reportId = this.state.reportId;

    axios.get(`http://localhost:3000/report/${reportId}`)
      .then((response) => {
        const report = response.data.report;

        if (report.status === 2) {
          this.setState({
            status: 'success',
            startedAt: null,
            timeTook: Date.now() - this.state.startedAt,
            reportData: response.data.report.data
          });
        } else {
          setTimeout(this.fetchReportStatus, 500);
        }
      })
      .catch((error) => {
        this.setState({ status: 'error' });
      });
  }

  render() {
    return (
      <div>
        <div>
          <strong>Status:</strong> {this.state.status}
        </div>
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
        <div>
          <strong>Took:</strong> {this.state.timeTook}ms
        </div>
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

export default ReportRunner;
