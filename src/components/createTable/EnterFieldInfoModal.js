import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class EnterFieldInfoModal extends Component {
  constructor() {
    super();
    this.state = {
      fieldDetails: [],
    };
  }

	componentDidMount() {
		let stateCopies = []
		for(var i=0; i < 5; i++) {
			stateCopies.push([{ fieldName: '', fieldType: '', fieldDescription: '', fieldKeyFlag: '' }])
		}
		this.setState({ fieldDetails: this.state.fieldDetails.concat(stateCopies) });
	}

  handleShareholderNameChange = (index) => (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

    const newFieldDetails = this.state.fieldDetails.map((fieldDetails, sidx) => {
      if (index !== sidx) return fieldDetails;
      return { ...fieldDetails, [name]: value };
    });

    this.setState({ fieldDetails: newFieldDetails });
  }

  handleSubmit = (event) => {
    const { fieldDetails } = this.state;
    console.log(fieldDetails);
  }

	renderInput(inputName, inputPlaceholder, inputValue, index) {
		return(
			<input
				type="text"
				name={inputName}
				placeholder={`${inputPlaceholder} #${index + 1}`}
				value={inputValue}
				onChange={this.handleShareholderNameChange(index)}
        className="form-control"
			/>
		)
	}

  render() {
    return (
			<Modal show={true} onHide={this.setCreateTableModalStateHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Enter Fields Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
            <p className="alert alert-success">Your table is created successfully!</p>
						{this.state.fieldDetails.map((fieldDetails, index) => (
							<div className="input-group four-input" key={index}>
                <div className="four-input-label"><strong>Field {index+1}:</strong></div>
								{this.renderInput("fieldName", "Field Name", fieldDetails.fieldName, index)}
								{this.renderInput("fieldType", "Field Type", fieldDetails.fieldType, index)}
								{this.renderInput("fieldDescription", "Field Description", fieldDetails.fieldDescription, index)}
								{this.renderInput("fieldKeyFlag", "Field Key Flag", fieldDetails.fieldKeyFlag, index)}
							</div>
						))}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.setCreateTableModalStateHandler}>Cancel</Button>
					<Button onClick={this.handleSubmit}
						bsStyle="primary"
					>
						Submit Fields Information
					</Button>
				</Modal.Footer>
			</Modal>
    )
  }
}
