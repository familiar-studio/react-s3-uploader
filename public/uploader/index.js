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
      uploadedItems: []
    }
  }

  updateUploadedItems(item) {
    // console.log(s3Res)
    this.setState({ uploadedItems: this.state.uploadedItems.concat([item]) })
  }

  render() {
    return (
      <section id="uploadContainer">
        <h1>Images</h1>
        <p>Click <span>Upload Artwork</span> to add up to 10 images. Acceptable file types are JPEG, GIF, and PNG. Images will be projected in the order selected and should be no larger than 2500 pixels in either width or height. Be sure to indicate for each artwork: title, artist name, year, media, and a brief description. (300 characters max in each description field)</p>
        <UploadedList items={this.state.uploadedItems}
                      showModal={() => this.setState({ showModal: true })}
                      showSlideshow={() => this.setState({ showSlideshow: true })} />
                    {this.state.showModal ? <UploaderModal hideModal={() => this.setState({ showModal: false })} updateUploadedItems={this.updateUploadedItems.bind(this)} /> : null}
        {this.state.showSlideshow ?
          <Slideshow hideSlideshow={() => this.setState({ showSlideshow: false })}
                     items={this.state.uploadedItems}>
          </Slideshow>
        : null}
      </section>
    )
  }
}


ReactDOM.render( <UploaderContainer />, document.getElementsByTagName('uploader')[0] )
