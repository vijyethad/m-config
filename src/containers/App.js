import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../actions/TableActions';
import * as modalActions from '../actions/ModalActions';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
import UpdateTable from '../components/updateTable/UpdateTable';
import CreateTableModal from '../components/createTable/CreateTableModal';
import EnterFieldInfoModal from '../components/createTable/EnterFieldInfoModal';
import TableSelectSearch from '../components/tableSelectSearch/TableSelectSearch';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCreateTableModal: false,
			showUpdateTableModal: false
		}
		this.closeUpdateTableModal = this.closeUpdateTableModal.bind(this)
		this.openUpdateTableModal = this.openUpdateTableModal.bind(this)
	}
	
	componentDidMount() {
		this.props.tableActions.fetchTableList();
		if(this.props.createTable.isTableCreated) {
			this.props.modalActions.setFieldInfoModalState(true)
		}
	}
	
	componentWillReceiveProps(nextProps) {
		const isTableDeleted = nextProps.tableList.deleteTablesResponse && nextProps.tableList.deleteTablesResponse.mXRefResponse.TblValues.EXECUTION_STATUS ? nextProps.tableList.deleteTablesResponse.mXRefResponse.TblValues.EXECUTION_STATUS : ''
		const isFieldsInfoInserted = nextProps.insertTableFields.isFieldsInfoInserted
		if(isTableDeleted === "false" || isFieldsInfoInserted === "true") window.location.reload();
		
		if(nextProps.insertTableFields.isFieldsInfoInserted) this.props.history.push("/enterTableValues")
	}
	
	closeUpdateTableModal() {
		this.setState({showUpdateTableModal: false});
	}
	
	openUpdateTableModal() {
		this.setState({showUpdateTableModal: true});
	}
	
	render() {
		const {tableList} = this.props;
		const tableListItems = tableList && tableList.mXRefResponse ? tableList.mXRefResponse.TblValues.TblValuesData : [];
		
		console.log('isTableCreated: ' + this.props.createTable.isTableCreated);
		console.log('shouldShowCreateTableModal: ' + this.props.modalState.shouldShowCreateTableModal);
		console.log('isFieldsInfoInserted: ' + this.props.insertTableFields.isFieldsInfoInserted);
		console.log('shouldShowFieldInfoModal: ' + this.props.modalState.shouldShowFieldInfoModal);

		return (
			<div className="App">
				{this.props.insertTableFields.isFieldsInfoInserted ? <p className="alert alert-success">Your table and fields are created successfully!</p> : null}
				<TableSelectSearch
					onClickUpdateModal={this.openUpdateTableModal}
					setCreateTableModalState={this.props.modalActions.setCreateTableModalState}
					setSelectedOptions={this.props.tableActions.setSelectedOptions}
					selectedOptions={this.props.tableList.selectedOptions}
					deleteTables={this.props.tableActions.deleteTables}
					items={tableListItems}
				/>
				<CreateTableModal
					shouldShowCreateTableModal={this.props.modalState.shouldShowCreateTableModal}
					createNewTable={this.props.tableActions.createNewTable}
					setCreateTableModalState={this.props.modalActions.setCreateTableModalState}
					isTableCreated={this.props.createTable.isTableCreated}
				/>
				{
					!this.props.createTable.isTableCreated ? <div></div> :
						<EnterFieldInfoModal
							shouldShowFieldInfoModal={this.props.modalState.shouldShowFieldInfoModal}
							setFieldInfoModalState={this.props.modalActions.setFieldInfoModalState}
							insertTableFieldsData={this.props.tableActions.insertTableFieldsData}
							tableName={this.props.createTable.tableName}
							fieldCount={this.props.createTable.fieldCount}
							recieveCreateTableResponse={this.props.tableActions.recieveCreateTableResponse}
						/>
				}
				
				<Modal show={this.state.showUpdateTableModal} onHide={this.closeUpdateTableModal}>
					<Modal.Header closeButton>
						<Modal.Title>Update Table</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<UpdateTable/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeUpdateTableModal}>Cancel</Button>
						<Button
							bsStyle="primary"
						>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		tableList: state.tableList,
		createTable: state.createTable,
		modalState: state.modalState,
		insertTableFields: state.insertTableFields
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch),
		modalActions: bindActionCreators(modalActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
