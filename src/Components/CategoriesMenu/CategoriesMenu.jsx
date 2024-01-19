import React from 'react';

export default function CategoriesMenu({ApiBaseUrl , useQuery , axios , setFilterMethod , FilterMethod}) {

  const getAllCategories =  () => axios.get(ApiBaseUrl + `categories`) ;

  let {data} = useQuery('categories-for-menu' , getAllCategories , {cacheTime : 300000})

  const handleCategorySelect = (category)=>{
    setFilterMethod(category)
    console.log(category);
  }

  return <>
      <div className="categoriesMenu bg-light rounded p-3 mb-4">
        <h5 className='fw-bolder mb-4'> Categries </h5> 
        <h6 className='fw-bold mb-3'> ALL </h6>
        <div>
          {data?.data?.data?.data.map((category) => <h6 className='cursor-pointer' key={category?._id} onClick={()=> handleCategorySelect(category?._id)}>{category?.name}</h6>)}
        </div>
    </div>

    </>
}
