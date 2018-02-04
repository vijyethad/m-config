import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';
import { Loader } from '../Loader';

var newTableValues = []

class EnterTableValues extends Component {
	constructor(props) {
		super(props);
		this.handleValuesSubmit = this.handleValuesSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.insertTableValues.isValuesInserted === "Successful") {
			this.props.history.push("/")
		}
	}

	onAfterInsertRow(row) {
		newTableValues.push(row);
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
				{this.props.loading.isLoading
					? <Loader />
					: this.props.insertTableFields.isFieldsInfoInserted && this.props.insertTableFields.fieldsInfo
						?	<div>
								<p className="alert alert-success">Table <strong>{this.props.createTable.tableName}</strong> and its fields are created successfully!</p>
								<h2>Enter values for table <strong>{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.TABLE_NAME}</strong></h2>
								<div className="enter-table-values">
									<BootstrapTable data={tableData} options={ options } keyField={this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO[0].split('$')[0]} insertRow={true}>
										{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.FIELDS_INFO.map(column =>
											<TableHeaderColumn dataField={column.split('$')[0]}>{column.split('$')[0]}</TableHeaderColumn>
										)}
									</BootstrapTable>
									<Button onClick={this.handleValuesSubmit}
													bsStyle="primary" className="values-submit-button"
									>
										Submit Values
									</Button>
								</div>
							</div>
						: <p>Somethings broke!! Please go back to the home page and create a new table.</p>
				}
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		insertTableValues: state.insertTableValues,
		insertTableFields: state.insertTableFields,
		createTable: state.createTable,
		loading: state.loading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterTableValues);
