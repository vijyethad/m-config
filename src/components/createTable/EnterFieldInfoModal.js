import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class EnterFieldInfoModal extends Component {
	constructor() {
		super();
		this.setFieldInfoModalStateHandler = this.setFieldInfoModalStateHandler.bind(this);
		this.state = {
			tableFieldsData: [],
		};
	}

	componentDidMount() {
		let stateCopies = []
		for(var i=0; i < 2; i++) {
			stateCopies.push([{ fieldName: '', fieldType: '', fieldDescription: '', fieldKeyFlag: '' }])
		}
		this.setState({ tableFieldsData: this.state.tableFieldsData.concat(stateCopies) });
	}

	handleShareholderNameChange = (index) => (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const newFieldDetails = this.state.tableFieldsData.map((tableFieldsData, sidx) => {
			if (index !== sidx) return tableFieldsData;
			return { ...tableFieldsData, [name]: value };
		});
		this.setState({ tableFieldsData: newFieldDetails });
	}

	handleSubmit = (event) => {
		const { tableFieldsData } = this.state;
		this.props.insertTableFieldsData('table name', tableFieldsData)
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

	setFieldInfoModalStateHandler() {
		this.props.setFieldInfoModalState(false);
	}

	render() {
		return (
			<Modal show={this.props.shouldShowFieldInfoModal} onHide={this.setFieldInfoModalStateHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Enter Fields Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<p className="alert alert-success">Your table is created successfully!</p>
						{this.state.tableFieldsData.map((tableFieldsData, index) => (
							<div className="input-group four-input" key={index}>
								<div className="four-input-label"><strong>Field {index+1}:</strong></div>
								{this.renderInput("fieldName", "Field Name", tableFieldsData.fieldName, index)}
								{this.renderInput("fieldType", "Field Type", tableFieldsData.fieldType, index)}
								{this.renderInput("fieldDescription", "Field Description", tableFieldsData.fieldDescription, index)}
								{this.renderInput("fieldKeyFlag", "Field Key Flag", tableFieldsData.fieldKeyFlag, index)}
							</div>
						))}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.setFieldInfoModalStateHandler}>Cancel</Button>
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
