export const RECIEVE_TABLE_LIST = 'RECIEVE_TABLE_LIST'

export const recieveTableList = json => ({
  type: RECIEVE_TABLE_LIST,
  tableList: json
})

export const fetchTableList = () => dispatch => {
    return fetch(`http://mxref-proxy.cloudhub.io/retrieve/`, {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type,header-type',
        'Header-Type': 'Content-Type',
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
