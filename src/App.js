import React, { useState, useEffect, useContext } from 'react'

import Loading from './components/Loading'
import NewsList from './components/NewsList'
import Topbar from './components/Topbar'

import './index.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [thenews, setTheNews] = useState([])
  const [search, setSearch] = useState('breaking news')

  var api_key = process.env.REACT_APP_API_KEY

  const d = new Date();
  const todays_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`.toString()
  const url = `https://gnews.io/api/v4/search?q=${search}&token=${api_key}
    &max=7&in=title&from=${todays_date}&lang=en`

  const removeNews = (url) => {
    const newTheNews = thenews.filter((news) => news.url !== url)
    setTheNews(newTheNews)
  }

  const fetchTheNews = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await fetch(url);
      const news_items = await response.json();
      const news_articles = news_items.articles
      setLoading(false);
      setTheNews(news_articles)
    } catch (error) {
      if (error.status === 429) {
        setLoading(false)
        return (
          <div className="loading">
            <h1>Too many requests! This free API is /very/ rate-limited.</h1>
          </div>
        )
      }
      else {
        console.log(error)
        return (
          <div className="loading">
            <h1>Joel's API key is used up...try again tomorrow?</h1>
          </div>
        )
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTheNews();
    }, 200)
  }, [search])

  if (loading) {
    return (
      <>
        <Topbar setSearch={setSearch} />
        <main>
          <Loading />
        </main>
      </>
    )
  };

  if (thenews === undefined) {
    return (
      <>
        <Topbar setSearch={setSearch} />
        <main>
          <div className='title'>
            <h2>No More News</h2>
            <p>Joel's API key may be exhausted-- try again tomorrow?</p>
            <button className='btn' onClick={fetchTheNews}>Reload News</button>
          </div>
        </main>
      </>
    )
  }


  return (
    <>
      <Topbar setSearch={setSearch} />
      <main>
        <div className="title">
          <h2>todays news: {search}</h2>
          <div className='underline'> </div>
        </div>
        <NewsList thenews={thenews} removeNews={removeNews} />
      </main>
    </>
  );
}

export default App
