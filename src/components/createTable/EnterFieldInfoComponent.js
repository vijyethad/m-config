import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';
import { Loader } from '../Loader';

export default class EnterFieldInfoComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSubmitandRoute = this.handleSubmitandRoute.bind(this)
		this.state = {
			tableFieldsData: [],
		};
	}

	handleSubmit = (event) => {
		const { tableFieldsData } = this.state;
		this.props.tableActions.insertTableFieldsData(this.props.createTable.tableName, tableFieldsData)
		this.setState({
			tableFieldsData: []
		});
		this.props.history.push("/")
	}

	handleSubmitandRoute() {
		const { tableFieldsData } = this.state;
		this.props.tableActions.insertTableFieldsData(this.props.createTable.tableName, tableFieldsData)
		this.setState({
			tableFieldsData: []
		});
		this.props.history.push("/enterTableValues")
	}

	componentDidMount() {
		const isTableCreated = this.props.createTable.isTableCreated
		let stateCopies = []
		if(isTableCreated) {
			for(var i=0; i < Number(this.props.createTable.fieldCount); i++) {
				stateCopies.push([{ fieldName: '', fieldType: '', fieldDescription: '', fieldKeyFlag: '' }])
			}
			this.setState({ tableFieldsData: this.state.tableFieldsData.concat(stateCopies) });
		}
	}

	handleInputChange = (index) => (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const newFieldDetails = this.state.tableFieldsData.map((tableFieldsData, sidx) => {
			if (index !== sidx) return tableFieldsData;
			return { ...tableFieldsData, [name]: value };
		});
		this.setState({ tableFieldsData: newFieldDetails });
	}

	renderInput(inputName, inputPlaceholder, inputValue, index) {
		return(
			<input
				type="text"
				name={inputName}
				placeholder={`${inputPlaceholder} #${index + 1}`}
				value={inputValue}
				onChange={this.handleInputChange(index)}
				className="form-control"
			/>
		)
	}

	render() {
		return (
			<div>
				<form>
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
				<div className="field-info-buttons">
					<br />
					<Button onClick={this.handleSubmit} bsStyle="primary">
						Submit Fields Info & Return Home
					</Button>
					<br /><br />
					<Button onClick={this.handleSubmitandRoute} bsStyle="info">
						Submit Fields Info & Next Step
					</Button>
				</div>
			</div>
		)
	}
}
