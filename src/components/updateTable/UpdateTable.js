import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../actions/TableActions';

// function insertColumn() {
// 	products.map(product => product[newColumn] = '')
// }

class UpdateTable extends Component {
	constructor(props) {
		super(props);
			this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
	}
	componentDidMount() {
		this.props.tableActions.fetchTableData([{"name":"Location_Info","value":"Location_Info"}]);
		this.props.tableActions.shouldShowSaveChangesBtn(false);
	}
	createCustomButtonGroup = props => {
		return (
			<ButtonGroup className='my-custom-class' className='btn-group-md'>
				{ props.insertBtn }
				{ props.deleteBtn }
				<button type='button'
					className={ `btn btn-primary` }>
					<span><i class="fa glyphicon glyphicon-plus fa-plus"></i> New Column</span>
				</button>
				<button type='button'
					className={ `btn btn-warning` }>
					<span><i class="fa glyphicon glyphicon-trash fa-trash"></i> Delete Column</span>
				</button>
			</ButtonGroup>
		);
	}

	onAfterInsertRow(row) {
		let newRowStr = '';
		for (const prop in row) {
			newRowStr += prop + ': ' + row[prop] + ' \n';
		}
		console.log('The new row is:\n ' + newRowStr);
	}

	onAfterDeleteRow(rowKeys) {
		console.log('The rowkey you drop: ' + rowKeys);
	}

	onAfterSaveCell(row, cellName, cellValue) {
	  console.log(`Save cell ${cellName} with value ${cellValue}`);
	  console.log('The whole row :');
	  console.log(row);
		this.props.tableActions.shouldShowSaveChangesBtn(true);
	  // console.log(this.refs.table.getTableDataIgnorePaging());
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

		let tableData = this.props.tableData && this.props.tableData.mXRefResponse ? this.props.tableData.mXRefResponse.TblData.DATA : []
		let columns = [];

		tableData.map(row => {
			Object.keys(row).map(key => {
				if(!columns.includes(key)) {
					columns.push(key)
				}
			})
		})

		console.log(this.props.shouldShowSaveChangesBtn);

		return (
			<div className="App">
				<h2>Table</h2>
					<BootstrapTable data={tableData} options={ options } keyField='ZjAWeei2Y34E' cellEdit={cellEditProp} search={true} options={options}
													className="enter-table-values" deleteRow={true} insertRow={true} selectRow={selectRowProp}>
													{columns.map(column =>
														<TableHeaderColumn dataField={column}>{column}</TableHeaderColumn>
													)}
					</BootstrapTable>
					{this.props.shouldShowSaveChangesBtn.value ? <button type="button" className="btn btn-success" hidden>Save Changes</button> : null}
		</div>
		);
	}
}


function mapStateToProps(state, props) {
	return {
		loading: state.loading,
		tableData: state.tableData,
		shouldShowSaveChangesBtn: state.shouldShowSaveChangesBtn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tableActions: bindActionCreators(tableActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTable);
