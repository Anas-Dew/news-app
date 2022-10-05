import React from 'react'
// import {Link} from "react-router-dom";
import news_place from './news_place.jpg'
const NewsItem = (props) => {
  
    let {title, description, imageUrl, newsUrl, publishedAt} = props
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl ? imageUrl: news_place} style={{width: "304px", height: "171px"}} className="card-img-top" alt="Not found"/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">Published at {new Date(publishedAt).toUTCString()}</small></p>
              <a href={newsUrl} className="btn btn-primary">Read more</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem

NewsItem.defaultProps = {
  title : "News Title",
  description : "News Description is long text...",
  newsUrl : "/"
}