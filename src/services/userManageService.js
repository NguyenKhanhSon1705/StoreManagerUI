import httpRequest from "~/utils/axios"

export const apiGetUserOfTree = async ()=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-tree')
        return response
    }
    catch(e){
        return e
    }
}

export const apiGetUserOfTreeById = async (payload)=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-tree-by-id',{
            params: {
                id: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}
export const apiGetUserDetails = async (payload)=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-id',{
            params: {
                userId: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}
export const apiUpdateUser = async (payload)=>{
    try{
        const formData = new FormData();

        formData.append('Id', payload.id);
        formData.append('FullName', payload.fullName);
        formData.append('phoneNumber', payload.phoneNumber);
        payload.picture && formData.append('Picture', payload.picture); // Append file
        formData.append('Address', payload.address);
        payload.birthDay && formData.append('BirthDay', payload.birthDay  );
        payload.gender && formData.append('Gender', payload.gender);

        const response = await httpRequest.put('/api/users/update-user', formData)
        return response
    }
    catch(e){
        return e
    }
}


export const apiLookUser = async (payload) => {
    try {
        console.log(payload);
        const response = await httpRequest.put('/api/users/lock-user',{
            id: payload
        })
        
        return response
    } catch (e) {
        return e
    }   
}