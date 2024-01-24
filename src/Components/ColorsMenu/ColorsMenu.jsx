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
      <h5 className='fw-bolder mb-1'>Main Colors</h5>
      <hr className='mb-3 mt-2 brdr' />
      <div className="row">
      {mainColors.map((color , index) => (<div key={index} className="col-6 col-md-3">
        <div className="colorOption d-flex align-items-center mb-1 justify-content-center">
          <input
            type="checkbox"
            id={color}
            checked={SelectedColors.includes(color)}
            onChange={() => handleColorSelect(color)}
            className='me-1 form-check-input'
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
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}
