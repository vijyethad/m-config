import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonGroup } from 'react-bootstrap';

const products = [];

function addProducts(quantity) {
	const startId = products.length;
	for (let i = 0; i < quantity; i++) {
		const id = startId + i;
		products.push({
			id: id,
			id2: id,
			name: 'Item name ' + id,
			price: 2100 + i
		});
	}
}

addProducts(5);

// Add column
console.log(products);

const newColumn = 'sri';

function insertColumn() {
	products.map(product => product[newColumn] = '')
}
insertColumn();
console.log(products);

function onAfterInsertRow(row) {
	let newRowStr = '';
	for (const prop in row) {
		newRowStr += prop + ': ' + row[prop] + ' \n';
	}
	console.log('The new row is:\n ' + newRowStr);
}

function onAfterDeleteRow(rowKeys) {
	console.log('The rowkey you drop: ' + rowKeys);
}



export default class UpdateTable extends Component {
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


	render() {
		const selectRowProp = {
			mode: 'checkbox'
		};

		const options = {
			afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
			afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
			insertText: 'New Row',
			deleteText: 'Delete Row',
			btnGroup: this.createCustomButtonGroup
		};

		const cellEditProp = {
			mode: 'click'
		};

		return (
			<div className="App">
				<h2>Table</h2>
				<BootstrapTable data={products} deleteRow={true} insertRow={true} selectRow={selectRowProp}
				                cellEdit={cellEditProp} search={true} options={options} className="enter-table-values">
					<TableHeaderColumn hiddenOnInsert isKey hidden dataField='id'>Product ID</TableHeaderColumn>
					<TableHeaderColumn dataField='id2'>Product ID</TableHeaderColumn>
					<TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
					<TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
				</BootstrapTable>
		</div>
		);
	}
}
