import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';

export default function PricesMenu({setFilterMethod , FilterMethod}) {
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const handlePriceCheckboxChange = (price) => {
    const updatedPrices = selectedPrices.includes(price)
      ? selectedPrices.filter((selectedPrice) => selectedPrice !== price)
      : [...selectedPrices, price];
    setSelectedPrices(updatedPrices);
    setFilterMethod('price')
  };

  const handleMinPriceChange = (event) => {
    const value = event.value || 0;
    setMinPrice(value);
    setFilterMethod('price')
  };

  const handleMaxPriceChange = (event) => {
    const value = event.value || 100;
    setMaxPrice(value);
    setFilterMethod('price')
  };

  // useEffect(()=>{
  //   if (FilterMethod === 'price' || FilterMethod ==='category') {
  //     setSelectedPrices([]);
  //   }
  // },[FilterMethod])


  return (
    <div className="priceFilter brdr p-3 rounded">
      <h5 className="fw-bolder mb-4">Price</h5>
      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="under100"
          value="under100"
          onChange={() => handlePriceCheckboxChange('under100')}
          checked={selectedPrices.includes('under100')}
        />
        <label htmlFor="under100" className="p-checkbox-label ms-2">
          {'< '}100
        </label>
      </div>

      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="100to200"
          value="100to200"
          onChange={() => handlePriceCheckboxChange('100to200')}
          checked={selectedPrices.includes('100to200')}
        />
        <label htmlFor="100to200" className="p-checkbox-label ms-2">
          100 - 200
        </label>
      </div>
      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="200to300"
          value="200to300"
          onChange={() => handlePriceCheckboxChange('200to300')}
          checked={selectedPrices.includes('200to300')}
        />
        <label htmlFor="200to300" className="p-checkbox-label ms-2">
          200 - 300
        </label>
      </div>

      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="300to400"
          value="300to400"
          onChange={() => handlePriceCheckboxChange('300to400')}
          checked={selectedPrices.includes('300to400')}
        />
        <label htmlFor="300to400" className="p-checkbox-label ms-2">
          300 - 400
        </label>
      </div>
      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="400to500"
          value="400to500"
          onChange={() => handlePriceCheckboxChange('400to500')}
          checked={selectedPrices.includes('400to500')}
        />
        <label htmlFor="400to500" className="p-checkbox-label ms-2">
          400 - 500
        </label>
      </div>
      <div className="p-field-checkbox my-2">
        <Checkbox
          inputId="above500"
          value="above500"
          onChange={() => handlePriceCheckboxChange('above500')}
          checked={selectedPrices.includes('above500')}
        />
        <label htmlFor="above500" className="p-checkbox-label ms-2">
          {'> '} 500
        </label>
      </div>

      <div className="priceRangeSlider">
        <label htmlFor="minPrice">Min Price:</label>
        <InputNumber
          id="minPrice"
          value={minPrice}
          onValueChange={handleMinPriceChange}
          mode="currency"
          currency="USD"
          locale="en-US"
        />

        <label htmlFor="maxPrice">Max Price:</label>
        <InputNumber
          id="maxPrice"
          value={maxPrice}
          onValueChange={handleMaxPriceChange}
          mode="currency"
          currency="USD"
          locale="en-US"
        />
      </div>
    </div>
  );
}