import React, { Component } from 'react';
import { Button, Modal, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';

var newTableValues = []

class EnterTableValues extends Component {
	constructor(props) {
		super(props);
		this.handleValuesSubmit = this.handleValuesSubmit.bind(this)
	}
	
	onAfterInsertRow(row) {
		newTableValues.push(row);
		console.log(newTableValues);
	}
	
	handleValuesSubmit() {
		this.props.tableActions.insertTableValues(
			newTableValues,
			this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.TABLE_NAME,
			this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO
		)
	}
	
	render() {
		const options = {
			afterInsertRow: this.onAfterInsertRow   // A hook for after insert rows
		}
		const tableData = []
		
		return (
			<div className="App">
				{
					this.props.insertTableFields.isFieldsInfoInserted && this.props.insertTableFields.fieldsInfo ?
						<div>
							<h2>Enter values for table <strong>{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.TABLE_NAME}</strong></h2>
							<div className="enter-table-values">
								<BootstrapTable data={tableData} options={ options } keyField={this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO[0].split('$')[0]} insertRow={true}>
									{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO.map(column =>
										<TableHeaderColumn width={String(800 / this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO.length)} dataField={column.split('$')[0]}>{column.split('$')[0]}</TableHeaderColumn>
									)}
								</BootstrapTable>
								<Button onClick={this.handleValuesSubmit}
												bsStyle="primary" className="values-submit-button"
								>
									Submit Values
								</Button>
							</div>
						</div>
						:
						<p>Somethings broke!! Please go back to Home and create a new table.</p>
				}
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		insertTableValues: state.insertTableValues,
		insertTableFields: state.insertTableFields
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterTableValues);
