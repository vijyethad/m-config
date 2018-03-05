export const RECIEVE_TABLE_LIST = 'RECIEVE_TABLE_LIST'
export const RECIEVE_CREATE_TABLE_RESPONSE = 'RECIEVE_CREATE_TABLE_RESPONSE'
export const RECIEVE_INSERT_TABLE_FIELDS_RESPONSE = 'RECIEVE_INSERT_TABLE_FIELDS_RESPONSE'
export const SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS'
export const RECIEVE_DELETE_TABLES_RESPONSE = 'RECIEVE_DELETE_TABLES_RESPONSE'
export const INSERT_TABLE_VALUES_RESPONSE = 'INSERT_TABLE_VALUES_RESPONSE'
export const RECIEVE_TABLE_DATA_RESPONSE = 'RECIEVE_TABLE_DATA_RESPONSE'
export const IS_LOADING = 'IS_LOADING'
export const SHOULD_SHOW_SAVE_CHANGES_BUTTON = 'SHOULD_SHOW_SAVE_CHANGES_BUTTON'
export const UPDATE_TABLE = 'UPDATE_TABLE'
export const UPDATE_TABLE_ROWS_RESPONSE = 'UPDATE_TABLE_ROWS_RESPONSE'

export const updateTable = (newTableData, shouldShowSaveChangesBtn, didColumnUpdate, row) => ({
	type: UPDATE_TABLE,
	newTableData,
	didColumnUpdate,
	shouldShowSaveChangesBtn,
	row
})

export const setIsLoading = response => ({
	type: IS_LOADING,
	isLoading: response
})

export const setSelectedOptions = selectedOptions => ({
	type: SET_SELECTED_OPTIONS,
	selectedOptions
})

export const recieveTableList = json => ({
	type: RECIEVE_TABLE_LIST,
	tableList: json
})

export const fetchTableList = () => dispatch => {
	dispatch(setIsLoading(true))
	return fetch(`http://mxref-proxy.cloudhub.io/retrieve/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"mXRefRequest":{
				"TblValues":{
					"ACTION":"Retrieve",
					"ENTITY":"TableList",
					"TBL_NAME":null
				}
			}
		})
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(recieveTableList(json))
		})
}

export const recieveCreateTableResponse = (executionStatus, tableName, fieldCount) => ({
	type: RECIEVE_CREATE_TABLE_RESPONSE,
	isTableCreated: executionStatus,
	tableName: tableName,
	fieldCount: fieldCount
})

export const createNewTable = (tableName, tableDescription, fieldCount) => dispatch => {
	dispatch(setIsLoading(true))
	return fetch(`http://mxref-proxy.cloudhub.io/tables/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"mXRefRequest": {
					"TblList": {
						"ACTION": "Create",
						"TblListData": [
							{
								"TBL_NAME": tableName,
								"TBL_DESCRIPTION": tableDescription,
								"FLD_COUNT": fieldCount,
								"CRE_USER": "B2B",
								"CRE_DTTM": "2017-07-15 04:34:33",
								"UPD_USER": "B2B",
								"UPD_DTTM": "2017-07-15 04:34:33"
							}
						]
					}
				}
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(recieveCreateTableResponse(
				json.mXRefResponse.TblList.EXECUTION_STATUS,
				json.mXRefResponse.TblList.TBL_NAME,
				json.mXRefResponse.TblList.FLD_COUNT
			))
			dispatch(setIsLoading(false))
		})
}

export const recieveInsertTableFieldsResponse = json => ({
	type: RECIEVE_INSERT_TABLE_FIELDS_RESPONSE,
	isFieldsInfoInserted: json.mXRefResponse.TblFields.EXECUTION_STATUS,
	fieldsInfo: json
})

export const insertTableFieldsData = (tableName, tableFieldsData) => dispatch => {
	dispatch(setIsLoading(true))
	const TblFieldsData = [];
	tableFieldsData.map(fieldData => TblFieldsData.push({
			"FLD_NAME": fieldData.fieldName,
			"FLD_TYPE": fieldData.fieldType,
			"FLD_DESCRIPTION": fieldData.fieldDescription,
			"KEY_FLAG": fieldData.fieldKeyFlag,
			"CRE_USER": "B2B",
			"CRE_DTTM": "2017-07-15 04:34:33",
			"UPD_USER": "B2B",
			"UPD_DTTM": "2017-07-15 04:34:33"
		})
	)

	return fetch(`http://mxref-proxy.cloudhub.io/fields/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"mXRefRequest": {
					"TblFields": {
						"ACTION": "Create",
						"TBL_NAME": tableName,
						"TblFieldsData": TblFieldsData
					}
				}
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(recieveInsertTableFieldsResponse(json))
		})
}

export const recieveDeleteTablesResponse = json => ({
	type: RECIEVE_DELETE_TABLES_RESPONSE,
	deleteTablesResponse: json
})

export const deleteTables = (tablesList, tableRecNo) => dispatch => {
	console.log(tablesList);
	dispatch(setIsLoading(true))
	const TblListData = [];
	tablesList.map(tableName => {
		tableRecNo.map(record => TblListData.push({
			"TBL_NAME": tableName.value,
			"TABLE_REC_NO": record
		}))
	})

	return fetch(`http://mxref-proxy.cloudhub.io/delete/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
				"mXRefRequest": {
					"TblValues": {
						"ACTION": "Delete",
						"ENTITY": "Table",
						"TblListData": TblListData
					}
				}
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(recieveDeleteTablesResponse(json))
		})
}

export const insertTableValuesResponse = json => ({
	type: INSERT_TABLE_VALUES_RESPONSE,
	insertTableValuesResponse: json
})

export const insertTableValues = (newTableValues, createdTableName, createdFields) => dispatch => {
	dispatch(setIsLoading(true))
	const TblValuesData = [];
	newTableValues.map(row =>
		createdFields.map(fieldName =>
			TblValuesData.push({
				"FLD_NAME": fieldName.split('$')[0],
				"FLD_VALUE": row[fieldName.split('$')[0]],
				"CRE_USER": "B2B",
				"CRE_DTTM": "2017-07-15 04:34:33",
				"UPD_USER": "B2B",
				"UPD_DTTM": "2017-07-15 04:34:33"
		}))
	)

	return fetch(`http://mxref-proxy.cloudhub.io/values/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(
			{
			  "mXRefRequest": {
			    "TblValues": {
			      "ACTION": "Create",
			      "TBL_NAME": createdTableName,
			      "TblValuesData": TblValuesData
			    }
			  }
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(insertTableValuesResponse(json))
		})
}

export const recieveTableDataResponse = json => ({
	type: RECIEVE_TABLE_DATA_RESPONSE,
	tableData: json
})

export const fetchTableData = (selectedTable) => dispatch => {
	dispatch(setIsLoading(true))

	return fetch(`http://mxref-proxy.cloudhub.io/retrieve/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{
			  "mXRefRequest": {
			    "TblValues": {
			      "ACTION": "Retrieve",
			      "ENTITY": "TableData",
			      "TBL_NAME": selectedTable[0].name
			    }
			  }
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(recieveTableDataResponse(json))
		})
}


export const shouldShowSaveChangesBtn = response => ({
	type: SHOULD_SHOW_SAVE_CHANGES_BUTTON,
	shouldShowSaveChangesBtn: response
})

export const updateTableRowsResponse = json => ({
	type: UPDATE_TABLE_ROWS_RESPONSE,
	updateTableRowsResponse: json
})

export const updateTableRows = (tableName, rowsUpdateData) => dispatch => {
	dispatch(setIsLoading(true))

	return fetch(`http://mxref-proxy.cloudhub.io/update/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(
			{
				"mXRefRequest": {
					"TblUpdate": {
						"ACTION": "Update",
						"TBL_NAME": tableName[0].value,
						"TblUpdateData": rowsUpdateData
					}
				}
			}
		)
	})
		.then(response => response.json())
		.then(json => {
			dispatch(setIsLoading(false))
			dispatch(updateTableRowsResponse(json))
		})
}
