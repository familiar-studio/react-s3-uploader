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
      <section id="uploaderModal">
        <div className="upl-modal-inner">
          {this.props.editing.length ?
          <MetadataForm
            items={this.props.items}
            editing={this.props.editing}
            saveItems={this.props.saveItems}
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
