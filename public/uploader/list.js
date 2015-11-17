import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'


export default class List extends React.Component {
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <li key={index}
            data-id={index}
            onClick={() => this.props.startEditing(item, index)}
            draggable="true">
          <img height="100" src={item.url} />
          <h2>{item.title}</h2>
          <h2>{item.media}</h2>
          <h2>{item.date}</h2>
          <h2>{item.artistName}</h2>
          <h2>{item.description}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              this.props.items.splice(index, 1)
              this.props.reOrderItems(this.props.items)
            }}>Delete item
          </button>
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
            <ul ref="list">
              {items}
            </ul>
          </div>
        :
          <button onClick={this.props.showModal}>Upload Artwork</button>
        }
      </section>
    )
  }

  componentDidMount() {
    this.placeholder = document.createElement('li');
    this.placeholder.className = 'placeholder';
  }

  componentDidUpdate() {
    $('ul').sortable({
      start: (e, ui) => {
        this.draggedIndex = ui.item.index()
      },
      stop: (e, ui) => {
        $('ul').sortable('cancel')
        const data = _.cloneDeep(this.props.items)
        const from = this.draggedIndex;
        const dragged = data.splice(this.draggedIndex, 1)[0]
        const to = this.draggedIndex < this.overIndex ? this.overIndex - 1 : this.overIndex
        data.splice(to, 0, dragged)
        this.props.reOrderItems(data)
      },
      update: (event, ui) => {
        this.overIndex = ui.item.index()
      }
    });
  }
}
