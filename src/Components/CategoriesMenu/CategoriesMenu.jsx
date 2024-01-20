import React, { useState } from 'react';

const CategoriesMenu = ({ ApiBaseUrl, useQuery, axios, setCategory }) => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getAllCategories = () => axios.get(ApiBaseUrl + 'categories');

  const { data } = useQuery('categories-for-menu', getAllCategories, { cacheTime: 300000 });

  const handleCategorySelect = (category) => {
    setCategory(category);
    setSelectedCategory(category); 
  };

  return (
    <>
      <div className="categoriesMenu bg-light rounded p-3 mb-4">
        <h5 className="fw-bolder mb-4"> Categories </h5>
        <h6 className={`mb-3 cursor-pointer ${selectedCategory === null ? 'fw-bolder' : ''}`} onClick={() => handleCategorySelect(null)}>
          ALL
        </h6>
        <div>
          {data?.data?.data?.data.map((category) => (
            <h6
              className={`cursor-pointer ${selectedCategory === category._id ? 'fw-bolder' : ''}`}
              key={category._id}
              onClick={() => handleCategorySelect(category._id)}
            >
              {category.name}
            </h6>
          ))}
        </div>
      </div>
    </>
  );
};
export default CategoriesMenu;
