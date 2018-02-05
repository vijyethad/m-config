import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/TableActions';
import './App.css';
import TableSelectSearch from '../components/tableSelectSearch/TableSelectSearch';
import { Loader } from '../components/Loader';

class App extends Component {
	componentDidMount() {
		this.props.tableActions.fetchTableList();
	}

	componentWillReceiveProps(nextProps) {
		const isTableDeleted = nextProps.tableList.deleteTablesResponse && nextProps.tableList.deleteTablesResponse.mXRefResponse.TblValues.EXECUTION_STATUS ? nextProps.tableList.deleteTablesResponse.mXRefResponse.TblValues.EXECUTION_STATUS : ''
		const isFieldsInfoInserted = nextProps.insertTableFields.isFieldsInfoInserted
		if(isTableDeleted === "false" || isFieldsInfoInserted === "true") window.location.reload();
	}

	render() {
		const {tableList} = this.props;
		const tableListItems = tableList && tableList.mXRefResponse ? tableList.mXRefResponse.TblValues.TblValuesData : [];

		return (
			<div className="App">
				{this.props.loading.isLoading ? <Loader /> : null}
				{this.props.insertTableFields.isFieldsInfoInserted === "success" && this.props.insertTableValues.isValuesInserted !== "Successful" ? <p className="alert alert-success">Table <strong>{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.TABLE_NAME}</strong> and it's fields are created successfully!</p> : null}
				{this.props.insertTableValues.isValuesInserted ? <p className="alert alert-success">Table <strong>{this.props.insertTableFields.fieldsInfo.mXRefResponse.TblFields.TABLE_NAME}</strong>, it's fields and values are all created successfully!</p> : null}
				<TableSelectSearch
					setSelectedOptions={this.props.tableActions.setSelectedOptions}
					selectedOptions={this.props.tableList.selectedOptions}
					deleteTables={this.props.tableActions.deleteTables}
					items={tableListItems}
					history={this.props.history}
					fetchTableData={this.props.tableActions.fetchTableData}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		tableList: state.tableList,
		createTable: state.createTable,
		insertTableFields: state.insertTableFields,
		loading: state.loading,
		insertTableValues: state.insertTableValues
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
