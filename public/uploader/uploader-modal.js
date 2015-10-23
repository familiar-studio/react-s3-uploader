import React from 'react'
import S3Service from './s3-service.js'
import MetadataForm from './metadata-form.js'
import FileTransfer from './file-transfer.js'


export default class UploaderModal extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      fileProgresses: [],
      showUploadProgresses: false,
      isAddingCaptions: false
    }
  }

  handleUploads(e) {
    // const progresses = Array.prototype.map.call(e.target.files, S3Service.upload)
    // this.setState({
    //   showUploadProgresses: true,
    //   fileProgresses: progresses
    // })

    Array.prototype.forEach.call(e.target.files, function(file) {
      S3Service.upload(file).then((res) => {
        this.props.updateItems(res)
        this.setState({ files: this.state.files.concat(res) })
      })
    }.bind(this))
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
                display: 'flex'
               }}>
        <div style={{
              margin: 'auto',
              width: 400
             }}>
          <div>
            <h2>File Uploader</h2>
          </div>

          {this.state.isAddingCaptions ?
          <MetadataForm files={this.state.files}
                        hideModal={this.props.hideModal}
                        updateItems={this.props.updateItems}>
          </MetadataForm>
            :
          <FileTransfer fileProgresses={this.state.fileProgresses}
                        showUploadProgresses={this.state.showUploadProgresses}
                        hideModal={this.props.hideModal}
                        handleUploads={this.handleUploads.bind(this)}
                        addCaptions={() => this.setState({ isAddingCaptions: true })}>
          </FileTransfer>
          }
        </div>
      </section>
    )
  }
}
