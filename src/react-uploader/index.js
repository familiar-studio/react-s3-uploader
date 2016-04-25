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
      rollbackItemsState: props.items || [],
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
      Promise.all(file.files()).then(this.saveItems.bind(this))
    })
  }

  saveItems(data) {
    const toSave = Array.isArray(data) ? data : [data]    
    const rollbackItemsState = _.cloneDeep(this.state.items)
    
    if (this.state.editingIndex || this.state.editingIndex === 0) {
      this.state.items.splice(this.state.editingIndex, 1, toSave[0])            
      
      this.setState({
        rollbackItemsState: rollbackItemsState,
        items: this.state.items,
        showModal: false,
        editing: [],
        editingIndex: null
      })
    } else {                        
      this.setState({
        rollbackItemsState: rollbackItemsState,
        items: this.state.items.concat(toSave),
        showModal: true,
        editing: toSave,
        editingIndex: this.state.items.length,
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
          cancelModal={() => { 
            this.setState({
              showModal: false,
              editing: [],
              editingIndex: null
            }, () => this.rollback(this.state.rollbackItemsState))              
          }}>
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

export default function ReactUploader(initialItems, notifier) {
  return ReactDOM.render( <Uploader items={initialItems} notifier={notifier}  />, document.getElementsByTagName('uploader')[0] )
}
