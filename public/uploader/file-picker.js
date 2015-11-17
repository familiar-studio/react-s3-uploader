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
            <img src="/dropzone.png" height="50" />
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
