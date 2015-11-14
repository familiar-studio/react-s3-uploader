import React from 'react'

export default class List extends React.Component {
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <li key={index} onClick={() => this.props.startEditing(item, index)}>
          <img height="100" src={item.url} />
          <h2>{item.title}</h2>
          <h2>{item.media}</h2>
          <h2>{item.date}</h2>
          <h2>{item.artistName}</h2>
          <h2>{item.description}</h2>
        </li>
      )
    })

    return (
      <section>
        {items.length ?
          <div>
            <h3>Uploaded Artwork</h3>
            <button onClick={this.props.showSlideshow}>View Slideshow</button>
            <button onClick={this.props.showModal}>Upload More items</button>
            <ul>
              {items}
            </ul>
          </div>
        :
          <button onClick={this.props.showModal}>Upload Artwork</button>
        }
      </section>
    )
  }
}
