import { axiosPost, axiosGet } from "./index";
    // Where Bar
export const onGetWhereBar = async (Data) => {
    return axiosPost('api/where', {
        id:Data
    })
}
    // Update Bar
export const onGetUpdateBar = async (Data) => {
    return axiosPost('api/update', {
        id:Data.id,
        name:Data.name,
        data:Data.data,
        audience:Data.audience,
        image:Data.image
    })
}
    // Delete Bar
export const onGetDeleteBar = async (Data) => {
    return axiosPost('api/delete', {
        id:Data.id
    })
}