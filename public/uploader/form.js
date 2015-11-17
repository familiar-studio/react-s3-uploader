import React from 'react'
import ReactDOM from 'react-dom'

export default class MetadataForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      itemsToSave: props.editing,
      selectedIndex: 0,
      formValid: false
    }
  }

  render() {
    const slides = this.props.editing.map(function(item, index) {
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

        <form ref="form">
          <fieldset>
            <legend>Legend</legend>
            <div className="field">
              <label>Title</label>
              <input
                ref="title"
                type="text"
                value={this.state.itemsToSave[this.state.selectedIndex].title || ''}
                onChange={e => this.validateInput(e, 'title')}
                required
              />
            </div>
            <div className="field">
              <label>Media</label>
              <input
                type="text"
                value={this.state.itemsToSave[this.state.selectedIndex].media || ''}
                onChange={e => this.validateInput(e, 'media')}
              />
            </div>
            <div className="field">
              <label>Artist Name</label>
              <input
                type="text"
                value={this.state.itemsToSave[this.state.selectedIndex].artistName || ''}
                onChange={e => this.validateInput(e, 'artistName')}
              />
            </div>
            <div className="field">
              <label>Year</label>
              <input
                type="text"
                value={this.state.itemsToSave[this.state.selectedIndex].year || ''}
                onChange={e => this.validateInput(e, 'year')}
              />
            </div>
            <div className="field textarea">
              <label>Description</label>
              <textarea
                value={this.state.itemsToSave[this.state.selectedIndex].description || ''}
                onChange={e => this.validateInput(e, 'description')}>
              </textarea>
            </div>
          </fieldset>
        </form>

        <div>
          <button onClick={this.props.cancelModal}>Cancel</button>
          {this.state.selectedIndex ?
            <button onClick={() => this.slider.select(this.state.selectedIndex - 1)}>Back</button>
            : null
          }
          <button
            onClick={this.saveContinue.bind(this)}
            disabled={!this.state.formValid}>
            Save and Continue
          </button>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (this.refs.form.checkValidity()) {
      this.setState({ formValid: true })
    }

    this.slider = new Flickity(document.getElementById('metaDataSlider'), {
      prevNextButtons: false,
      draggable: false,
      selectedIndex: 0
    })

    this.slider.on('cellSelect', () => {
      this.setState({ selectedIndex: this.slider.selectedIndex })
    })
  }

  saveContinue() {
    if (this.slider.selectedIndex + 1 === this.slider.cells.length) {
      this.props.saveItems(this.state.itemsToSave)
      this.setState({ itemsToSave: [] })
    } else {
      this.slider.next()
    }
  }

  validateInput(e, field) {
    let value = e.target.value

    switch (field) {
      case 'description':
        value = value.length <= 100 ? value : value.slice(0, 100)
        break;
      default:
        break;
    }

    this.state.itemsToSave[this.state.selectedIndex][field] = value

    this.setState({
      itemsToSave: this.state.itemsToSave,
      formValid: this.refs.form.checkValidity()
    })
  }
}
