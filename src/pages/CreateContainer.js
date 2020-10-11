import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PopUp from '../components/Popup';

export class CreateContainer extends Component {

    state = {
        canvasBg: '',
        errorworksheetGame: false,
        errorworksheetName: false,
        i: -1,
        id: 6,
        inputs: [],
        isCanvas: true,
        textareas: [],
        typeElement: '',
        worksheetGame: '',
        worksheetName: ''
    };

    _createInput = (e, size) => {
        let rect = document.getElementById('canvas').getBoundingClientRect();
        return {
            fontSize: 14,
            id: `input${size + 1}`,
            type: 'input',
            validated: false,
            width: 200,
            x: e.pageX - rect.left,
            y: e.pageY - rect.top - window.pageYOffset
        };
    };

    _createTextArea = (e, size) => {
        let rect = document.getElementById('canvas').getBoundingClientRect();
        return {
            fontSize: 14,
            height: 100,
            id: `area${size + 1}`,
            type: 'textarea',
            validated: false,
            width: 200,
            x: e.pageX - rect.left,
            y: e.pageY - rect.top - window.pageYOffset
        };
    };

    _createCheckbox = (e, size) => {
        let rect = document.getElementById('canvas').getBoundingClientRect();
        return {
            checked: false,
            height: 15,
            id: `checkbox${size + 1}`,
            type: 'checkbox',
            width: 15,
            x: e.pageX - rect.left,
            y: e.pageY - rect.top - window.pageYOffset
        };
    };

    _handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    _handleInputChange = (e) => {
        e.preventDefault();
        const { name, type, value } = e.target;
        const { inputs, i } = this.state;
        inputs[i][name] = type === 'text' ? value : ~~value;
        this.setState({ inputs });
    };

    _handleSelectChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const { i, inputs } = this.state;
        inputs[i][name] = value;
        this.setState({ inputs });
    };

    _handleHistoricDelete = (index) => {
        const { inputs } = this.state;
        let newInputs = inputs.filter(function (value, i, array) { return i != index });
        this.setState({ inputs: newInputs });
    };

    _handleHistoricVisible = (index) => {
        const { inputs } = this.state;
        inputs[index].validated = !inputs[index].validated;
        this.setState({ inputs });
    };

    _handleHistoricClick = (index) => {
        const { inputs } = this.state;
        this.setState({ i: index, isCanvas: false, typeElement: inputs[index].type });
    };

    _handleDrop = (e) => {
        e.persist();
        const { typeElement } = this.state;
        let element = null;
        let inputs = this.state.inputs;

        if (typeElement === 'input')
            element = this._createInput(e, inputs.length);
        else if (typeElement === 'textarea')
            element = this._createTextArea(e, inputs.length);
        else
            element = this._createCheckbox(e, inputs.length);

        inputs.push(element);
        this.setState({ inputs });
    };

    _handleInputClick = (e) => {
        const { inputs } = this.state;
        this.setState({ isCanvas: false });
        let index = inputs.findIndex(i => i.id === e.target.innerHTML);
        if (index >= 0) {
            this.setState({ i: index });
            this.setState({ typeElement: inputs[index].type });
        }
    };

    _handleSaveClick = (e) => {

        const fields = ['worksheetGame', 'worksheetName'];
        if (!this._validateInputs(fields)) return;

        const { canvasBg, id, inputs, worksheetGame, worksheetName } = this.state;
        fetch('http://rolesheetapi.test/api/saveWorkSheet', {
            method: 'POST',
            body: JSON.stringify({ canvasBg, id, inputs, worksheetGame, worksheetName })
        })
            .then(response => response.json())
            .then(json => { document.getElementById('close-popup').click() });
    };

    _validateInputs = (fields) => {
        let haveError = false;
        fields.map(field => {
            if (this.state[field] === '') {
                this.setState({ [`error${field}`]: true });
                haveError = true;
            } else {
                this.setState({ [`error${field}`]: false });
            }
        });
        return !haveError;
    }

    _renderInput = (name, text, type) => {
        const { inputs, i } = this.state;
        return (
            <div>
                <div>{text}:</div>
                <input
                    name={name}
                    type={type}
                    onChange={this._handleInputChange}
                    value={i >= 0 ? inputs[i][name] : ''} />
            </div>
        );
    };

    _renderInputPopUp = (name, placeHolderId, textId, type) => (
        <div className='popup-input'>
            <div><FormattedMessage id={textId} />:</div>
            <input
                className={`form-control ${this.state['error' + name] ? 'input-error' : ''}`}
                name={name}
                onChange={this._handleChange}
                placeholder={<FormattedMessage id='placeHOlderId' />}
                type={type}
                value={this.state[name]} />
        </div>
    );

    _renderPopUp = () => {
        return (
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><FormattedMessage id='worksheet.save' /></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this._renderInputPopUp('worksheetName', 'worksheet.placeholdername', 'worksheet.name', 'text')}
                            {this._renderInputPopUp('worksheetGame', 'For example: D&D 5', 'Game', 'text')}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" id="close-popup">
                                <FormattedMessage id="worksheet.closebutton" />
                            </button>
                            <button className="btn btn-primary" onClick={this._handleSaveClick}>
                                <FormattedMessage id="worksheet.savebutton" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const url = new URL(document.location);

        if (!url.searchParams.has('id')) return;

        const id = url.searchParams.get('id');
        fetch(`http://rolesheetapi.test/api/savedWorksheet/${id}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    canvasBg: json.image,
                    id: json.id,
                    inputs: json.inputs !== null ? JSON.parse(json.inputs) : [],
                    worksheetGame: json.game,
                    worksheetName: json.name
                });
            });
    }

    render() {
        const { canvasBg, canvasName, inputs, isCanvas, i, textareas, typeElement } = this.state;

        const canvasInput = inputs.map((newInput, index) => {
            if (newInput.type === 'input') {
                return <input
                    key={index}
                    className={`canvas-input ${newInput.validated ? 'validated' : ''}`}
                    id={newInput.id}
                    onClick={this._handleInputClick}
                    style={{
                        fontSize: newInput.fontSize,
                        left: newInput.x,
                        top: newInput.y,
                        width: newInput.width
                    }} />
            } else if (newInput.type === 'textarea') {
                return <textarea
                    key={index}
                    className={`canvas-input ${newInput.validated ? 'validated' : ''}`}
                    id={newInput.id}
                    style={{
                        fontSize: newInput.fontSize,
                        left: newInput.x,
                        top: newInput.y,
                        width: newInput.width,
                        height: newInput.height
                    }}>

                </textarea>;
            } else {
                return <div
                    key={index}
                    className={`canvas-input input-checked ${newInput.validated ? 'validated' : ''} ${newInput.checked ? 'checked' : ''}`}
                    id={newInput.id}
                    onClick={(e) => { newInput.checked = !newInput.checked }}
                    style={{
                        backgroundColor: newInput.checked ? newInput.backgroundColor : 'transparent',
                        height: newInput.width,
                        left: newInput.x,
                        top: newInput.y,
                        width: newInput.width
                    }}>
                </div>
            }
        });

        const historicalDiv = inputs.map((newInput, index) =>
            <div
                className="historic-div"
                key={index}>
                <div onClick={(e) => { this._handleHistoricClick(index) }}>
                    {newInput.id}
                </div>
                <div
                    className='historic-visible'
                    onClick={(e) => { this._handleHistoricVisible(index) }}>
                    <i className={newInput.validated ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                </div>
                <div
                    className='historic-delete'
                    onClick={(e) => { this._handleHistoricDelete(index) }}>
                    <i className="far fa-trash-alt"></i>
                </div>
            </div>
        );

        const canvasPropsPanel = (
            <div className='props-panel'>
                <div>
                    <div>Image:</div>
                    <input
                        type='text'
                        name='canvasBg'
                        onChange={this._handleChange}
                        value={canvasBg} />
                </div>
                <div>
                    <div>Name:</div>
                    <input
                        type='text'
                        name='canvasName'
                        onChange={this._handleChange}
                        value={canvasName} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <button data-toggle="modal" data-target="#exampleModal">
                        <FormattedMessage id='worksheet.savebutton' />
                    </button>
                    <button>Publicar</button>
                </div>
            </div>
        );

        const inputPropsPanel = (
            <div className="props-panel mt-4">
                <form className="form-props">
                    {this._renderInput('id', 'Id', 'text')}
                    {this._renderInput('x', 'X', 'number')}
                    {this._renderInput('y', 'Y', 'number')}
                    {this._renderInput('width', 'Width', 'number')}
                    {typeElement === 'textarea' ? this._renderInput('height', 'Height', 'number') : ''}
                    {typeElement !== 'checkbox' ? this._renderInput('fontSize', 'FontSize', 'number') : ''}
                    {typeElement === 'checkbox' ?
                        (<select name="backgroundColor" onChange={this._handleSelectChange}>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                        </select>) : ''}
                </form>
            </div>
        );

        return (
            <div className='mt-4' >

                {/* CANVAS */}
                < div
                    className='canvas'
                    id='canvas'
                    onClick={(e) => { this.setState({ isCanvas: true }) }}
                    onDragOver={(e) => { e.preventDefault() }}
                    onDrop={this._handleDrop}
                    style={{ backgroundImage: `url(${canvasBg})` }}>
                    {canvasInput}
                </div >

                <div className='panels'>

                    {/* PANEL DE INPUTS */}
                    < div className='input-panel' >
                        <div
                            draggable
                            onDragStart={(e) => { this.setState({ typeElement: 'input' }) }}>
                            <i className="fas fa-keyboard"></i>
                        </div>
                        <div
                            draggable
                            onDragStart={(e) => { this.setState({ typeElement: 'textarea' }) }}>
                            <i class="fas fa-align-left"></i>
                        </div>
                        <div
                            draggable
                            onDragStart={(e) => { this.setState({ typeElement: 'checkbox' }) }}>
                            <i class="fas fa-check-square"></i>
                        </div>
                    </div >

                    {/* PANEL DE HISTORICO */}
                    < div className='historic-panel' >
                        {historicalDiv}
                    </div >

                    {/* PANEL DE PROPS */}
                    {isCanvas ? canvasPropsPanel : inputPropsPanel}

                    {/* POPUP */}
                    {this._renderPopUp()}

                </div>

            </div >
        );
    }

}