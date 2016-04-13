import React from 'react'
import ReactDOM from 'react-dom'

import List from './list.js'
import Modal from './modal.js'
import Slideshow from './slideshow.js'

class Uploader extends React.Component {
  constructor(props) {
    super()
    this.state = {
      items: props.items || [],
      editing: [],
      editingIndex: null,
      showModal: false,
      showSlideshow: false
    }
  }

  showUploadcare() {
    uploadcare.openDialog(null, {
      multiple: true
    })
    .done( (file) => {
      file.files().forEach(file => {
        file.then(this.saveItems.bind(this))
      })
    })
  }

  saveItems(data) {
    const toSave = Array.isArray(data) ? data : [data]
    if (this.state.editingIndex || this.state.editingIndex === 0) {
      this.state.items.splice(this.state.editingIndex, 1, toSave[0])
      this.setState({
        items: this.state.items,
        showModal: false,
        editing: [],
        editingIndex: null
      })

    } else {
      this.setState({
        items: this.state.items.concat(toSave),
        showModal: false,
        editing: []
      })
    }
  }

  render() {
    return (
      <section id="uploader">
        <h1>Images</h1>
        <p>Click <span>Upload Artwork</span> to add up to 10 images. Acceptable file types are JPEG, GIF, and PNG. Images will be projected in the order selected and should be no larger than 2500 pixels in either width or height. Be sure to indicate for each artwork: title, artist name, year, media, and a brief description. (300 characters max in each description field)</p>
        <List
          items={this.state.items}
          showModal={this.showUploadcare.bind(this)}
          showSlideshow={() => this.setState({ showSlideshow: true })}
          startEditing={(itemsToEdit, index) => this.setState({
            editing: [itemsToEdit],
            editingIndex: index,
            showModal: true
          })}
          reOrderItems={items => this.setState({items: items})}>
        </List>

        {this.state.showModal ?
        <Modal
          items={this.state.items}
          saveItems={this.saveItems.bind(this)}
          editing={this.state.editing}
          editPickedFiles={pickedFiles => this.setState({
            editing: pickedFiles
          })}
          cancelModal={() => this.setState({
            showModal: false,
            editing: []
          })}>
        </Modal>
        : null
        }

        {this.state.showSlideshow ?
        <Slideshow
          hideSlideshow={() => this.setState({ showSlideshow: false })}
          items={this.state.items}>
        </Slideshow>
        : null
        }
      </section>
    )
  }
}

// const mockData = [{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/portrait.jpg","artworkTitle":"aaa","artworkYear":"bbb","artworkMedia":"ccc","artworkDimensions":"ddd","description":"eee"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/South-America-Patagonia-1-guanaco.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/Torres-del-Paine-Photo-by-jakub-polomski-Latin-America-For-Less.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/c7c460a662f1bf1a1b3ad6819b9dc0cd.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/d.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/e.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/f.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/g.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/d.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/e.jpg"},{"cdnUrl":"https://ucarecdn.com/6dab6df6-c2e4-4b4a-852e-fb451f287da0/"},{"cdnUrl":"https://ucarecdn.com/ffcc2853-aae5-4bce-bcd1-5d272328ea8c/"},{"cdnUrl":"https://ucarecdn.com/2f460db0-b769-4634-b3ec-5d2c544f81b0/","artworkTitle":"13","artworkYear":"1313","artworkDimensions":"bbbb","artworkMedia":"asdf","description":"asdfasdf"},{"cdnUrl":"https://ucarecdn.com/af3262e4-b9b6-44dc-a6e3-77b0b3d9de7b/"},{"cdnUrl":"https://ucarecdn.com/f2448857-4dd0-45a3-baa9-00cdf92d620c/"},{"cdnUrl":"https://ucarecdn.com/2a2395b7-101e-4912-b2a2-aca03fb5fd02/"},{"cdnUrl":"https://ucarecdn.com/9d5f746b-2365-4be4-bc8a-3e1c0ceb9221/"},{"cdnUrl":"https://ucarecdn.com/9d5f746b-2365-4be4-bc8a-3e1c0ceb9221/"},{"cdnUrl":"https://ucarecdn.com/e360dab0-8427-4aed-8ccf-0bdd2849da15/"},{"cdnUrl":"https://ucarecdn.com/0964d59f-93ed-433b-a353-53153c3b814e/"}]
const mockData2 = [{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/portrait.jpg","artworkTitle":"aaa","artworkYear":"bbb","artworkMedia":"ccc","artworkDimensions":"ddd","description":"eee"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/South-America-Patagonia-1-guanaco.jpg"},{"cdnUrl":"https://awaw-applications.s3.amazonaws.com/a0f11000003HfzwAAC/artwork/Torres-del-Paine-Photo-by-jakub-polomski-Latin-America-For-Less.jpg"}]
uploader = ReactDOM.render( <Uploader items={mockData2} />, document.getElementsByTagName('uploader')[0] )
