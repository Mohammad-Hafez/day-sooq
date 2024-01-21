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
    <div className="colorMenu brdr p-3 rounded">
      <h5 className='fw-bolder mb-3'>Colors</h5>
      {mainColors.map((color) => (
        <div key={color} className="colorOption d-flex align-items-center mb-1">
          <input
            type="checkbox"
            id={color}
            checked={SelectedColors.includes(color)}
            onChange={() => handleColorSelect(color)}
            className='me-1'
          />
          <label htmlFor={color}>{color}</label>
          {/* <span
            style={{
              background: `linear-gradient(182deg, #F2Ffff 0%, ${color} 100%)`,
              width: 20,
              height: 20,
              display: 'inline-block',
              marginLeft: 5,
            }}
          ></span> */}
        </div>
      ))}
    </div>
  );
}
