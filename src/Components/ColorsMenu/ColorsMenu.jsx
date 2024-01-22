import React from 'react';
import { Tooltip } from 'primereact/tooltip';
        
export default function ColorsMenu({ SelectedColors, setSelectedColors }) {
  const mainColors = ['black', 'white', 'red', 'blue', 'green', 'yellow'];

  const handleColorSelect = (color) => {
    if (SelectedColors?.includes(color)) {
      setSelectedColors(SelectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...SelectedColors, color]);
    }
  };

  return (
    <div className="colorMenu brdr p-3 rounded bg-light mb-4">
      <h5 className='fw-bolder mb-3'>Main Colors</h5>
      <div className="row">
      {mainColors.map((color , index) => (<div key={index} className="col-3">
        <div className="colorOption d-flex align-items-center mb-1 justify-content-center">
          <input
            type="checkbox"
            id={color}
            checked={SelectedColors.includes(color)}
            onChange={() => handleColorSelect(color)}
            className='me-1'
          />
          <Tooltip target=".filterdColor" />
          <label htmlFor={color} className='brdr filterdColor'
           data-pr-tooltip={color}
           data-pr-position="right"
           data-pr-at="right+5 top"
           data-pr-my="left center-2"
            style={{
              background: `${color}`,
              opacity:.7,
              width: 20,
              height: 20,
              display: 'inline-block',
              marginLeft: 5,
              
            }}
          ></label>
          {/* <label htmlFor={color}>{color}</label> */}
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}
