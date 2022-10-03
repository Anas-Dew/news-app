import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      country: 'Unknown',
      page: 1,
      pageSize: 9,
      category: 'india',
      totalResults: null

    }
  }

  async componentDidMount() {
    this.props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    this.props.setProgress(45);
    document.title = `${capitalize(this.props.category)} - NewsBrief`
    this.setState({
      articles: parsedData.articles,
      country: "India",
      loading: false,
      category: capitalize(this.props.category),
      totalResults: parsedData.totalResults
    })
    this.props.setProgress(100);
  }

  prevPage = async () => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  nextPage = async () => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    })
    window.scrollTo(0, 0)
  }

  fetchMoreData = async () => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=72261af1c361444ea5ccf9c602b6e5b3&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
    let rawData = await fetch(apiUrl)
    let parsedData = await rawData.json()
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false
    })
  };
  render() {

    return (
      <>

        <h3 style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>{`Top headlines in ${this.state.category}`}</h3>

        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Loading />} >
          <div className='container my-3'>

            <div className='row my-4'>

              {this.state.articles.map((story) => {
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
}

export default News