import React from 'react';
import { Link } from 'react-router-dom';

const _renderWorksheets = (data) => (
    data.map(row => (
        <tr>
            <td><Link to={`/createworksheet?id=${row.id}`}>{row.name}</Link></td>
            <td>{row.game}</td>
            <td>{row.updated_at}</td>
        </tr>
    ))
);

const WorksheetList = ({ data, mySavedTemplates, workshops  }) => (
    <div>
        <h4>Plantillas</h4>
        <button onClick={workshops}>Workshop</button>
        <button onClick={mySavedTemplates}>Mis plantillas guardadas</button>
        <table className='table'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Game</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                {_renderWorksheets(data)}
            </tbody>
        </table>
    </div>
);

export default WorksheetList;