import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tableActions from '../actions';
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import Header from '../components/header/Header';
import UpdateTable from '../components/updateTable/UpdateTable';
import TableSelectSearch from '../components/tableSelectSearch/TableSelectSearch';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			tableName: '',
			tableDescription: '',
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

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		const {tableList} = this.props;
		const tableListItems = tableList &&  tableList.mXRefResponse ? tableList.mXRefResponse.TblValues.TblValuesData : [];

		return (
			<div className="App">
				<Header/>
				<TableSelectSearch
					onClickCreateModal={this.openCreateTableModal}
					onClickUpdateModal={this.openUpdateTableModal}
					items={tableListItems}
				/>
				<Modal show={this.state.showCreateTableModal} onHide={this.closeCreateTableModal}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Table</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form className="modal-form">
							<label className="modal-label">
								Table Name:
								<input
									name="tableName"
									type="text"
									className="form-control"
									value={this.state.tableName}
									onChange={this.handleInputChange}/>
							</label>
							<br/>
							<label className="modal-label">
								Table Description:
								<input
									name="tableDescription"
									type="text"
									className="form-control"
									value={this.state.tableDescription}
									onChange={this.handleInputChange}/>
							</label>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeCreateTableModal}>Cancel</Button>
						<Button
							bsStyle="primary"
						>
							Create new Table
						</Button>
					</Modal.Footer>
				</Modal>

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
		tableList: state.tableList
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tableActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
