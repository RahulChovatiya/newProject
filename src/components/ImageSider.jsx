import React, { Component } from 'react'

class ImageSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: ['/images/computer.jpg', '/images/Big.jpg', '/images/nasa.jpg'],
      currentIndex: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.nextSlide, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  nextSlide = () => {
    const { images, currentIndex } = this.state
    const nextIndex = (currentIndex + 1) % images.length
    this.setState({ currentIndex: nextIndex })
  }

  render() {
    const { images, currentIndex } = this.state
    return (
      <div className="image-slider">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
    )
  }
}

export default ImageSlider
