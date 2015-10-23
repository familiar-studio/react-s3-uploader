import React from 'react'
import ReactDOM from 'react-dom'

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
    const metaData = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      media: ReactDOM.findDOMNode(this.refs.media).value,
      date: ReactDOM.findDOMNode(this.refs.date).value,
      artistName: ReactDOM.findDOMNode(this.refs.artistName).value,
      description: ReactDOM.findDOMNode(this.refs.description).value
    }

    //update local memory for items
    this.props.updateItems()

    //send data to salesforce

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
              <input type="text" ref="title" />
            </div>
            <div className="field">
              <label>Media</label>
              <input type="text" ref="media" />
            </div>
            <div className="field">
              <label>Artist Name</label>
              <input type="text" ref="artistName" />
            </div>
            <div className="field">
              <label>Year</label>
              <input type="text" ref="date" />
            </div>
            <div className="field textarea">
              <label>Description</label>
              <textarea ref="description"></textarea>
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
