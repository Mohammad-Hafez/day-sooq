import React, { useState } from 'react';

export default function SizeMenu({ setSize }) {
  const sizes = ['64GB', '128GB', '256GB', '512GB', '1GB' , 'no size'];
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null); 
      setSize();
    } else {
      setSelectedSize(size);
      setSize(size);
    }
  };

  return (
    <>
      <div className="sizeMenu brdr p-3 rounded mb-4">
        <h5 className='fw-bolder mb-1'>
          Sizes
        </h5>
        <hr className='mb-3 mt-2 brdr' />

        <div className="sizeButtons">
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`btn ${selectedSize === size ? 'btn-secondary' : 'btn-outline-secondary'} me-2 mb-2`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
