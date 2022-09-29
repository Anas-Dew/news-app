import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }


  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      country : 'Unknown',
      page : 1,
      pageSize : 9

    }
  }
  
  async componentDidMount(){
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData =await rawData.json()
    this.setState({
      articles : parsedData.articles,
      country: "India",
      loading : false
    })

  }

  prevPage = async() => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData =await rawData.json()
    this.setState({
      articles : parsedData.articles,
      page : this.state.page - 1
    })
  }

  nextPage = async() => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData =await rawData.json()
    this.setState({
      articles : parsedData.articles,
      page : this.state.page + 1,
      loading : false
    })
    window.scrollTo(0,0)
  }

  render() {
    
    return (
      <>
        <div className='container my-3'>
          <h3>Top headlines in {this.state.country}</h3>
          <div className='row my-4'>
          {this.state.articles.map((story) => {
            return <div className='col-md-4'>
              <NewsItem newsUrl={story.url} imageUrl={story.urlToImage} title={story.title} description={story.description} publishedAt={story.publishedAt}/>
            </div>
          })}

          </div>
          { this.state.loading && <Loading/>}

          <div className="mt-5 d-flex justify-content-center">
            <button disabled={this.state.page <= 1} onClick={this.prevPage} type="button" className="btn btn-dark mx-2">&larr; Previous</button>
            <button onClick={this.nextPage} type="button" className="btn btn-dark">Next &rarr;</button>
          </div>

        </div>
      </>
    )
  }
}

export default News