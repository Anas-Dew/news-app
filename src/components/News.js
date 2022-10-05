import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [country, setcountry] = useState('Unknown')
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(9)
  const [category, setcategory] = useState('india')
  const [totalResults, settotalResults] = useState(null)


  const init = async() => {
    props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    props.setProgress(45);
    document.title = `${capitalize(props.category)} - NewsBrief`

    setarticles(parsedData.articles)
    setcountry('india')
    setloading(false)
    setcategory(capitalize(props.category))
    settotalResults(parsedData.totalResults)
    
    props.setProgress(100);
  }
  useEffect(() => {
    init();
  }, [])
  

  const fetchMoreData = async () => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    setpage(page + 1)
    setarticles(articles.concat(parsedData.articles))
    setloading(false)

  };
  

    return (
      <>

        <h3 style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>{`Top headlines in ${category}`}</h3>

        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Loading />} >
          <div className='container my-3'>

            <div className='row my-4'>

              {articles.map((story) => {
                return <div className='col-md-4'>
                  <NewsItem newsUrl={story.url} imageUrl={story.urlToImage} title={story.title} description={story.description} publishedAt={story.publishedAt} />
                </div>
              })}

            </div>
          </div>

        </InfiniteScroll>

      </>
    )
  
}

export default News

News.defaultProps = {
  country: 'in',
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}