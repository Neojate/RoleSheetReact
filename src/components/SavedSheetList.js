import React, { Component } from 'react';
import { Modal, ModalButton } from './Modal';

export default class SavedSheetList extends Component {

    state = {
        body: [],
        droppedElement: null,
        isCanvas: true,
        pageBackground: '',
        selectedElement: {},
        selectedIndex: -1
    }

    _createInput = (e, size) => {
        let rect = document.getElementById('canvas').getBoundingClientRect();
        return {
            fontSize: 14,
            id: `input${size + 1}`,
            type: 'input',
            visible: true,
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
            visible: true,
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
            visible: true,
            width: 15,
            x: e.pageX - rect.left,
            y: e.pageY - rect.top - window.pageYOffset
        };
    };

    _handleChange = (e) => {
        const { body, selectedIndex } = this.state;
        const { target } = e;
        body[selectedIndex][target.name] = target.dataset.type === 'number' ? Math.trunc(target.value) : target.value;
        this.setState({ body });
    };

    _handleDrop = (e) => {
        const { dragElement, droppedElement } = this.state;

        let element = null
        let body = this.state.body;

        if (dragElement === 'input') {
            element = this._createInput(e, body.length);
        } else if (dragElement === 'textarea') {
            element = this._createTextArea(e, body.length);
        } else if (dragElement === 'checkbox') {
            element = this._createCheckbox(e, body.length);
        } else {
            let rect = document.getElementById('canvas').getBoundingClientRect();
            body.map(el => {
                if (el.id === droppedElement.id) {
                    el.x = e.pageX - rect.left - droppedElement.x;
                    el.y = e.pageY - rect.top - droppedElement.y - window.pageYOffset;
                }
            });
            this.setState({ body });
            return;
        }

        body.push(element);
        this.setState({ body });
    };

    _handleElementDragStart = (e) => {
        let rect = e.target.getBoundingClientRect();
        let droppedElement = {
            id: e.target.id,
            x: ~~(e.pageX - rect.x),
            y: ~~(e.pageY - rect.y - window.pageYOffset)
        };
        this.setState({ droppedElement, dragElement: '' });
    };

    _handleVisibility = (e) => {
        const { body, selectedIndex } = this.state;
        body[selectedIndex].visible = !body[selectedIndex].visible;
        this.setState({ body });
    };

    handleClickElement = (e) => {
        const { body } = this.state;
        let selectedIndex = body.findIndex(i => i.id === e.target.id);
        this.setState({ selectedIndex });
    }

    handleDelete = (e) => {
        const { body, selectedIndex } = this.state;
        let newBody = body.filter((value, index, array) => { return index !== selectedIndex });
        this.setState({ body: newBody });
    };

    handlePageBackground = (e) => {
        this.setState({ pageBackground: e.target.value });
    };

    componentDidUpdate(prepProps) {
        const { currentIndexPage, page } = this.props;
        if (prepProps.currentIndexPage !== currentIndexPage) {
            this.setState({
                body: page.body,
                pageBackground: page.pageBackground
            });
        }
    }

    render() {

        const { body, pageBackground, selectedIndex } = this.state;
        const { changePage, createNewPage, currentIndexPage, deletePage, maxPages, saveSheet } = this.props;
        const selectedElement = selectedIndex !== - 1 ? body[selectedIndex] : {};

        const renderBody = body.map((prop, index) => {
            if (prop.type === 'input')
                return <CanvasInput click={this.handleClickElement} drag={this._handleElementDragStart} prop={prop} index={index} />
            if (prop.type === 'textarea')
                return <CanvasTextArea click={this.handleClickElement} drag={this._handleElementDragStart} prop={prop} index={index} />
            if (prop.type === 'checkbox')
                return <CanvasCheckbox click={this.handleClickElement} drag={this._handleElementDragStart} prop={prop} index={index} />
            return <></>
        });

        return (

            <div className='mt-4'>

                {/* PANEL DE CONTROL */}
                <div className="control-panel my-4">
                    <div className="separator">
                        <button
                            disabled={currentIndexPage === 0}
                            className={currentIndexPage !== 0 ? 'page-active' : ''}
                            onClick={() => changePage(currentIndexPage - 1, { pageBackground, body })}>
                            <i class="fas fa-caret-left"></i>
                        </button>
                        <span className="mx-4">Página: {currentIndexPage + 1} / {maxPages}</span>
                        <button
                            disabled={currentIndexPage === maxPages - 1}
                            onClick={() => changePage(currentIndexPage + 1, { pageBackground, body })}>
                            <i class="fas fa-caret-right"></i>
                        </button>
                        <button className="ml-4" onClick={() => createNewPage({ pageBackground, body })}>
                            <i class="fas fa-plus-square"></i>
                        </button>
                    </div>
                    <div className="cp-controls">
                        <div
                            draggable
                            onDragStart={() => this.setState({ dragElement: 'input' })}>
                            <i class="fas fa-keyboard"></i>
                        </div>
                        <div
                            draggable
                            onDragStart={() => this.setState({ dragElement: 'textarea' })}>
                            <i class="fas fa-paragraph"></i>
                        </div>
                        <div
                            draggable
                            onDragStart={() => this.setState({ dragElement: 'checkbox' })}>
                            <i class="fas fa-check-square"></i>
                        </div>
                        <ModalButton modalId='pageBackgroundModal'>
                            <i class='far fa-image'></i>
                        </ModalButton>
                        <ModalButton modalId='deletePageModal'>
                            Deletepage
                        </ModalButton>
                    </div>
                    <div>
                        <button onClick={() => saveSheet({ pageBackground, body })}>Save</button>
                        <button>Upload</button>
                    </div>
                </div>

                {/* CANVAS */}
                <div
                    className='canvas'
                    id='canvas'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={this._handleDrop}
                    style={{ backgroundImage: `url(${pageBackground})` }}>
                    {renderBody}

                    {/* panel de props */}
                    {selectedElement != null ? <PropPanel
                        change={this._handleChange}
                        click={this._handleVisibility}
                        del={this.handleDelete}
                        selectedElement={selectedElement} /> : ''}

                </div>

                {/* POPUPS */}
                <Modal id='pageBackgroundModal'>
                    <p>
                        Inserta aquí la URL de una imagen para establecerla como fondo de la página.
                    </p>
                    <input className="form-control" onChange={this.handlePageBackground} />
                </Modal>
                <Modal id='deletePageModal'>
                    Está seguro que quiere borrar la página?
                    <button onClick={() => deletePage(currentIndexPage)}>Yes</button>
                </Modal>

            </div >

        );

    }

}

const CanvasInput = ({ click, drag, index, prop }) => (
    <input
        key={index}
        className={`canvas-input ${!prop.visible ? 'visible' : ''}`}
        draggable
        id={prop.id}
        onClick={click}
        onDragStart={drag}
        style={{
            fontSize: prop.fontSize,
            left: prop.x,
            top: prop.y,
            width: prop.width
        }} />
);

const CanvasTextArea = ({ click, drag, index, prop }) => (
    <textarea
        key={index}
        className={`canvas-input ${!prop.visible ? 'visible' : ''}`}
        draggable
        id={prop.id}
        onClick={click}
        onDragStart={drag}
        style={{
            fontSize: prop.fontSize,
            left: prop.x,
            top: prop.y,
            width: prop.width,
            height: prop.height
        }}>
    </textarea>
);

const CanvasCheckbox = ({ click, drag, index, prop }) => (
    <div
        key={index}
        className={`canvas-input input-checked ${!prop.visible ? 'visible' : ''}`}
        draggable
        id={prop.id}
        onClick={click}
        onDragStart={drag}
        style={{
            borderRadius: '50%',
            height: prop.width,
            left: prop.x,
            top: prop.y,
            width: prop.width
        }}>
    </div>
);

const PropInput = ({ change, name, type, value }) => (
    <input className='prop-number-input' data-type={type} name={name} onChange={change} value={value !== null ? value : ''} />
);

const PropPanel = ({ change, click, del, selectedElement }) => (
    <div
        className="prop-panel"
        style={{
            left: selectedElement.x,
            top: selectedElement.y - 40
        }}>
        <div className="mr-3">
            x: <PropInput name='x' change={change} type='number' value={Math.trunc(selectedElement.x)} />
        </div>
        <div className="mr-3">
            y: <PropInput name='y' change={change} type='number' value={selectedElement.y} />
        </div>
        <div className="mr-3">
            w: <PropInput name='width' change={change} type='number' value={selectedElement.width} />
        </div>
        <div className="mr-3">
            h: <PropInput name='height' change={change} type='number' value={selectedElement.height} />
        </div>
        <div className="mr-3">
            <i class="fas fa-text-height"></i> <PropInput name='fontSize' change={change} type='number' value={selectedElement.fontSize} />
        </div>
        <div className="mr-3">
            <button onClick={click}>
                {selectedElement.visible ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>}
            </button>
        </div>
        <div className="mr-3">
            <button onClick={del}>
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
);
