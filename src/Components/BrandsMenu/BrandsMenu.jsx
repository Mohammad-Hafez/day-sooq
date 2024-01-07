import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';

export default function BrandsMenu({ ApiBaseUrl, useQuery, axios }) {
  const getFeaturedBrands = () => axios.get(ApiBaseUrl + `brands`);

  const { data } = useQuery('brands-for-menu', getFeaturedBrands, { cacheTime: 300000 });

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandCheckboxChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
  };

  return (
    <>
      <div className="brandsMenu brdr rounded p-3 mb-4">
        <h5 className="fw-bolder mb-4"> Brand </h5>
        <div>
          {data?.data?.data?.data.map((brand) => (
            <div key={brand?._id} className="p-field-checkbox">
              <Checkbox
                inputId={brand?._id}
                value={brand?.name}
                onChange={() => handleBrandCheckboxChange(brand?.name)}
                checked={selectedBrands.includes(brand?.name)}
              />
              <label htmlFor={brand?._id} className="p-checkbox-label">
                {brand?.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
