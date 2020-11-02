import React from 'react';

const PropPanel = ({ change, selectedElement }) => {

    const height = selectedElement.type === 'textarea' ?
        <HeightInput change={change} selectedElement={selectedElement} /> : <></>

    return (
        <div
            className="prop-panel"
            style={{
                left: selectedElement.x,
                top: selectedElement.y - 40
            }}>
            <div className="mr-3">
                x: <PropInput name="x" change={change} type="number" value={Math.trunc(selectedElement.x)} />
            </div>
            <div>
                y: <PropInput name="y" change={change} type="number" value={selectedElement.y} />
            </div>
            <div>
                w: <PropInput name="width" change={change} type="number" value={selectedElement.width} />
            </div>
            {height}
        </div>
    );
};

const PropInput = ({ change, name, type, value }) => (
    <input className='prop-number-input' data-type={type} name={name} onChange={change} value={value !== null ? value : ''} />
);

const HeightInput = ({ change, selectedElement }) => (
    <div>
        height: <PropInput name="h" change={change} type="number" value={selectedElement.height} />
    </div>
);

export default PropPanel;