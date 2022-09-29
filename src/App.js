import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export default class App extends Component {
  render() {
    return (
      <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<News key="home" category="general"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment"/>} />
            <Route exact path="/business" element={<News key="business" category="business"/>} />
            <Route exact path="/health" element={<News key="health" category="health"/>} />
            <Route exact path="/science" element={<News key="science" category="science"/>} />
            <Route exact path="/sports" element={<News key="sports" category="sports"/>} />
            <Route exact path="/technology" element={<News key="technology" category="technology"/>} />
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