import httpRequest from "~/utils/axios"

export const apiCreateTable = async (payload) => {
    try{
        const res = await httpRequest.post('/api/tables/create-tables',{
            shopId: payload.shopId,
            tables: payload.tables
        })
        return res
    }
    catch(e){
        return e
    }
}

export const apiGetListTables = async () => {
    try{
        const shopId = +atob(localStorage.getItem(process.env.REACT_APP_IDSHOP))
        
        const res = await httpRequest.get('/api/tables/get-table-area',{
            params: {
                shopId: shopId
            }
        })
        return res
    }catch(e){
        return e
    }
}
export const apiUpdateTables = async (payload) =>{
    try{
        const res = await httpRequest.put('/api/tables/update-tables', payload)
        return res
    }catch(e){
        return e
    }
}

export const apiDeleteTables = async (payload) =>{
    try{
        const res = await httpRequest.delete('/api/tables/delete-tables', {
            params: {
                id: payload
            }
        })
        return res
    }catch(e){
        return e
    }
}