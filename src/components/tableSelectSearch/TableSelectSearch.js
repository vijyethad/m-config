import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './TableSelectSearch.css';

class TableSelectSearch extends Component {
	constructor(props) {
		super(props);
		this.onItemChange = this.onItemChange.bind(this)
		this.createTableRouteHandler = this.createTableRouteHandler.bind(this)
		this.deleteTableHandler = this.deleteTableHandler.bind(this)
		this.onDeleteClick = this.onDeleteClick.bind(this)
		this.state = {
			selectedOptions: 0
		}
	}
	
	onItemChange(value, state, props) {
		console.log('Change', value);
		this.setState({
			selectedOptions: value.length
		});
		this.props.setSelectedOptions(value)
	}
	
	createTableRouteHandler() {
		this.props.history.push("/createTable")
	}
	
	onDeleteClick = () => {
		confirmAlert({
			title: 'Confirm to submit',
			childrenElement: () =>
				<div>Are you sure to delete the tables {this.props.selectedOptions.map(option => <li>{option.value}</li>)}</div>,
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: () => this.deleteTableHandler(),
			onCancel: () => console.log('User canceled delete operation'),
		})
	}
	
	deleteTableHandler() {
		this.props.deleteTables(this.props.selectedOptions);
	}
	
	render() {
		const tableList = [];
		this.props.items.map(item => tableList.push({name: item.RecordInfo, value: item.RecordInfo}))
		
		return (
			<div className="toolbar">
				<br />
				<div className="list-heading">Tables</div>
				<div className="list-heading-hr"><hr /></div>
				<Col md={8}>
					<SelectSearch
						options={tableList}
						name="language"
						multiple
						height={500}
						placeholder="Filter the tables"
						onChange={this.onItemChange}
					/>
				</Col>
				<Col md={4}>
					<div className="btn-toolbar">
						<Button
							bsStyle="warning"
							onClick={this.props.onClickUpdateModal}
							disabled={this.state.selectedOptions !== 1}
						>
							Update
						</Button>
						<Button
							bsStyle="danger"
							disabled={this.state.selectedOptions === 0}
							onClick={this.onDeleteClick}
						>
							Delete
						</Button>
						<Button
							bsStyle="primary"
							onClick={this.createTableRouteHandler}
						>
							+ Create new Table
						</Button>
					</div>
				</Col>
			</div>
		);
	}
}

export default TableSelectSearch;
