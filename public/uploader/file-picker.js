import React from 'react'



export default class FilePicker extends React.Component {
  preventRedirect(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  handlesFilesChange(e) {
    return Array.prototype.map.call(e.target.files, (file) => {
      var reader = new FileReader();
      setTimeout(() => reader.readAsDataURL(file))
      return reader.onload = e => this.props.showPickedFiles({
        url: e.target.result,
        title: file.name,
        size: file.size
      })
    })
  }

  render() {
    const pickedFiles = this.props.pickedFiles.map(function(file, index) {
      return (
        <div className="picked-item" key={index}>
          <div className="img-preview" style={{backgroundImage: 'url(\'' + file.url + '\')'}}></div>
          <div>
            <h4>{file.title}</h4>
            <h6>{file.size}</h6>
          </div>
        </div>
      )
    });

    return (
      <div>
        <div className="upl-modal-header">
          <h2>File Uploader</h2>
        </div>
        {!this.props.pickedFiles.length ?
          <p>Choose files to upload. You can select more than one file at a time. You can also drag and drop files in this box to start uploading.</p>
          : null
        }
        <div id="pickedFiles">
          {pickedFiles}
        </div>
        <div className="dropzone">
          <div>
            <img src="data:image/png;base64,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" height="50" />
            <p>Drop your files here to upload them</p>
          </div>
          <input type="file" name="file" id="file" className="input-file-as-droppable" multiple onChange={this.handlesFilesChange.bind(this)} />
        </div>
        <div className="upl-btn-group upl-btn-group-right">
          <button className="upl-btn upl-btn-default" onClick={this.props.cancelModal}>Cancel</button>
          <label htmlFor="file" className="upl-btn upl-btn-primary">Choose Files</label>
          {pickedFiles.length ?
            <button className="upl-btn upl-btn-primary" onClick={() => this.props.editPickedFiles(this.props.pickedFiles)}>Add Captions</button>
            : null
          }

        </div>
      </div>
    )
  }
}
