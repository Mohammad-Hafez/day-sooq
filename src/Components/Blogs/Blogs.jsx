import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import { Carousel } from 'primereact/carousel';
        
export default function Blogs({setIsBlogsLoading}) {

  const getBlogs = ()=>{
    return axios.get(ApiBaseUrl + `blogs`);
  };

  let {data , isLoading} = useQuery('Blogs-Slider' , getBlogs);

  let allBlogs = data?.data?.data?.data;

  useEffect(()=>{
    setIsBlogsLoading(isLoading)},
    [isLoading , setIsBlogsLoading]);

    const responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  let blogTemplate = (blog)=>{
    return(
      <div key={blog._id} className='my-2 d-flex justify-content-center align-item-center p-3 normal-blue-text h-100'>
       <div className="blogImage">
         <img src={ImgBaseURL + blog.image} className='img-fluid rounded' alt={blog.title + 'image'} />
       </div>
       <div className="blogInfo grey-brdr my-4 rounded-end p-4 border-start-0 d-flex flex-column">
         <span className="blogDate grey-brdr px-4 py-1 rounded-pill mb-3">
           {blog.createdAt.slice(0, 10)}
         </span>
         <div className="blogTitle mb-4">
          <h5>{blog.title}</h5>
         </div>
         <p>{blog.content}</p>
         <p>{blog.author}</p>
       </div>
     </div>
    )
  }
  return <>
  <div className="blogs-slider-Container light-grey-bg mb-5">
    <div className="container">
      {allBlogs &&
        <Carousel value={allBlogs} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={blogTemplate} />
      }
    </div>
  </div>
    </>
}
