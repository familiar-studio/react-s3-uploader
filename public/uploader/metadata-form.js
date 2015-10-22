import React from 'react'

export default class MetadataForm extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.slider = new Flickity(document.getElementById('metaDataSlider'), {
      prevNextButtons: false
    })
  }

  saveContinue() {
    if (this.slider.selectedIndex + 1 === this.slider.cells.length) {
      this.props.hideModal()
    } else {
      this.slider.next()
    }

  }

  render() {
    const slides = this.props.files.map(function(item, index) {
      return (
        <div className="gallery-cell" key={index}>
          <img src={item.url} height="300" style={{
              margin: '0 auto',
              display: 'block'
            }} />
        </div>
      )
    })

    return (
      <div>
        <h1>metadata form</h1>

        <div id="metaDataSlider">
          {slides}
        </div>

        <form>
          <fieldset>
            <legend>Legend</legend>
            <div className="field">
              <label>Title</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Media</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Artist Name</label>
              <input type="text" />
            </div>
            <div className="field">
              <label>Year</label>
              <input type="text" />
            </div>
            <div className="field textarea">
              <label>Description</label>
              <textarea></textarea>
            </div>
          </fieldset>
        </form>

        <div>
          <button onClick={this.props.hideModal}>Cancel</button>
          <button onClick={this.saveContinue.bind(this)}>Save and Continue</button>
        </div>
      </div>
    )
  }
}
