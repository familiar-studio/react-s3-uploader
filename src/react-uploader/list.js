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
            <div className="img-center">
              {item.cdnUrl || item.url ?
                <img src={item.cdnUrl || item.url} />
                :
                <div className="preview-not-available">preview not available</div>
              }
            </div>
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
            <div className="upl-list-row-1c lg">
              <div className="field">
                <label>Title</label>
                <p>{item.artworkTitle}</p>
              </div>
            </div>

            <div className="upl-list-row-2c">
              <div className="field">
                <label>Year</label>
                <p>{item.artworkYear}</p>
              </div>

              <div className="field">
                <label>Media</label>
                <p>{item.artworkMedia}</p>
              </div>
            </div>

            <div className="upl-list-row-2c" style={{
              display: item.type === 'video' ? 'none' : 'block'
            }}>
              <div className="field">
                <label>Artwork Dimensions</label>
                <p>{item.artworkDimensions}</p>
              </div>
            </div>

            <div className="upl-list-row-1c">
              <div className="field">
                <label>Description</label>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="upl-list-row-1c" style={{
              display: item.type !== 'video' ? 'none' : 'block'
            }}>
              <div className="field">
                <label>Artist Name</label>
                <p>{item.artistName}</p>
              </div>
            </div>
          </div>

          <div className="upl-list-btn-group">
            <button
              className="upl-btn upl-btn-default"
              onClick={() => this.props.startEditing(item, index)}
              type="button">
              Edit info
            </button>
            <img src="data:image/png;base64,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" className="upl-list-item-handle" />
          </div>
        </li>
      )
    })

    return (
      <section id="uploaderListContainer">

          <div>
            {items.length ?
              <div className="uploader-list-header">
                <h3>Uploaded Images ({items.length})</h3>
                <div className="upl-btn-group upl-btn-group-right" style={{float: 'right'}}>
                  {/*<button className="upl-btn upl-btn-default" onClick={this.props.showSlideshow}>View Slideshow</button>*/}
                  <button 
                    className="upl-btn upl-btn-default" 
                    onClick={this.props.uploadVideo} 
                    type="button"
                    style={{
                      display: this.props.options.allowVideoUploads ? 'inline' :'none'
                    }}>
                    Upload Video Link
                  </button>
                  <button className="upl-btn upl-btn-default" onClick={this.props.showUploadcare} type="button">Upload More Images</button>
                </div>
              </div>
            : null }
              <ul id="uploaderList" ref="list">
                {items}
              </ul>
          </div>
        {items.length ? null :
          <span>          
            <button className="upl-btn upl-btn-primary" onClick={this.props.showUploadcare} type="button">Upload Images</button>
            <button
              style={{
                display: this.props.options.allowVideoUploads ? 'inline' :'none'
              }} 
              className="upl-btn upl-btn-primary" 
              onClick={this.props.uploadVideo} 
              type="button">
              Upload Video
            </button>
          </span>
        }
      </section>
    )
  }

  componentDidMount() {
    this.placeholder = document.createElement('li');
    this.placeholder.className = 'placeholder';
    setTimeout(function() {

      $(this.refs.list).sortable({
        start: (e, ui) => {
          this.draggedIndex = ui.item.index()
        },
        stop: (e, ui) => {
          $(this.refs.list).sortable('cancel')
          const data = _.cloneDeep(this.props.items)
          const from = this.draggedIndex;
          const dragged = data.splice(this.draggedIndex, 1)[0]
          const to = this.overIndex
          data.splice(to, 0, dragged)
          this.props.reOrderItems(data)
        },
        update: (event, ui) => {
          this.overIndex = ui.item.index()
        }
      });
    }.bind(this), 1000)
  }
}
