import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const products = [];

function addProducts(quantity) {
	const startId = products.length;
	for (let i = 0; i < quantity; i++) {
		const id = startId + i;
		products.push({
			id: id,
			name: 'Item name ' + id,
			price: 2100 + i
		});
	}
}

addProducts(5);

function onAfterInsertRow(row) {
	let newRowStr = '';
	
	for (const prop in row) {
		newRowStr += prop + ': ' + row[prop] + ' \n';
	}
	alert('The new row is:\n ' + newRowStr);
}

function onAfterDeleteRow(rowKeys) {
	alert('The rowkey you drop: ' + rowKeys);
}

const selectRowProp = {
	mode: 'checkbox'
};

const options = {
	afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
	afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

const cellEditProp = {
	mode: 'click'
};

export default class UpdateTable extends Component {
	render() {
		return (
			<BootstrapTable data={products} insertRow={true} deleteRow={true} selectRow={selectRowProp}
			                cellEdit={cellEditProp} search={true} options={options}>
				<TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
				<TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
				<TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
			</BootstrapTable>
		);
	}
}
