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
        title: file.name
      })
    })
  }

  render() {
    const pickedFiles = this.props.pickedFiles.map(function(file, index) {
      return (
        <div key={index}>
          <h1>Upload # {index + 1}....</h1>
          <img src={file.url} style={{width: '100%'}}/>
          <progress value="20" max="100">0%</progress>
        </div>
      )
    });

    return (
      <div>
        {!this.props.pickedFiles.length ?
          <p>Choose files to upload. You can select more than one file at a time. You can also drag and drop files in this box to start uploading.</p>
          : null
        }
        {pickedFiles}
        <div>
          <button onClick={this.props.cancelModal}>Cancel</button>
          <input type="file" multiple onChange={this.handlesFilesChange.bind(this)} />
          {pickedFiles.length ?
            <button onClick={() => this.props.editPickedFiles(this.props.pickedFiles)}>Add Captions</button>
            : null
          }

        </div>
      </div>
    )
  }
}
