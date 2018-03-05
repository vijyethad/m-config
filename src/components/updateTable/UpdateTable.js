import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonGroup, Button, Modal, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import uuidv4 from 'uuid/v4';
import { Loader } from '../Loader';

let rowsUpdateData = []
let newRows = []

class UpdateTable extends Component {
	constructor(props) {
		super(props);
			// Insert column bindings
			this.handleNewColumnModalClose = this.handleNewColumnModalClose.bind(this);
			this.handleNewColumnModalShow = this.handleNewColumnModalShow.bind(this);
			this.openNewColumnModal = this.openNewColumnModal.bind(this);
			this.onNewColumnSubmit = this.onNewColumnSubmit.bind(this);
			this.renderNewColumnModal = this.renderNewColumnModal.bind(this);
			this.onAfterInsertRow = this.onAfterInsertRow.bind(this);

			// Delete column bindings
			this.handleDeleteColumnModalClose = this.handleDeleteColumnModalClose.bind(this)
			this.handleDeleteColumnModalShow = this.handleDeleteColumnModalShow.bind(this)
			this.openDeleteColumnModal = this.openDeleteColumnModal.bind(this)
			this.onDeleteColumnSubmit = this.onDeleteColumnSubmit.bind(this)
			this.renderDeleteColumnModal = this.renderDeleteColumnModal.bind(this)
			this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);

			this.handleSelectChange = this.handleSelectChange.bind(this)
			this.saveTable = this.saveTable.bind(this)
			this.onAfterSaveCell = this.onAfterSaveCell.bind(this);

			this.state = {
				newColumnModalShow: false,
				deleteColumnModalShow: false,
				value: []
			};
	}

	componentDidMount() {
		this.props.tableActions.shouldShowSaveChangesBtn(false);
		this.props.tableActions.fetchTableData([{"name":"1","value":"1"}]);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.tableData.mXRefResponse !== nextProps.tableData.mXRefResponse) {
			// Injecting a new column called ZjAWeei2Y34E to the API data which acts as PK for the table
			const tableData = nextProps.tableData.mXRefResponse.TblData.DATA
			tableData.map(row => row.ZjAWeei2Y34E = uuidv4())

			this.props.tableActions.updateTable(tableData)
		}
	}

	// Insert column modal
	handleNewColumnModalClose() {
		this.setState({ newColumnModalShow: false });
	}

	handleNewColumnModalShow() {
		this.setState({ newColumnModalShow: true });
	}

	openNewColumnModal() {
		this.setState({ newColumnModalShow: true });
	}

	onNewColumnSubmit() {
		const newColumn = this.input.value;
		const tableData = this.props.updateTable.newTableData;
		const shouldShowSaveChangesBtn = true;
		const didColumnUpdate = true;

		this.setState({ newColumnModalShow: false });
		tableData.map(row => row[newColumn] = '')
		this.props.tableActions.updateTable(tableData, shouldShowSaveChangesBtn, didColumnUpdate);
	}

	renderNewColumnModal = (modalTitle) => {
		return (
			<Modal show={this.state.newColumnModalShow} onHide={this.handleNewColumnModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						    <ControlLabel>Column</ControlLabel>{' '}
						    <FormControl type="text" placeholder="New Colulmn" inputRef={(ref) => {this.input = ref}}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleNewColumnModalClose}>Close</Button>
						<Button type="submit" bsStyle="primary" onClick={this.onNewColumnSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
		)
	}

	onAfterInsertRow(row) {
		// let newRowStr = '';
		// for (const prop in row) {
		// 	newRowStr += prop + ': ' + row[prop] + ' \n';
		// }
		// console.log('The new row is:\n ' + newRowStr);
		const tableData = this.props.updateTable.newTableData;
		tableData.push(row);

		const shouldShowSaveChangesBtn = true;
		const didColumnUpdate = false;
		delete row.ZjAWeei2Y34E
		delete row.Tbl_Name_Rec_No
		newRows.push(row);
		let convertedFieldsName = Object.keys(row)
		convertedFieldsName = convertedFieldsName.map(field => `${field}$String`)
		const rowData = {isRowInserted: true, tableName: this.props.tableData.mXRefResponse.TblData.TABLE_NAME, newRows: newRows, fieldData: convertedFieldsName}

		this.props.tableActions.updateTable(tableData, shouldShowSaveChangesBtn, didColumnUpdate, rowData);
	}

	// Delete column Modal
	handleDeleteColumnModalClose() {
		this.setState({ deleteColumnModalShow: false });
	}

	handleDeleteColumnModalShow() {
		this.setState({ deleteColumnModalShow: true });
	}

	openDeleteColumnModal() {
		this.setState({ deleteColumnModalShow: true });
	}

	onDeleteColumnSubmit() {
		const shouldShowSaveChangesBtn = true;
		const didColumnUpdate = true;
		const tableData = this.props.updateTable.newTableData;
		const deleteColumns = []
		this.state.value.map(row => deleteColumns.push(row.value))
		tableData.map(row => {
				deleteColumns.map(deleteColumn => delete row[deleteColumn])
		})
		this.setState({ deleteColumnModalShow: false });
		this.props.tableActions.updateTable(tableData, shouldShowSaveChangesBtn, didColumnUpdate);
	}

	renderDeleteColumnModal = (columns) => {
		const col = [];
		let obj = {}
		const options=columns.map(column => {
			if(column !== 'ZjAWeei2Y34E') {
				col.push({label: column, value: column})
			}
		})

		return (
			<Modal show={this.state.deleteColumnModalShow} onHide={this.handleDeleteColumnModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Column</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<Select
							closeOnSelect={false}
							multi
							onChange={this.handleSelectChange}
							options={col}
							placeholder="Select columns to delete"
							removeSelected={this.state.removeSelected}
							rtl={this.state.rtl}
							value={this.state.value}
						/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleDeleteColumnModalClose}>Close</Button>
						<Button type="submit" bsStyle="primary" onClick={this.onDeleteColumnSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
		)
	}

	onAfterDeleteRow(rowKeys) {
		// console.log('The rowkey you drop: ' + rowKeys);
		// console.log(rowKeys);
		const tableData = this.props.updateTable.newTableData;
		// console.log(rowKeys);
		// console.log(tableData);
		let tableRecNo = [];
		rowKeys.map(rowKey => tableData.map((item, index) => {
			if(item.ZjAWeei2Y34E === rowKey) {
				tableRecNo.push(item.Tbl_Name_Rec_No);
				tableData.splice(index, 1);
			}
		}))

		const shouldShowSaveChangesBtn = true;
		const didColumnUpdate = false;
		const row = {didRowDelete: true, tableRecNo: tableRecNo}
		this.props.tableActions.updateTable(tableData, shouldShowSaveChangesBtn, didColumnUpdate, row)
	}
	// End delete column modal

	saveTable() {
		const tableData = this.props.updateTable.newTableData;
		tableData.map(row => delete row.ZjAWeei2Y34E)
		const tableName = [{
			name: this.props.tableData.mXRefResponse.TblData.TABLE_NAME,
			value: this.props.tableData.mXRefResponse.TblData.TABLE_NAME
		}]
		if(this.props.updateTable.row.didRowDelete) {
			this.props.tableActions.deleteTables(tableName, this.props.updateTable.row.tableRecNo);
		} else if(this.props.updateTable.row.didRowUpdate) {
			this.props.tableActions.updateTableRows(tableName, this.props.updateTable.row.rowsUpdateData)
		} else if(this.props.updateTable.row.isRowInserted) {
			this.props.tableActions.insertTableValues(this.props.updateTable.row.newRows, this.props.updateTable.row.tableName, this.props.updateTable.row.fieldData)
		}
	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	}

	createCustomButtonGroup = props => {
		return (
			<ButtonGroup className='my-custom-class' className='btn-group-md'>
				{ props.insertBtn }
				{ props.deleteBtn }
				<Button bsStyle="info" onClick={this.openNewColumnModal}>
					<span><i className="fa glyphicon glyphicon-plus fa-plus"></i> New Column</span>
				</Button>
				<Button bsStyle="warning" onClick={this.openDeleteColumnModal}>
					<span><i className="fa glyphicon glyphicon-trash fa-trash"></i> Delete Column</span>
				</Button>
			</ButtonGroup>
		);
	}

	onAfterSaveCell(row, cellName, cellValue) {
	  // console.log(`Save cell ${cellName} with value ${cellValue}`);
	  // console.log('The whole row :');
	  // console.log(row);

		const tableData = this.props.updateTable.newTableData;
		let tableRecNo;
		tableData.map(item => {
			if(item.ZjAWeei2Y34E === row.ZjAWeei2Y34E) {
				tableRecNo = item.Tbl_Name_Rec_No;
				item[cellName] = cellValue
			}
		})

		rowsUpdateData.push({TABLE_REC_NO: tableRecNo, FLD_NAME: cellName, FLD_VALUE: cellValue, UPD_USER: "UI_Call"})

		const shouldShowSaveChangesBtn = true;
		const didColumnUpdate = false;
		const rowData = {didRowUpdate: true, tableRecNo: tableRecNo, rowsUpdateData: rowsUpdateData}
		this.props.tableActions.updateTable(tableData, shouldShowSaveChangesBtn, didColumnUpdate, rowData)
	}

	render() {
		const selectRowProp = {
			mode: 'checkbox'
		};

		const options = {
			afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
			afterDeleteRow: this.onAfterDeleteRow,  // A hook for after droping rows.
			insertText: 'New Row',
			deleteText: 'Delete Row',
			btnGroup: this.createCustomButtonGroup
		};

		const cellEditProp = {
			mode: 'click',
			blurToSave: true,
			afterSaveCell: this.onAfterSaveCell
		};

		let tableData = this.props.updateTable.newTableData ? this.props.updateTable.newTableData : []

		// Generating all the column names from the data for Delete Column modal
		let columns = [];
		tableData.map(row => {
			Object.keys(row).map(key => {
				if(!columns.includes(key)) {
					columns.push(key)
				}
			})
		})

		return (
			<div className="App">
				{ this.props.updateTableRows && this.props.updateTableRows.updateTableRowsResponse && this.props.updateTableRows.updateTableRowsResponse.mXRefResponse.TblUpdate.RECORDS_FAILED === 0 ? <p className="alert alert-success">Row updates are saved successfully</p>: null }
				{ this.props.insertTableValues && this.props.insertTableValues.isValuesInserted && this.props.insertTableValues.isValuesInserted === "Successful" ? <p className="alert alert-success">Rows successfully inserted</p> : null }
				<h2>{this.props.tableData && this.props.tableData.mXRefResponse ? this.props.tableData.mXRefResponse.TblData.TABLE_NAME : null}</h2>
				{this.renderNewColumnModal('Add New Column')}
				{this.renderDeleteColumnModal(columns, tableData)}

				{
					this.props.loading.isLoading
					? <Loader />
					: <div>
							<BootstrapTable
									data={tableData} options={ options }
									keyField='ZjAWeei2Y34E' cellEdit={cellEditProp}
									search={true} options={options}
									className="enter-table-values" deleteRow={true}
									insertRow={true} selectRow={selectRowProp}
								>
										{columns.map(column =>
											<TableHeaderColumn
												hidden={column === 'ZjAWeei2Y34E' || column === 'Tbl_Name_Rec_No'}
												hiddenOnInsert={column === 'ZjAWeei2Y34E' || column === 'Tbl_Name_Rec_No' }
												autoValue={column === 'ZjAWeei2Y34E'}
												dataField={column}>
													{column}
											</TableHeaderColumn>
										)}
							</BootstrapTable>
							{this.props.updateTable.shouldShowSaveChangesBtn ? <Button bsStyle="success" onClick={this.saveTable}>Save Changes</Button> : null}
						</div>
					}
				</div>
		);
	}
}


function mapStateToProps(state, props) {
	return {
		loading: state.loading,
		tableData: state.tableData,
		shouldShowSaveChangesBtn: state.shouldShowSaveChangesBtn,
		updateTable: state.updateTable,
		updateTableRows: state.updateTableRows,
		insertTableValues: state.insertTableValues
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTable);
