import './App.css';
import React from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

const App = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [Progress, setProgress] = useState(0)


  return (
    <Router>
      <LoadingBar
        color='#0000008C'
        loaderSpeed={400}
        progress={Progress}
        height={6}
      />
      <NavBar title='NewsBrief' />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="home" category="general" />} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" category="entertainment" />} />
        <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" category="business" />} />
        <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" category="health" />} />
        <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" category="science" />} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" category="technology" />} />
      </Routes>
    </Router>
  )

}

export default App