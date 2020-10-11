import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorksheetList from '../components/WorksheetList';

export default class WorkshopContainer extends Component {

    state = { worksheets: [] };

    componentDidMount() {
        fetch('http://rolesheetapi.test/api/savedWorksheets')
            .then(response => response.json())
            .then(worksheets => this.setState({worksheets}));
    }

    render() {
        return (
            <WorksheetList worksheets={this.state.worksheets} />
        );
    }

}