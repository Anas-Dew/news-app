import React from 'react'
import loading_gif from  './loading.gif'
const loading = () => {
  
    return (
      <div className='d-flex justify-content-center mb-4'>
        <img src={loading_gif} alt="loading..."/>
      </div>
    )
  
}
export default loading