import React from 'react'
import ReactDOM from 'react-dom'

import UploadedList from './uploaded-list.js'
import UploaderModal from './uploader-modal.js'
import Slideshow from './slideshow.js'

class UploaderContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      showSlideshow: false,
      items: []
    }
  }

  addItem(item) {
    this.setState({ items: this.state.items.concat([item]) })
  }

  render() {
    return (
      <section id="uploadContainer">
        <h1>Images</h1>
        <p>Click <span>Upload Artwork</span> to add up to 10 images. Acceptable file types are JPEG, GIF, and PNG. Images will be projected in the order selected and should be no larger than 2500 pixels in either width or height. Be sure to indicate for each artwork: title, artist name, year, media, and a brief description. (300 characters max in each description field)</p>
        <UploadedList items={this.state.items}
                      showModal={() => this.setState({ showModal: true })}
                      showSlideshow={() => this.setState({ showSlideshow: true })}>
        </UploadedList>
        {this.state.showModal ?
        <UploaderModal hideModal={() => this.setState({ showModal: false })}
                       addItem={this.addItem.bind(this)}>
        </UploaderModal>
        : null
        }
        {this.state.showSlideshow ?
        <Slideshow hideSlideshow={() => this.setState({ showSlideshow: false })}
                   items={this.state.items}>
        </Slideshow>
        : null
        }
      </section>
    )
  }
}


ReactDOM.render( <UploaderContainer />, document.getElementsByTagName('uploader')[0] )
