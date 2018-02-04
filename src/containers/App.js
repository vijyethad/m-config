import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/TableActions';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
import UpdateTable from '../components/updateTable/UpdateTable';
import CreateTableModal from '../components/createTable/CreateTableModal';
import EnterFieldInfoModal from '../components/createTable/EnterFieldInfoModal';
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

		if(nextProps.insertTableFields.isFieldsInfoInserted) this.props.history.push("/enterTableValues")
	}

	render() {
		const {tableList} = this.props;
		const tableListItems = tableList && tableList.mXRefResponse ? tableList.mXRefResponse.TblValues.TblValuesData : [];

		return (
			<div className="App">
				{this.props.loading.isLoading ? <Loader /> : null}
				{this.props.insertTableFields.isFieldsInfoInserted ? <p className="alert alert-success">Your table and fields are created successfully!</p> : null}
				<TableSelectSearch
					setSelectedOptions={this.props.tableActions.setSelectedOptions}
					selectedOptions={this.props.tableList.selectedOptions}
					deleteTables={this.props.tableActions.deleteTables}
					items={tableListItems}
					history={this.props.history}
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
		loading: state.loading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
