import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class CreateTableModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			tableName: '',
			tableDescription: '',
			fieldCount: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.submitNewTableDetails = this.submitNewTableDetails.bind(this)
		this.setCreateTableModalStateHandler = this.setCreateTableModalStateHandler.bind(this)
	}
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	setCreateTableModalStateHandler() {
		this.props.setCreateTableModalState(false);
		this.setState({
			tableName: '',
			tableDescription: '',
			fieldCount: ''
		});
	}
	
	renderInput(fieldLabel, inputName, inputType, inputValue, placeholder) {
		return(
			<label className="modal-label">
				{fieldLabel}
				<input
					name={inputName}
					type={inputType}
					className="form-control"
					value={inputValue}
					placeholder={placeholder}
					onChange={this.handleInputChange}/>
			</label>
		)
	}
	
	submitNewTableDetails() {
		this.props.createNewTable(this.state.tableName, this.state.tableDescription, this.state.fieldCount);
		this.setState({
			tableName: '',
			tableDescription: '',
			fieldCount: ''
		});
	}
	
	render() {
		return (
			<Modal show={this.props.shouldShowCreateTableModal} onHide={this.setCreateTableModalStateHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Table</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="modal-form">
						{this.renderInput("Table Name:", "tableName", "text", this.state.tableName)}
						<br/>
						{this.renderInput("Table Description:", "tableDescription", "text", this.state.tableDescription)}
						<br/>
						{this.renderInput("Field Count:", "fieldCount", "number", this.state.fieldCount, "Enter nunber of fields...")}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.setCreateTableModalStateHandler}>Cancel</Button>
					<Button onClick={this.submitNewTableDetails}
					        bsStyle="primary"
					>
						Create new Table
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
