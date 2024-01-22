import React from 'react';

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
    <div className="colorMenu brdr p-3 rounded bg-light">
      <h5 className='fw-bolder mb-3'>Main Colors</h5>
      <div className="row">
      {mainColors.map((color) => (<div className="col-3">
        <div key={color} className="colorOption d-flex align-items-center mb-1 justify-content-center">
          <input
            type="checkbox"
            id={color}
            checked={SelectedColors.includes(color)}
            onChange={() => handleColorSelect(color)}
            className='me-1'
          />
          {/* <label htmlFor={color}>{color}</label> */}
          <label htmlFor={color} className='brdr'
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
