import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export default function PricesMenu({ setPrice }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (event) => {
    const value = event.value || 0;
    updatePrices(value, maxPrice);
  };

  const handleMaxPriceChange = (event) => {
    const value = event.value || 1000;
    updatePrices(minPrice, value);
  };

  const updatePrices = (newMin, newMax) => {
    if (newMin > newMax) {
      setMinPrice(newMax);
      setMaxPrice(newMin);
    } else {
      setMinPrice(newMin);
      setMaxPrice(newMax);
    }
  };

  return (
    <div className="priceFilter brdr p-3 rounded">
      <h5 className="fw-bolder mb-4">Price</h5>
      <div className="priceRangeSlider">
        <label htmlFor="minPrice">Min Price:</label>
        <InputNumber
          id="minPrice"
          value={minPrice}
          onValueChange={handleMinPriceChange}
          mode="currency"
          currency="JOD"
          locale="en-US"
          minFractionDigits={0}
        />

        <label htmlFor="maxPrice">Max Price:</label>
        <InputNumber
          id="maxPrice"
          value={maxPrice}
          onValueChange={handleMaxPriceChange}
          mode="currency"
          currency="JOD"
          locale="en-US"
          minFractionDigits={0}
        />
      </div>
    </div>
  );
}
