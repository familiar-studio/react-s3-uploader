import React from 'react'

class Items extends React.Component {
  render() {
    const items = this.props.data.map(function(item, index) {
      return (
        <li key={index}>
          <img height="100" src={item.url} />
        </li>
      )
    })

    return (
      <div>
        <h3>Uploaded Artwork</h3>
        <button onClick={this.props.showSlideshow}>View Slideshow</button>
        <button onClick={this.props.showModal}>Upload More items</button>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default class UploadedList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section id="uploadedList">
        {this.props.items.length ?
          <Items data={this.props.items}
                 showModal={this.props.showModal}
                 showSlideshow={this.props.showSlideshow}>
          </Items>
        :
          <button onClick={this.props.showModal}>Upload Artwork</button> }
      </section>
    )
  }
}
