import './style.scss';

import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery';
import 'jquery-ui';

import List from './list.js'
import Modal from './modal.js'
import Slideshow from './slideshow.js'
import UploadVideoForm from './upload-video-form.js'




class Uploader extends React.Component {
  constructor(props) {

    super()
    this.state = {
      items: props.items || [],
      rollbackItemsState: props.items || [],
      editing: [],
      editingIndex: null,
      showFormModal: false,
      showSlideshow: false,
      uploadingVideo: false
    }
  }


  showUploadcare() {
    uploadcare.openDialog(null, {
      multiple: true,
      imagesOnly: true,
      // imageShrink: true
    })
    .done( (file) => {
      Promise.all(file.files()).then(this.saveItems.bind(this))
    })
  }

  uploadVideo() {
    this.setState({
      uploadingVideo: true
    })
  }

  submitVideoUrl(url) {    
    let id, endpoint

    if ( url.includes('you') ) {
      id = url.slice( url.lastIndexOf('v=') + 2 )
      endpoint = `http://img.youtube.com/vi/${id}/0.jpg`
      updateState.call(this, endpoint)
    } else if ( url.includes('vimeo') ) {
      id = url.slice( url.lastIndexOf('/') + 1 )
      endpoint = `http://vimeo.com/api/v2/video/${id}.json`
      getVimeoThumbnail(endpoint)
        .then(updateState.bind(this))
    }
    
    function updateState(thumbnailUrl) {
      this.saveItems({
        srcUrl: url, // vimeo or youtube page url
        cdnUrl: thumbnailUrl, //thumbnail of video frame
        type: 'video'
      })
    }

    function getVimeoThumbnail(endpoint) {
      return fetch(endpoint)
        .then(res => res.json())
        .then(res => res[0].thumbnail_large)
        .catch((err) => console.log(err))
    }
  }


  saveItems(data) {
    const toSave = Array.isArray(data) ? data : [data]
    const rollbackItemsState = _.cloneDeep(this.state.items)

    if (this.state.editingIndex || this.state.editingIndex === 0) {
      this.state.items.splice(this.state.editingIndex, 1, toSave[0])

      this.setState({
        rollbackItemsState: rollbackItemsState,
        items: this.state.items,
        showFormModal: false,
        editing: [],
        editingIndex: null,
        uploadingVideo: false
      })
    } else {
      this.setState({
        rollbackItemsState: rollbackItemsState,
        items: this.state.items.concat(toSave),
        showFormModal: true,
        editing: toSave,
        editingIndex: this.state.items.length,
        uploadingVideo: false
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.rollbackItemsState = this.state.rollbackItemsState || prevState.rollbackItemsState || null
    this.props.notifier(this.rollback.bind( this, prevState ))
  }

  rollback(prevState) {
    if ( Array.isArray(prevState) ) {
      this.setState({
        items: prevState
      })
    } else {
      this.setState(prevState)
    }

  }

  render() {
    return (
      <section id="uploader">
        <List
          items={this.state.items}
          showUploadcare={this.showUploadcare.bind(this)}
          uploadVideo={this.uploadVideo.bind(this)}
          showSlideshow={() => this.setState({ showSlideshow: true })}
          startEditing={(itemsToEdit, index) => this.setState({
            editing: [itemsToEdit],
            editingIndex: index,
            showFormModal: true
          })}
          reOrderItems={items => this.setState({items: items})}
          options={this.props.options}>
        </List>

        {this.state.showFormModal ?
        <Modal
          items={this.state.items}
          options={this.props.options}
          saveItems={this.saveItems.bind(this)}
          editing={this.state.editing}
          editPickedFiles={pickedFiles => this.setState({
            editing: pickedFiles
          })}
          cancelModal={() => {
            this.setState({
              showFormModal: false,
              editing: [],
              editingIndex: null,
              items: this.state.rollbackItemsState
            })
          }}>
        </Modal>
        : null
        }

        {this.state.uploadingVideo ? 
        <UploadVideoForm
          submitVideoUrl={this.submitVideoUrl.bind(this)}
          cancelVideoUpload={() => {
            this.setState({ uploadingVideo: false })
          }}>
        </UploadVideoForm>  
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

export default function ReactUploader(initialItems, options, notifier) {
  return ReactDOM.render( <Uploader options={options}  items={initialItems} notifier={notifier}  />, document.getElementsByTagName('uploader')[0] )
}
