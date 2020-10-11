import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class WorksheetList extends Component {

    _renderWorksheets() {
        return this.props.worksheets.map(worksheet => (
            <tr>
                <td><Link to={`/createworksheet?id=${worksheet.id}`}>{worksheet.name}</Link></td>
                <td>{worksheet.game}</td>
                <td>{worksheet.updated_at}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <h4>Plantillas</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Game</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderWorksheets()}
                    </tbody>
                </table>
            </div>
        );
    }
}