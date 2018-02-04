import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';
import { Loader } from '../Loader';

class CreateTable extends Component {
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
		this.submitNewTableDetailsWithRoute = this.submitNewTableDetailsWithRoute.bind(this)
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
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
		this.props.tableActions.createNewTable(this.state.tableName, this.state.tableDescription, this.state.fieldCount);
		this.setState({
			tableName: '',
			tableDescription: '',
			fieldCount: ''
		});
	}

	submitNewTableDetailsWithRoute() {
		this.submitNewTableDetails();
		this.props.history.push("/enterFieldsInfo")
	}

	render() {
		const isButtonDisabled = this.state.tableName !== '' && this.state.tableDescription !== '' && this.state.fieldCount !== ''

		return (
			<div className="App">
				{this.props.loading.isLoading ? <Loader /> : null}
				{this.props.createTable.isTableCreated ? <p className="alert alert-success">Table <strong>{this.props.createTable.tableName}</strong> is created successfully!</p> : null}
				<h2>Create New Table</h2>
				<div className="create-table">
					<form className="modal-form">
						{this.renderInput("Table Name:", "tableName", "text", this.state.tableName)}
						<br/>
						{this.renderInput("Table Description:", "tableDescription", "text", this.state.tableDescription)}
						<br/>
						{this.renderInput("Field Count:", "fieldCount", "number", this.state.fieldCount, "Enter nunber of fields...")}
					</form>
					<br />
					<Button onClick={this.submitNewTableDetails} disabled={!isButtonDisabled} bsStyle="primary">
						Create Table
					</Button>
					<br /><br />
					<Button onClick={this.submitNewTableDetailsWithRoute} disabled={!isButtonDisabled} bsStyle="info">
						Create Table & Next Step
					</Button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		tableList: state.tableList,
		createTable: state.createTable,
		insertTableFields: state.insertTableFields,
		loading: state.loading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTable);
