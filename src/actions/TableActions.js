import { setCreateTableModalState, setFieldInfoModalState } from './ModalActions'
export const RECIEVE_TABLE_LIST = 'RECIEVE_TABLE_LIST'
export const RECIEVE_CREATE_TABLE_RESPONSE = 'RECIEVE_CREATE_TABLE_RESPONSE'
export const RECIEVE_INSERT_TABLE_FIELDS_RESPONSE = 'RECIEVE_INSERT_TABLE_FIELDS_RESPONSE'

export const recieveTableList = json => ({
	type: RECIEVE_TABLE_LIST,
	tableList: json
})

export const fetchTableList = () => dispatch => {
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
		.then(json => dispatch(recieveTableList(json)))
}

export const recieveCreateTableResponse = json => ({
	type: RECIEVE_CREATE_TABLE_RESPONSE,
	isTableCreated: json.mXRefResponse.TblList.EXECUTION_STATUS
})

export const createNewTable = (tableName, tableDescription, fieldCount) => dispatch => {
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
			if(json.mXRefResponse.TblList.EXECUTION_STATUS) {
				dispatch(setCreateTableModalState(false))
			}
			dispatch(recieveCreateTableResponse(json))
		})
}

export const recieveInsertTableFieldsResponse = json => ({
	type: RECIEVE_INSERT_TABLE_FIELDS_RESPONSE,
	isFieldsInfoInserted: json.mXRefResponse.TblFields.EXECUTION_STATUS
})

export const insertTableFieldsData = (tableName, tableFieldsData) => dispatch => {
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
			if(json.mXRefResponse.TblFields.EXECUTION_STATUS) {
				dispatch(setFieldInfoModalState(false))
			}
			dispatch(recieveInsertTableFieldsResponse(json))
		})
}
