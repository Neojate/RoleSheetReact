import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorksheetList from '../components/WorksheetList';

export default class WorkshopContainer extends Component {

    state = { data: [] };

    componentDidMount() {
        /* CAMBIAR EL VALOR INICIAL POR ALGO MÁS PRECISO */
        fetch('http://rolesheetapi.test/api/savedWorksheets')
            .then(response => response.json())
            .then(worksheets => this.setState({ data: worksheets }));
    }

    getMySavedTemplates = () => {
        const { sub } = this.props.user;
        fetch(`http://rolesheetapi.test/api/savedWorksheets/${sub}`)
            .then(response => response.json())
            .then(worksheets => this.setState({ data: worksheets }));
    }

    getWorkshops = () => {
        fetch('http://rolesheetapi.test/api/workshops')
            .then(response => response.json())
            .then(workshops => this.setState({ data: workshops }));
    }

    render() {
        return (
            <WorksheetList
                data={this.state.data}
                mySavedTemplates={this.getMySavedTemplates}
                workshops={this.getWorkshops} />
        );
    }

}