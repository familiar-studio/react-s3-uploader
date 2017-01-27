import React from 'react'


export default class UploadVideoForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			formValid: false
		}
	}

	render() {
		return (
			<div id="uploadVideoForm">
				<div className="content">							
					<form
						ref={r => this.formRef = r} 
						onSubmit={e => {
							e.preventDefault()
							this.props.submitVideoUrl(this.formRef.url.value)
						}}>
						<fieldset>	
							<div className="field">
								<label>Link to Media on Vimeo, Youtube, or Soundcloud</label>							
								<input type="text" name="url" onChange={this.validateUrl.bind(this)}/>
							</div>
						</fieldset>

						<div className="upl-btn-group upl-btn-group-right">
							<button
								type="button"
								className="upl-btn upl-btn-default"
								onClick={this.props.cancelVideoUpload}>
								Cancel
							</button>

							<button
								type="submit"
								className="upl-btn upl-btn-primary"
								disabled={!this.state.formValid}>
								Save and Continue
							</button>
						</div>
					</form>
				</div>									
			</div>
		)
	}

	validateUrl(e) {
		const url = e.target.value
		const urlRegex = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/)
		const isUrl = urlRegex.test(url)
		const isApprovedProvider = url.includes('you') || url.includes('vimeo') || url.includes('soundcloud')

		this.setState({
			formValid: isUrl && isApprovedProvider
		})
	}
}