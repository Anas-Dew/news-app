import React, { Component } from 'react'
import loading_gif from  './loading.gif'
export default class loading extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center'>
        <img src={loading_gif} alt="loading..."/>
      </div>
    )
  }
}