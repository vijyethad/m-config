import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';
import { Loader } from '../Loader';
import EnterFieldInfoComponent from './EnterFieldInfoComponent';

class EnterFieldInfoModal extends Component {

	render() {
		return (
			<div className="App">
				{this.props.loading.isLoading
					? <Loader />
					: this.props.createTable.isTableCreated && this.props.createTable.tableName ?
						<div>
								<p className="alert alert-success">Your table <strong>{this.props.createTable.tableName}</strong> is created successfully!</p>
								<div className="enter-fields-info">
									<h2>Enter Fields Information</h2>
									<EnterFieldInfoComponent
										createTable={this.props.createTable}
										tableActions={this.props.tableActions}
										history={this.props.history}
									/>
								</div>
							</div>
							:
							<p>Somethings broke!! Please go back to the home page and create a new table.</p>
					}
			</div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(EnterFieldInfoModal);
