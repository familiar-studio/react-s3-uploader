import React from 'react'
import MetadataForm from './form.js'
import FilePicker from './file-picker.js'


export default class Modal extends React.Component {
  constructor() {
    super()
    this.state = {
      pickedFiles: []
    }
  }

  render() {
    return (
      <section id="uploaderModal"
               style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                overflow: 'scroll'
               }}>
        <div style={{
              margin: 'auto',
              width: 400
             }}>
          <div>
            <h2>File Uploader</h2>
          </div>

          {this.props.editing.length ?
          <MetadataForm
            items={this.props.items}
            editing={this.props.editing}
            saveItems={this.props.saveItems}
            isEditing={this.props.isEditing}
            editingExistingItems={this.props.editingExistingItems}
            cancelModal={this.props.cancelModal}>
          </MetadataForm>
            :
          <FilePicker
            pickedFiles={this.state.pickedFiles}
            editPickedFiles={() => {
              this.props.editPickedFiles(this.state.pickedFiles)
              this.setState({pickedFilles: []})
            }}
            showUploadProgresses={this.state.showUploadProgresses}
            showPickedFiles={pickedFiles => {
              this.setState({ pickedFiles: this.state.pickedFiles.concat(pickedFiles) })
            }}
            cancelModal={this.props.cancelModal}>
          </FilePicker>
          }
        </div>
      </section>
    )
  }
}
