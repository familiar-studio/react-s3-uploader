import React from 'react'

export default class Slideshow extends React.Component {
  constructor() {
    super()
    this.state = {
      fullscreen: false
    }
  }

  componentDidMount() {
    this.slider = new Flickity(document.getElementById('slideshowSlider'))
  }

  render() {
    const slides = this.props.items.map(function(slide, index) {
      return (
        <div className="gallery-cell slideshow" key={index}>
          <img src={slide.url} height="600"
               style={{
                 margin: '0 auto',
                 display: 'block'
               }} />
        </div>
      )
    })
    return (
      <section style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff'
      }}>
        <button onClick={() => this.setState({ fullscreen: true })}>Fullscreen</button>
        <button onClick={this.props.hideSlideshow}>Exit</button>
        <div id="slideshowSlider">
          {slides}
        </div>
      </section>
    )
  }
}
