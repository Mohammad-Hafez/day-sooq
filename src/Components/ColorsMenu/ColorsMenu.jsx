import React from 'react'
export default function ColorsMenu({SelectedColors , setSelectedColors}) {
  const mainColors = ['black', 'white', 'red', 'blue', 'green', 'yellow']; // Add more colors as needed
  const handleColorSelect = (color) => {
    if (SelectedColors.includes(color)) {
      setSelectedColors(SelectedColors.filter(selectedColor => selectedColor !== color));
    } else {
      setSelectedColors([...SelectedColors, color]);
    }
  };
  
  return <>
  <div className="colorMenu">
      {mainColors.map(color => (
        <div key={color}>
          <input
            type="checkbox"
            id={color}
            checked={SelectedColors.includes(color)}
            onChange={() => handleColorSelect(color)}
          />
          <label htmlFor={color}>{color}</label>
        </div>
      ))}

  </div>
    </>
}
