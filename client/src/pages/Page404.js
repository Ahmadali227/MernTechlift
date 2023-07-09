import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate= useNavigate();
  return (
    <div>
     <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      {/* <img className="not-found-image" src="/path/to/error-image.png" alt="Error" /> */}
     <Link className='btn btn-primary' to ='/login'>Login Page</Link>
    </div>
    </div>
  )
}

export default Page404
