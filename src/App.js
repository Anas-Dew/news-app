import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export default class App extends Component {
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  };

  render() {

    return (
      <Router>
        <LoadingBar
        color='#0000008C'
        loaderSpeed={400}
        progress={this.state.progress}
        height={6}
      />
          <NavBar title='NewsBrief'/>
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="home" category="general"/>} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment"/>} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category="business"/>} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" category="health"/>} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology"/>} />
          </Routes>
      </Router>
    )
  }
}

// business
// entertainment
// general
// health
// science
// sports
// technology