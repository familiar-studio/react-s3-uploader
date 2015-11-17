import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'


export default class List extends React.Component {
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <li className="uploaded-item"
            key={index}
            data-id={index}
            draggable="true">

          <div className="upl-list-img">
            <img height="100" src={item.url} />
            <a  href
                onClick={(e) => {
                  e.preventDefault()
                  if (confirm('Are you sure you want to delete this item?')) {
                    this.props.items.splice(index, 1)
                    this.props.reOrderItems(this.props.items)
                  }
                }}>delete item
            </a>
          </div>

          <div className="upl-list-metadata">
            <div className="upl-list-row-2c">
              <div className="field">
                <label>Title</label>
                <p>{item.title}</p>
              </div>
              <div className="field">
                <label>Media</label>
                <p>{item.media}</p>
              </div>
            </div>

            <div className="upl-list-row-2c">
              <div className="field">
                <label>Artist Name</label>
                <p>{item.artistName}</p>
              </div>
              <div className="field">
                <label>Year</label>
                <p>{item.date}</p>
              </div>
            </div>

            <div className="upl-list-row-1c">
              <div className="field">
                <label>Photo Credit</label>
                <p>{item.description}</p>
              </div>
            </div>
          </div>

          <div className="upl-list-btn-group">
            <button
              className="upl-btn upl-btn-default"
              onClick={() => this.props.startEditing(item, index)}>
              Edit info
            </button>
            <img src="/drag-control.png" className="upl-list-item-handle" />
          </div>
        </li>
      )
    })

    return (
      <section id="uploaderListContainer">
        {items.length ?
          <div>
            <div className="uploader-list-header">
              <h3>Uploaded Artwork ({items.length})</h3>
              <div className="upl-btn-group upl-btn-group-right" style={{float: 'right'}}>
                {/*<button className="upl-btn upl-btn-default" onClick={this.props.showSlideshow}>View Slideshow</button>*/}
                <button className="upl-btn upl-btn-default" onClick={this.props.showModal}>Upload More items</button>
              </div>
            </div>
              <ul id="uploaderList" ref="list">
                {items}
              </ul>
          </div>
        :
          <button className="upl-btn upl-btn-primary" onClick={this.props.showModal}>Upload Artwork</button>
        }
      </section>
    )
  }

  componentDidMount() {
    this.placeholder = document.createElement('li');
    this.placeholder.className = 'placeholder';
  }

  componentDidUpdate() {
    $('#uploaderList').sortable({
      start: (e, ui) => {
        this.draggedIndex = ui.item.index()
      },
      stop: (e, ui) => {
        $('#uploaderList').sortable('cancel')
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
