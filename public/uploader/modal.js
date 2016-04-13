import React from 'react'
import MetadataForm from './form.js'

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
          <MetadataForm
            items={this.props.items}
            editing={this.props.editing}
            saveItems={this.props.saveItems}
            cancelModal={this.props.cancelModal}>
          </MetadataForm>
        </div>
      </section>
    )
  }
}
