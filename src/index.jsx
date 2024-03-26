import React, { Component } from 'react'
import './style.css'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/banner'
import ImageSlider from './components/ImageSider'
import Weather from './components/WeatherApp/weather'
import Game from './components/TicTakGame/Game'
import { render } from 'react-dom'
import Todo from './components/Todo/Todo'
import Blog from './Blog/Blog'
import Billing from './components/Billing/Billing'
// import Test from './components/Practice/Test'
document.body.innerHTML = '<div id="app"></div>'


const root = createRoot(document.getElementById('app'))
root.render(
  <>
    {/* <Header
      c1="Home"
      c2="AboutMe"
      c3="ContactMe"
      c4="HireMe"
      c5="Blocked"
      c6="main"
    /> */}
    {/* <Game /> */}
    {/* <Weather /> */}
    {/* <Banner /> */}
    {/* <ImageSlider /> */}
    {/* <Todo /> */}
    <Billing />
    {/* <Blog /> */}
    {/* <Footer c1="instagram" c2="facebook" c3="snapchat" c4="twitter" c5="whatsapp" c6="" logo="Welcome back to my web-site"/> */}
  </>,
)

// rafc
