import React from 'react'
import s3Input from 'react-s3-uploader'


export default class FileTransfer extends React.Component {
  componentWillMount() {
    window.addEventListener('dragover', (e) => {
      this.preventRedirect(e)
      console.log('change area state')
    })
    window.addEventListener('drop', (e) => {
      this.preventRedirect(e)
      this.props.handleUploads()
    })
    window.addEventListener('dragleave', () => {
      console.log('change area state')
    })
  }

  preventRedirect(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  onUploadProgress() {
    console.log('progress')
  }

  onUploadError() {
    console.log('error')
  }

  onUploadFinish() {
    console.log('finish')
  }

  render() {
    const fileProgresses = this.props.fileProgresses.map(function(progress, index) {
      console.log(progress)
      return (
        <div key={index}>
          <h1>Upload # {index + 1}....</h1>
          <progress className="progress" value="20" max="100">0%</progress>
        </div>
      )
    });

    return (
      <div>
        {!this.props.showUploadProgresses ?
          <p>Choose files to upload. You can select more than one file at a time. You can also drag and drop files in this box to start uploading.</p>
          : null
        }
        {fileProgresses}
        <div>
          <button onClick={this.props.hideModal}>Cancel</button>
          <input type="file" multiple onChange={this.props.handleUploads} />
          <s3Input
              signingUrl="/s3/sign"
              accept="image/*"
              onProgress={this.onUploadProgress}
              onError={this.onUploadError}
              onFinish={this.onUploadFinish}
              signingUrlHeaders={{ additional: 'headers' }}
              signingUrlQueryParams={{ additional: 'query-params' }}

              contentDisposition="auto" />
          <button onClick={this.props.addCaptions}>Add Captions</button>
        </div>
      </div>
    )
  }
}
