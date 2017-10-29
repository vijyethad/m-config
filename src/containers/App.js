import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tableActions from '../actions/TableActions';
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import Header from '../components/header/Header';
import UpdateTable from '../components/updateTable/UpdateTable';
import CreateTableModal from '../components/createTable/CreateTableModal';
import TableSelectSearch from '../components/tableSelectSearch/TableSelectSearch';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCreateTableModal: false,
			showUpdateTableModal: false
		}
		this.openCreateTableModal = this.openCreateTableModal.bind(this)
		this.closeCreateTableModal = this.closeCreateTableModal.bind(this)
		this.closeUpdateTableModal = this.closeUpdateTableModal.bind(this)
		this.openUpdateTableModal = this.openUpdateTableModal.bind(this)
	}

	componentDidMount() {
		this.props.actions.fetchTableList();
	}

	closeCreateTableModal() {
		this.setState({showCreateTableModal: false});
	}

	openCreateTableModal() {
		this.setState({showCreateTableModal: true});
	}

	closeUpdateTableModal() {
		this.setState({showUpdateTableModal: false});
	}

	openUpdateTableModal() {
		this.setState({showUpdateTableModal: true});
	}

	render() {
		const {tableList} = this.props;
		const tableListItems = tableList &&  tableList.mXRefResponse ? tableList.mXRefResponse.TblValues.TblValuesData : [];

		console.log(this.props.createTable.isTableCreated);

		return (
			<div className="App">
				<Header/>
				<TableSelectSearch
					onClickCreateModal={this.openCreateTableModal}
					onClickUpdateModal={this.openUpdateTableModal}
					items={tableListItems}
				/>
			<CreateTableModal
					showCreateTableModal={this.state.showCreateTableModal}
					closeCreateTableModal={this.closeCreateTableModal}
					createNewTable={this.props.actions.createNewTable}
			/>
			{this.props.createTable && this.props.createTable.isTableCreated ? <div></div> : <div></div>}

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
		createTable: state.createTable
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tableActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
