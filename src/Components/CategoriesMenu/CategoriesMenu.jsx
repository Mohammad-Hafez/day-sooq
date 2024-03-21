import React, { useEffect, useState } from 'react';

const CategoriesMenu = ({ ApiBaseUrl, useQuery, axios, setCategory ,AllProductsFetch}) => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getAllCategories = () => axios.get(ApiBaseUrl + 'categories');

  const { data } = useQuery('categories-for-menu', getAllCategories, { cacheTime: 300000 });

  const handleCategorySelect = (category) => {
    setCategory(category);
    setSelectedCategory(category); 
  };

  useEffect(()=>{
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
      if (category.dataset.id === selectedCategory) {
        category.classList.add('fw-bolder','ps-2');
      } else {
        category.classList.remove('fw-bolder','ps-2');
      }
    });
  }, [selectedCategory]);

  return (
    <>
      <div className="categoriesMenu bg-light rounded p-3 mb-4">
        <h5 className="fw-bolder mb-1"> Categories </h5>
        <hr className='mb-3 mt-2 brdr' />
        <h6 className={`mb-3 cursor-pointer ${selectedCategory === null ? 'fw-bolder ps-2' : ''}`} onClick={() => handleCategorySelect(null)}>
          ALL
        </h6>
        <div>
          {data?.data?.data?.data.map((category) => (
            <h6
              className="category cursor-pointer"
              data-id={category._id}
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
